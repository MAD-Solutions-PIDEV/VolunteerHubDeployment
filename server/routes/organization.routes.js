const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organization.controller");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const filename = uuidv4() + "." + file.mimetype.split("/")[1];
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

//get all organizations
router.get("/allOrgs", organizationController.getOrganizations);

//getActiveOrgs
router.get("/activeOrgs", organizationController.getActiveOrganizations);

// Create organization
router.post("/addOrg", upload.single("logo"), organizationController.createOrg);

// Activate an organization by ID
router.put("/:id/activateOrg", organizationController.activateOrg);

// Deactivate an organization by ID
router.put("/:id/deactivateOrg", organizationController.deactivateOrg);

// Block an organization by ID
router.put("/:id/blockOrg", organizationController.blockOrg);

// Archive an organization by ID
router.put("/:id/archiveOrg", organizationController.archiveOrg);

// Update organization by ID
router.put("/updateOrg/:id", organizationController.updateOrg);

//Get organization by ID
router.get("/org/:id", organizationController.getOrganizationById);

//Add member to organization
router.put("/:id/members", organizationController.addMember);

//Remove member from organization members
router.delete(
  "/:organizationId/members/:userId",
  organizationController.removeMember
);

//Check membership
router.get(
  "/:organizationId/checkMembership/:userId",
  organizationController.checkMembership
);

//Revoke organization role
router.get(
  "/revoke-org-role/:id",
  organizationController.revokeOrganizationRole
);

//Get campaigns by organization
router.get("/campaigns/:id", organizationController.getCampaignsByOrganization);

//List of active orgs by owner
router.get("/active/:id", organizationController.getActiveOrgsByOwner);

//List of participants
router.get(
  "/participants/:orgId",
  organizationController.getOrganizationParticipants
);

module.exports = router;
