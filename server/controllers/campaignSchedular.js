const Campaign = require('../models/Campaign');
const {CompleteCampaign}=require('./campaignController');
const sendEmailToOrganization = require("../utilities/organizationEmail");
const { getById } = require('./organization.controller');
const Organization =require('../models/Organization');
async function checkCampaignStatus() {
  try {
    const campaigns = await Campaign.find(); // Retrieve all campaigns
    for (const campaign of campaigns) {
      const currentAmount = campaign.currentAmount;
      const goalAmount = campaign.goalAmount;
      const organization = await getById(campaign.organization);
      //console.log(organization);
      //console.log(organization);
      if (!(campaign.status==="completed") &&(currentAmount === goalAmount || Date.now() >= campaign.deadline || currentAmount >= goalAmount  )) {
        // If the campaign has reached its goal amount or the deadline has passed, set the status to "closed"
        campaign.status = "completed";
        await CompleteCampaign(campaign._id); // Update the campaign status in the database
        console.log(campaign);
        const subject = `ampaign ${campaign.title} Completed`;
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Campaign Completed</title>
      
    <body>
        <div class="container">
        <h1>${campaign.title} Completed</h1>
        <p>Your compaign is finish you can consult more details collected in your organization space.</p>
        <p>your conllected amount is = ${campaign.currentAmount}</p>
        <p>The VolunteerHub team</p>
        <a href="http://localhost:3000/"></a>
      </div>
    </body>
    </html>
    
 `;
 console.log(organization.email);
    await sendEmailToOrganization(organization.email, subject, html);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = { checkCampaignStatus };
