const db = require("../models");
const Address = require("../models/address");
const Rank = require("../models/Rank");
const User = db.user;
const Role = db.role;
const ValidateRegister = require("../validation/Register");
const isEmpty = require("../validation/isEmpty");
var bcrypt = require("bcryptjs");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");
const secretKey = generateSecretKey(20);
const { sendConfirmationEmail } = require("../validation/emailVerification");
const Activity = require("../models/activity");

// SignUp
exports.signup = (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      // Inizialize ActivationCodeEmailVerification
      const characters =
        "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
      let activationCode1 = "";
      for (let i = 0; i < 25; i++) {
        activationCode1 +=
          characters[Math.floor(Math.random() * characters.length)];
      }
      // create a new Rank document
      const rank = new Rank();
      rank.save();

      // Inizialize User
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image || "",
        gender: req.body.gender,
        birthday: req.body.birthday,
        phone: req.body.phone,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        activationCode: activationCode1,
        rank: rank._id,
      });

      // Inizialize Address
      if (!isEmpty(req.body.address)) {
        const address = new Address({
          firstAddress: req.body.address.firstAddress,
          secondAddress: req.body.address.secondAddress,
          country: req.body.address.country,
          zipCode: req.body.address.zipCode,
          state: req.body.address.state,
        });

        // Save adress before effecting to the user
        address.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          } else {
            user.address = address._id;
          }
        });
      }

      // Default Address
      const address = new Address({
        firstAddress: "",
        secondAddress: "",
        country: "",
        zipCode: "",
        state: "",
      });

      // Attribute address to user
      address.save((err, savedAddress) => {
        if (err) {
        } else {
          user.address.push(savedAddress._id);
          user.save((err, savedUser) => {
            if (err) {
            } else {
              console.log(savedUser);
            }
          });
        }
      });

      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        // Searching by:_id for the Address if exist
        if (!isEmpty(req.body.address)) {
          const address = new Address({
            firstAddress: req.body.address.firstAddress,
            secondAddress: req.body.address.secondAddress,
            country: req.body.address.country,
            zipCode: req.body.address.zipCode,
            state: req.body.address.state,
          });

          user.address = address;
          //   }
          //   );
        }
        if (req.body.roles) {
          // Searching by:name for the ROLE if exist
          Role.find(
            {
              name: { $in: req.body.roles },
            },
            (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              // Affecting Role to the user.roles
              user.roles = roles.map((role) => role._id);
              // Save user details
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({
                  message: "Account was registered successfully!",
                });
              });
            }
          );
        } else {
          // Default affectation (volunteer)
          Role.findOne({ name: "volunteer" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            user.roles = [role._id];
            // Save volunteer details
            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.send({
                message:
                  "Thank you for registering with us! Please activate your account via the email we sent you.",
              });
              //Send email Confirmaiton
              sendConfirmationEmail(
                user.username,
                user.email,
                user.activationCode
              );
            });
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
// };

// SignIn
exports.signin = (req, res) => {
  // isEmail contain email pattern that check if email is valid or not
  const isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      req.body.identifier
    );

  User.findOne(
    // Check if request pass an email or username
    isEmail ? { email: req.body.identifier } : { username: req.body.identifier }
  )
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // Check if password matching
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      // Check if compte isActive
      var isActive = user.isActive === true;
      if (passwordIsValid && !isActive) {
        return res.status(401).send({ message: "Please activate your email!" });
      }

      // Assign token
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      var authorities = [];

      // Pass token to Header Session
      res.set("token", token);
      res.set("Access-Control-Expose-Headers", "token");
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      // Retrive User logged
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        gender: user.gender,
        roles: authorities,
        phone: user.phone,
        donationTimes:user.donationTimes,
        birthday:user.birthday,
        isActive: user.isActive,
      });
    });
};

// Log
exports.logActivity = (req, res) => {
  const activity = new Activity({
    ipAddress: req.body.ipAddress,
    os: req.body.os,
    browser: req.body.browser,
    uaString: req.body.uaString,
    device: req.body.device,
    newDate: req.body.newDate,
    action: req.body.message,
    user: req.body.user,
  });

  activity
    .save()
    .then((activity) => {
      res.status(201).json(activity);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

// Genrate Random(SecretKey)
function generateSecretKey(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
exports.getSecretKey = () => {
  return secretKey;
};

// SignOut
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

//Reset pwd
// Password reset request
exports.passwordResetRequest = (req, res) => {
  const email = req.body.email;
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Generate reset token
    const resetToken = generateResetToken();

    // Save reset token and expiration time to user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      // Send email with reset token to user
      sendPasswordResetEmail(req, user.email, resetToken); // Pass req as a parameter
      res.send({
        message: "Password reset email sent successfully!",
      });
    });
  });
};

function generateResetToken() {
  const token = crypto.randomBytes(20).toString("hex");
  return token;
}

function sendPasswordResetEmail(req, email, resetToken) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Password Reset Request",
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link:\n\n" +
      "http://localhost:3000" +
      "/reset/" +
      "\n\n" +
      "And paste this code into your browser to complete the process:" +
      "\n\n" +
      resetToken +
      "\n\n" +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
/*
// Password reset
exports.passwordReset = (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "Invalid or expired token." });
      }
      // Update user's password
      user.password = bcrypt.hashSync(req.body.password, 8);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Password reset successfully!" });
      });
    }
  );
};
*/

// verifyUserActivateEmail

exports.verifyUser = (req, res) => {
  User.findOne({ activationCode: req.params.activationCode }).then((user) => {
    if (!user) {
      res.send({
        message: "this activation code is wrong",
      });
    } else {
      user.isActive = true;
      user.save();
      res.send({ message: "the account is successfully activated" });
    }
  });
};

exports.findRoleByName = async (req, res) => {
  const name = req.params.name;

  try {
    const role = await Role.findOne({ name });

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
