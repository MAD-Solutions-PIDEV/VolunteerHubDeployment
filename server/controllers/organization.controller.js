const { spawn } = require("child_process");
const validation = require("../validation/organizationVerif");
const organizationModel = require("../models/Organization");
const path = require("path");
const axios = require("axios");
const Address = require("../models/address");
const sendEmailToOrganization = require("../utilities/organizationEmail");
const User = require("../models/user");
const Role = require("../models/role");
const { Console } = require("console");
const Campaign = require("../models/Campaign");
const Organization = require("../models/Organization");

// Get list of organizations
const getOrganizations = async (req, res) => {
  try {
    const organizations = await organizationModel.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create organization and validate its input values
const createOrg = async (req, res) => {
  const orgErrors = validation.validateOrganizationInput(req.body);
  const addressErrors = validation.validateAddressInput(
    JSON.parse(req.body.address)
  );
  const logoErrors = validation.validateLogo(req.file);
  const issuesErrors = validation.validateIssues(JSON.parse(req.body.issues));
  const errors = {
    ...orgErrors.errors,
    ...addressErrors.errors,
    ...logoErrors.errors,
    ...issuesErrors.errors,
  };

  if (
    !orgErrors.isValid ||
    !addressErrors.isValid ||
    !logoErrors.isValid ||
    !issuesErrors.isValid
  ) {
    console.log("stuck here");
    return res.status(400).json(errors);
  }
  try {
    const {
      name,
      email,
      description,
      website,
      category,
      status,
      phone,
      owner,
      wallet,
    } = req.body;
    let logoName = null;
    if (req.file) {
      logoName = req.file.filename; // save the filename of the uploaded file
    }
    let issues = JSON.parse(req.body.issues);
    let address = JSON.parse(req.body.address);

    const organization = new organizationModel({
      name,
      email,
      logo: logoName,
      description,
      issues,
      website,
      category,
      status,
      phone,
      owner,
      wallet,
    });

    const newAddress = new Address({
      firstAddress: address.firstAddress,
      secondAddress: address.secondAddress,
      country: address.country,
      zipCode: address.zipCode,
      state: address.state,
    });

    newAddress.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        //console.log("address saved");
      }
    });
    organization.address = newAddress._id;

    const savedOrganization = await organization.save();

    const subject = "Welcome To VolunteerHub";
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Welcome to VolunteerHub</title>
      <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #fff;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #674df0;
      }
      h1 {
        font-size: 24px;
        font-weight: bold;
        color: #674df0;
        margin-top: 0;
        text-align: center;
      }
      p {
        margin: 0 0 20px;
        line-height: 1.5;
      }
      </style>
    </head>
    <body>
        <div class="container">
        <h1>Welcome to VolunteerHub</h1>
        <p>Dear ${organization.name},</p>
        <p>Thank you for signing up for VolunteerHub! We're thrilled to have you on board.</p>
        <p>Your account is currently pending approval. We're reviewing your application and will get back to you as soon as possible. Please note that this process can take up to 48 hours.</p>
        <p>In the meantime, feel free to explore the platform and learn more about our services. Once your account is approved, you'll be able to create and manage volunteer opportunities, connect with potential volunteers, and much more.</p>
        <p>If you have any questions or concerns, please don't hesitate to reach out to us.</p>
        <p>Best regards,</p>
        <p>The VolunteerHub team</p>
        <a href="https://volunteerhub.onrender.com/"><img src="https://i.ibb.co/Y20GL2q/signature.png" alt="signature" border="0" style="width:10rem"></a>
      </div>
    </body>
    </html>
    
 `;

    await sendEmailToOrganization(organization.email, subject, html);

    return res.status(201).json(savedOrganization);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Admin can activate organization
const activateOrg = async (req, res) => {
  try {
    const organization = await organizationModel.findById(req.params.id);

    if (!organization) {
      console.log("Organization not found");
      return;
    }

    organization.status = "active";
    await organization.save();

    // Send activation email
    const subject = "Organization Activation";
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NGO Account Activated</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #fff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #674df0;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #674df0;
            margin-top: 0;
            text-align: center;
          }
          p {
            margin: 0 0 20px;
            line-height: 1.5;
          }
          .btn {
            display: inline-block;
            font-weight: 500;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-user-select: none;
            user-select: none;
            border: 0px;
            padding: 0 50px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 3px;
            line-height: 74px;
            border-radius: 0px;
            color: #1b1f2e;
            cursor: pointer;
            z-index: 5;
            transition: all 0.4s ease-out 0s;
            background-color: #29f0b4;
            position: relative;
          }
          .btn:hover {
            background-color: #34495E;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to VolunteerHub!</h1>
          <p>Dear ${organization.name},</p>
          <p>We are pleased to inform you that your account with VolunteerHub has been activated. You can now access all the features of our platform and start posting volunteering opportunities for interested individuals.</p>
          <p>If you have any questions or issues, please don't hesitate to contact our support team.</p>
          <p>Thank you for joining VolunteerHub!</p>
          <p>Best regards,</p>
          <p>The VolunteerHub Team</p>
          <a href="https://volunteerhub.onrender.com/"><img src="https://i.ibb.co/Y20GL2q/signature.png" alt="signature" border="0" style="width:10rem"></a>
          <p style="text-align: center;"><a href="https://volunteerhub.onrender.com/login" style="text-decoration: none; color:white" class="btn">Log in to VolunteerHub</a></p>
        </div>
      </body>
    </html> 
 `;
    await sendEmailToOrganization(organization.email, subject, html);
    // Add the role of "organization" to the owner
    const user = await User.findById(organization.owner);
    const organizationRole = await Role.findOne({ name: "organization" });
    if (!user.roles.includes(organizationRole._id)) {
      user.roles.push(organizationRole._id);
    }
    if (!user.organizations.includes(organization._id)) {
      user.organizations.push(organization._id);
    }
    await user.save();
    res.json(organization);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Org owner can archive organization
const archiveOrg = async (req, res) => {
  try {
    const organization = await organizationModel.findById(req.params.id);

    if (!organization) {
      console.log("Organization not found");
      return;
    }

    organization.status = "archived";
    await organization.save();

    // Send activation email
    const subject = "Organization Deletion";
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Sorry To See You Go</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #fff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #674df0;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #674df0;
            margin-top: 0;
            text-align: center;
          }
          p {
            margin: 0 0 20px;
            line-height: 1.5;
          }
          .btn {
            display: inline-block;
            font-weight: 500;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-user-select: none;
            user-select: none;
            border: 0px;
            padding: 0 50px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 3px;
            line-height: 74px;
            border-radius: 0px;
            color: #1b1f2e;
            cursor: pointer;
            z-index: 5;
            transition: all 0.4s ease-out 0s;
            background-color: #29f0b4;
            position: relative;
          }
          .btn:hover {
            background-color: #34495E;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Dear ${organization.name},</p>
          <p>We're sorry to hear that you've decided to leave VolunteerHub. We hope that our platform has helped you in your mission and that you've found value in using our service.</p>
          <p>If you have any feedback or suggestions for us, please don't hesitate to let us know. We're always looking for ways to improve our platform and provide better support to our users.</p>
          <p>Thank you for being a part of the VolunteerHub community. We wish you all the best in your future endeavors.</p>
          <p>Best regards,</p>
          <p>The VolunteerHub Team</p>
          <a href="https://volunteerhub.onrender.com/"><img src="https://i.ibb.co/Y20GL2q/signature.png" alt="signature" border="0" style="width:10rem"></a>
        </div>
      </body>
    </html> 
 `;
    await sendEmailToOrganization(organization.email, subject, html);

    // Add the role of "organization" to the owner
    const user = await User.findById(organization.owner);
    const organizationRole = await Role.findOne({ name: "organization" });
    if (!user.roles.includes(organizationRole._id)) {
      user.roles.push(organizationRole._id);
    }
    if (!user.organizations.includes(organization._id)) {
      user.organizations.push(organization._id);
    }
    await user.save();
    res.json(organization);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Revoke organization role from user when all his organizations are inactive
const revokeOrganizationRole = async (organizationId) => {
  const user = await User.findOne({ organizations: organizationId });

  if (!user) {
    console.log("User not found");
    return;
  }

  const activeOrganizations = user.organizations.filter(
    (org) => org.status === "active"
  );

  if (activeOrganizations.length === 0) {
    user.role = "user";
    await user.save();
    console.log(`User ${user.email} organization role revoked`);
  }
};

//Admin can deactivate organization
const deactivateOrg = async (req, res) => {
  try {
    const organization = await organizationModel
      .findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true })
      .exec();

    // Send activation email
    const subject = "Organization Suspended";
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NGO Account Dectivated</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #fff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #674df0;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #674df0;
            margin-top: 0;
            text-align: center;
          }
          p {
            margin: 0 0 20px;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Dear ${organization.name},</h1>
          <p>We regret to inform you that your organization's account on VolunteerHub has been suspended due to lack of activity. Our records show that you have not logged in or participated in any volunteer activities for the past months.</p>
          <p>We understand that your organization may have had other priorities, but VolunteerHub is committed to providing a platform that connects active and engaged organizations with volunteers in need. We encourage you to take advantage of the resources available on our platform to engage with volunteers and make a difference in your community.
          </p>
          <p>To reactivate your account, please contact us and we will be happy to assist you in getting your organization back on track.
          </p>
          <p>Thank you for your understanding and cooperation. We look forward to working with you again soon.</p>
          <p>Best regards,</p>
          <p>The VolunteerHub Team</p>
          <a href="https://volunteerhub.onrender.com/"><img src="https://i.ibb.co/Y20GL2q/signature.png" alt="signature" border="0" style="width:10rem"></a>
        </div>
      </body>
    </html> 
 `;
    await sendEmailToOrganization(organization.email, subject, html);
    res.json(organization);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Admin can block organization
const blockOrg = async (req, res) => {
  try {
    const organization = await organizationModel
      .findByIdAndUpdate(req.params.id, { status: "blocked" }, { new: true })
      .exec();

    // Send activation email
    const subject = "Organization Blocked";
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NGO Account Blocked</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #fff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #674df0;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #674df0;
            margin-top: 0;
            text-align: center;
          }
          p {
            margin: 0 0 20px;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Dear ${organization.name},</h1>
          <p>We regret to inform you that we have been forced to block your account on VolunteerHub due to activity that does not comply with our community guidelines.
          </p>
          <p>We take our responsibility to ensure the safety and integrity of our platform very seriously, and we have a zero-tolerance policy towards any behavior that puts our users at risk. Unfortunately, we have identified activity associated with your account that violates these policies.
          </p>
          <p>If you believe that this decision has been made in error, or if you would like to discuss the reasons behind this decision, please do not hesitate to contact us. Our team will be happy to work with you to find a solution that is in the best interests of both your organization and our community.
          </p>
          <p>Thank you for your understanding.</p>
          <p>Best regards,</p>
          <p>The VolunteerHub Team</p>
          <a href="https://volunteerhub.onrender.com/"><img src="https://i.ibb.co/Y20GL2q/signature.png" alt="signature" border="0" style="width:10rem"></a>
        </div>
      </body>
    </html> 
 `;
    await sendEmailToOrganization(organization.email, subject, html);

    res.json(organization);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//User can update its organization
const updateOrg = async (req, res) => {
  const { errors, isValid } = validateOrganizationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const {
      name,
      email,
      logo,
      description,
      issues,
      website,
      category,
      status,
      address,
    } = req.body;

    // Update the organization
    const orgId = req.params.id;
    const org = await organizationModel.findById(orgId);
    org.name = name;
    org.email = email;
    org.logo = logo;
    org.description = description;
    org.issues = issues;
    org.website = website;
    org.category = category;
    org.status = status;

    // Update the address
    const addressObj = new Address(address[0]);
    const existingAddress = await Address.findById(org.address[0]);
    if (existingAddress) {
      existingAddress.firstAddress = addressObj.firstAddress;
      existingAddress.secondAddress = addressObj.secondAddress;
      existingAddress.country = addressObj.country;
      existingAddress.zipCode = addressObj.zipCode;
      existingAddress.state = addressObj.state;
      await existingAddress.save();
    } else {
      const newAddress = await addressObj.save();
      org.address.push(newAddress._id);
    }

    await org.save();

    return res.status(200).json(org);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getActiveOrganizations = async (req, res) => {
  try {
    const organizations = await organizationModel
      .find({ status: "active" })
      .populate("members", "_id firstName lastName gender");
    axios.get(
      "https://volunteerhub-ml-flask.onrender.com/predict/classifyOrgs"
    );
    return res.status(200).json(organizations);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await organizationModel
      .findById(id)
      .populate("members", "_id firstName lastName gender");

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    axios.get(
      "https://volunteerhub-ml-flask.onrender.com/predict/classifyEvents"
    );
    res.status(200).json(organization);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const addMember = async (req, res) => {
  try {
    const organization = await organizationModel.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    organization.members.push(req.body.userId);

    await organization.save();

    return res.status(200).json(organization);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const removeMember = async (req, res) => {
  const { organizationId, userId } = req.params;

  try {
    const organization = await organizationModel.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    if (!organization.members.includes(userId)) {
      return res
        .status(403)
        .json({ message: "User is not a member of this organization" });
    }

    organization.members = organization.members.filter((member) => {
      return member.toString() !== userId.toString();
    });

    await organization.save();

    return res.json({
      message: "User has successfully quit the organization",
      organization,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const checkMembership = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const organizationId = req.params.organizationId;

    const organization = await organizationModel.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const isMember = organization.members.includes(userId);
    res.status(200).json({ isMember: isMember });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getActiveOrgsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const activeOrgs = await organizationModel
      .find({ owner: ownerId, status: "active" })
      .populate("members", "_id firstName lastName gender")
      .exec();

    res.json(activeOrgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCampaignsByOrganization = (req, res, next) => {
  const orgId = req.params.id;
  Campaign.find({ organization: orgId })
    .then((campaigns) => {
      res.status(200).json({ campaigns: campaigns });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Fetching campaigns failed." });
    });
};

const getById = async (id) => {
  try {
    const organization = await Organization.findById(id);
    if (!organization) {
      return console.log("Organization not found");
    }
    return organization;
  } catch (err) {
    console.error(err.message);
    return console.log(err.message);
  }
};

const getOrganizationParticipants = async (req, res) => {
  try {
    const participants = await Organization.find({
      organization: { _id: req.params },
    }).populate("members", "_id firstName lastName gender");
    res.send(participants);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getOrganizations,
  createOrg,
  activateOrg,
  deactivateOrg,
  blockOrg,
  updateOrg,
  getActiveOrganizations,
  getOrganizationById,
  addMember,
  removeMember,
  checkMembership,
  revokeOrganizationRole,
  getActiveOrgsByOwner,
  getCampaignsByOrganization,
  getById,
  getOrganizationParticipants,
  archiveOrg,
};

//FIXME: check why get active organizations by owner is not working properly and finish profile
