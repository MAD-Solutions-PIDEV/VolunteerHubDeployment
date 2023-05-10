const Mission = require("../models/mission");
const nodemailer = require("nodemailer");
const addMission = async (req, res) => {
  try {
    const {
      Title,
      Category,
      Description,
      SkillsRequired,
      LanguageRequired,
      StartDate,
      EndDate,
      Location,
      AddedBy,
    } = req.body;
    let imageName = null;
    if (req.file) {
      imageName = req.file.filename; // save the filename of the uploaded file
    }
   

    const mission = new Mission({
      Title,
      Category,
      Description,
      SkillsRequired,
      LanguageRequired,
      StartDate,
      EndDate,
      Location,
      
      Image: imageName,
      AddedBy,
    });
    const addedMission = await mission.save();
    res.status(200).json(addedMission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


async function getMissionById(req,res) {
  try {
    const { id } = req.params;
    const mission = await Mission.findById(id);
    if (!mission) {
      throw new Error("mission not found");
    }
    res.status(200).json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMission = async (req, res) => {
  try {
    const mission = await Mission.find();
    if (!mission || mission.length === 0) {
      throw new Error("mission not found");
    }
    res.status(200).json(mission);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}; 

const getMissionByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const missions = await Mission.find({ Category: category, status: "accepted" });
    if (!missions || missions.length === 0) {
      throw new Error("Missions not found for the given category");
    }
    res.status(200).json(missions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMission = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Title,
      Category,
      Description,
      SkillsRequired,
      LanguageRequired,
      StartDate,
      EndDate,
      Location,
      Image,
    } = req.body;
    const checkMissionExist = await Mission.findById(id);
    if (!checkMissionExist) {
      throw new Error("missions not found");
    }
    const updateMission = await Mission.findByIdAndUpdate(
      id,
      {
        $set: {
          Title,
          Category,
          Description,
          SkillsRequired,
          LanguageRequired,
          StartDate,
          EndDate,
          Location,
          Image,
        },
      },
      { new: true }
    );
    res.status(200).json(updateMission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const deleteMission = async (req, res) => {
  try {
    const { id } = req.params;
    const checkMissionExist = await Mission.findById(id);
    if (!checkMissionExist) {
      throw new Error("missions not found");
    }
    await Mission.findByIdAndDelete(id);
    res.status(200).json("delete with success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const acceptMission = async (req, res) => {
  try {
    const { id} = req.params;

    const checkIfMissionExist = await Mission.findById(id);
    if (!checkIfMissionExist) {
      throw new Error("Mission not found!");
    }
    const mission = await Mission.findByIdAndUpdate(
      id, { status: 'accepted' }
    );
    
    res.status(200).json({message:"mission accepted", mission : await Mission.findById(id)});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const refuseMission = async (req, res,next) => {
  try {
    const { id} = req.params;

    const checkIfMissionExist = await Mission.findById(id);
    if (!checkIfMissionExist) {
      throw new Error("mission not found!");
    }
    const mission = await Mission.findByIdAndUpdate(
      id, { status: 'refused' }
    );
    res.status(200).json({message:"mission refused",  mission : await Mission.findById(id)});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getMissionBySkills(skills) {
  const skillsArray = skills.split(',');
  const missions = await Mission.find({ SkillsRequired: { $elemMatch: { skill: { $in: skillsArray } } } });
  return missions;
}


function template(
  text,
  from,
  phone
 ) {
   return `
       <!DOCTYPE html>
       <html>
         <head>
           <meta charset="utf-8">
           <style>
           body {
             font-family: Arial, sans-serif;
             font-size: 16px;
             color: #333;
           }
           .container {
             max-width: 600px;
             margin: 0 auto;
             padding: 20px;
             border: 1px solid #ddd;
             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
             background-color: #f7f7f7;
           }
           h1 {
             font-size: 36px;
             font-weight: bold;
             color: #333;
             margin-top: 0;
             text-align: center;
             text-transform: uppercase;
             letter-spacing: 2px;
             font-family: Georgia, serif;
           }
           p {
             margin: 0 0 20px;
             line-height: 1.8;
             font-size: 18px;
           }
           .form-group {
             margin-bottom: 20px;
           }
           .form-label {
             display: block;
             font-size: 18px;
             font-weight: bold;
             margin-bottom: 10px;
             color: #333;
           }
           .form-input {
             display: block;
             width: 100%;
             padding: 10px 15px;
             font-size: 16px;
             border: 2px solid #ddd;
             border-radius: 10px;
             color: #333;
           }
           .form-input:focus {
             outline: none;
             border-color: #ff5722;
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
             padding: 10px 30px;
             font-size: 14px;
             text-transform: uppercase;
             letter-spacing: 2px;
             line-height: 1;
             border-radius: 5px;
             color: #fff;
             cursor: pointer;
             z-index: 5;
             transition: all 0.4s ease-out 0s;
             background-color: #ff5722;
             position: relative;
             text-decoration: none;
           }
           .btn:hover {
             background-color: #ff7043;
           }
           .username {
             font-size: 24px;
             font-weight: bold;
             color: #333;
             text-decoration: underline;
           }
         </style>
         
         </head>
         <body>
           <div class="container">
             <h1>VolunteerHub Team</h1>
             ${text}
             <div> If you would like to follow up with this volunteer, please find their contact information below:</div>
             <h5>Email: ${from}</h5>
             <h5>Phone: ${phone} </h5>
             Feel free to reach out to them directly to discuss your mission and any potential opportunities for collaboration.

           </div>
         </body>
       </html> 
     `;
 }
const sendMail =  (req, res) => {
  const email = req.body.email;
  const text = req.body.text;
  const phone = req.body.phone;
  let from =  req.body.from;
  // let from =`VolunteerHub <i***@gmail.com>`
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: from,
    to: email,
    subject: "You've made an impact: Interest in your mission has been piqued",
    text: text,
    html: template(
      text,
      from,
      phone
    ),
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
async function getFilteredMissions(userId) {
  const user = await user.findById(userId).select('skills');

  const missions = await Mission.find().select('Title Category Description SkillsRequired LanguageRequired StartDate EndDate Location Image');

  const filteredMissions = missions.filter(mission => {
    return mission.SkillsRequired.every(skill => user.Skills.includes(skill));
  });

  return filteredMissions;
}




module.exports={getMission,addMission,updateMission,deleteMission,getMissionByCategory,getMissionById,acceptMission,refuseMission,sendMail,getFilteredMissions,getMissionBySkills}