const Event = require("../models/event");
const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");
const Organization = require("../models/Organization");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const moment = require("moment");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { addScore } = require("../evolution/addScore");
const badWords = require("../utilities/badWords.json");
const cloudinary = require("cloudinary").v2;
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
const { Leap } = require("@leap-ai/sdk");
const Activity = require("../models/activity");
const fs = require("fs");
const axios = require("axios");
const { spawn } = require("child_process");
const path = require("path");
dotenv.config();
const leap = new Leap("e27890d8-f1f0-4636-9ca9-26959becd02b");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Create New Event
exports.create = async (req, res) => {
  try {
    // Search user by id
    Organization.findById(req.body.organization).then((org) => {
      const sdgNames = req.body.sdgs.split(",");
      const sdgs = sdgNames.map((name) => ({ name: name.trim() }));
      let imageName = null;
      if (req.file) {
        imageName = req.file.filename; // save the filename of the uploaded file
      }

      // Create Event instance
      const event = new Event({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        startDate: new Date(
          req.body.dateStart + "T" + req.body.startTime + ":00.000Z"
        ).toISOString(),
        endDate: new Date(
          req.body.dateEnd + "T" + req.body.endTime + ":00.000Z"
        ).toISOString(),
        sdgs: sdgs,
        image: imageName,
        nbParticipant: req.body.nbParticipant,
        subscribe: req.body.subscribe,
        price: req.body.price,
        location: [
          {
            latitude: req.body.lat,
            longitude: req.body.long,
            country: req.body.country,
          },
        ],
        organization: org,
      });

      // Save Event
      event.save();

      // Add the event id to the organization's list of events
      org.events.push(event._id);
      org.save();

      res.send(event);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Upload Image to uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const filename = uuidv4() + "." + file.mimetype.split("/")[1];
    cb(null, filename);
  },
});

exports.upload = multer({ storage: storage });

// Get all events
exports.findall = async (req, res) => {
  try {
    const events = await Event.find({
      startDate: { $gte: new Date() },
    }).populate("organization", "_id name description logo wallet");
    res.send(events);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Find Event by [Id]
exports.findById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId)
      .populate("organization", "name description logo wallet")
      .populate("participants", "firstName lastName image");
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update Event
exports.update = async (req, res) => {
  const eventId = req.body.id;
  const updateData = req.body;

  Event.findByIdAndUpdate(eventId, updateData, { new: true })
    .then((updatedEvent) => {
      res.status(200).json(updatedEvent);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Delete event
exports.delete = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.follow = async (req, res) => {
  // Get and fetch for the User & Event
  const user = await User.findById(req.body.userId);
  try {
    // Search for the event
    const event = await Event.findById(req.body.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if User is already has joined the event
    if (
      event.participants.some((participant) => {
        addScore(req.body.userId);
        return participant._id.equals(req.body.userId);
      })
    ) {
      revoke(req.body.userId, req.body.eventId);
      return res.json({ message: "false" });
    }

    // Associate User to event.participants and save the event
    event.participants.push(user);
    await event.save();

    res.status(200).json({ message: "true" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.check = async (req, res) => {
  // Check if User connected
  const userId = req.params.userId;
  const eventId = req.params.eventId;
  console.log(userId);
  try {
    // Search for the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if User is already has joined the event
    if (
      event.participants.some((participant) => {
        return participant._id.equals(userId);
      })
    ) {
      return res.json({ message: "false" });
    }

    res.status(200).json({ message: "true" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Revoke follow
async function revoke(us, ev) {
  try {
    const event = await Event.findById(ev);
    const user = await User.findById(us);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    event.participants = event.participants.filter((participant) => {
      return !participant._id.equals(user._id);
    });
    await event.save();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Internal Server Error" });
  }
}

exports.unfollow = async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    if (!req.body.userId) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = await User.findById();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Check if the user is already a participant of the event
    if (
      !event.participants.some((participant) => {
        return participant._id.equals(user._id);
      })
    ) {
      return res
        .status(400)
        .json({ message: "User is not a participant of the event" });
    }
    // desassociate User from event.participants and save the event
    event.participants = event.participants.filter((participant) => {
      return !participant._id.equals(user._id);
    });
    await event.save();
    return res
      .status(400)
      .json({ message: "User has been removed from the event" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

// Template mail
function template(
  first,
  last,
  event,
  date,
  startTime,
  duration,
  id,
  lat,
  long
) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
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
            .username {
              size:20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>VolunteerHub!</h1>
            <p>Dear <span class="username">${first} ${last}</span>,</p>
            <p>We hope this email finds you well. This is just a friendly reminder that the ${event} is coming up soon and we are excited to have you join us!</p>
            <p>As a participant, you will have the opportunity to. We are confident that you will find the event informative, engaging, and enjoyable.</p>
            <p>Here are the event details once again for your convenience:</p>
            <br>
            <p>Event Name: <b>${event}</b></p>
            <p>Date: <b>${date}</b></p>
            <p>Time: <b>${startTime}</b></p>
            <p>Duration: <b>${duration} Hour(s)</b></p>
            <p>Location: <a href="https://www.google.com/maps/dir//${lat},${long}/@${lat},${long},10.5z">View on google maps</a><b></p>
            <br>
            <p>If you haven't done so already, please confirm your attendance by replying to this email.</p>
            <p>This will help us finalize our preparations and ensure that everything runs smoothly on the day.</p>
            <p>If you have any questions or concerns, please do not hesitate to reach out to us.</p> 
            <p>We are here to assist you in any way possible.</p>
            <br>
            <p>Thank you for your participation, and we look forward to seeing you soon!</p>
            <br>
            <p>Best regards,</p>
            <p>The VolunteerHub Team</p>
            <a href="https://volunteerhub-eo7t.onrender.com/"><img src="https://i.ibb.co/Y20GL2q/signature.png" alt="signature" border="0" style="width:10rem"></a>
            <p style="text-align: center;"><a href="https://volunteerhub-eo7t.onrender.com/event/${id}" style="text-decoration: none; color:white" class="btn">View Event</a></p>
          </div>
        </body>
      </html> 
    `;
}

exports.org = async (req, res) => {
  try {
    const userId = req.params.userId;
    const organizations = await Organization.find({
      owner: userId,
      status: "active",
    }).populate("members", "_id firstName lastName");
    res.status(200).json({ organizations });
  } catch (err) {
    next(err);
  }
};

// Find event by [sdg]
exports.sdg = async (req, res) => {
  try {
    const sdg = req.body.sdg;
    let query = { startDate: { $gte: new Date() } };
    if (sdg) {
      query["sdgs.name"] = sdg;
    }

    const events = await Event.find(query).populate(
      "organization",
      "_id name description logo"
    );
    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

exports.approval = async (req, res) => {
  const eventId = req.params.eventId;
  const { approve } = req.body;
  // update event status
  try {
    const event = await Event.findById(eventId);
    event.approve = approve;
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Find event by [sdg]
exports.sdg = async (req, res) => {
  try {
    const sdg = req.body.sdg;

    let query = { startDate: { $gte: new Date() } };

    if (sdg) {
      query["sdgs.name"] = sdg;
    }

    const events = await Event.find(query).populate(
      "organization",
      "_id name description logo"
    );

    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

exports.approval = async (req, res) => {
  const eventId = req.params.eventId;
  const { approve } = req.body;
  // update event status
  try {
    const event = await Event.findById(eventId);
    event.approve = approve;
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.shuffle = async (req, res) => {
  Activity.distinct("user", {
    action: { $regex: /^participate/i },
    newDate: { $gte: today, $lt: today + 24 * 60 * 60 * 1000 },
  })
    .then((userIDs) => {
      const userPromises = userIDs.map((userID) => User.findById(userID));
      Promise.all(userPromises)
        .then((users) => {
          // find the last matching activity record
          Activity.findOne({
            action: { $regex: /^participate/i },
            newDate: { $gte: today, $lt: today + 24 * 60 * 60 * 1000 },
          })
            .sort({ newDate: -1 })
            .then((lastActivity) => {
              if (lastActivity) {
                // update the action to 'winner'
                Activity.findByIdAndUpdate(lastActivity._id, {
                  action: "winner :",
                })
                  .then(() => {
                    console.log(
                      `Updated activity record with ID ${lastActivity._id} to winner`
                    );
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              } else {
                console.log("No matching activity records found");
              }
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
};

const SetWinner = schedule.scheduleJob("0 10 11 * *", async () => {
  Activity.distinct("user", {
    action: { $regex: /^participate/i },
    newDate: { $gte: today, $lt: today + 24 * 60 * 60 * 1000 },
  })
    .then((userIDs) => {
      const userPromises = userIDs.map((userID) => User.findById(userID));
      Promise.all(userPromises)
        .then((users) => {
          // find the last matching activity record
          Activity.findOne({
            action: { $regex: /^participate/i },
            newDate: { $gte: today, $lt: today + 24 * 60 * 60 * 1000 },
          })
            .sort({ newDate: -1 })
            .then((lastActivity) => {
              if (lastActivity) {
                // update the action to 'winner'
                Activity.findByIdAndUpdate(lastActivity._id, {
                  action: "winner :",
                })
                  .then(() => {
                    console.log(
                      `Updated activity record with ID ${lastActivity._id} to winner`
                    );
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              } else {
                console.log("No matching activity records found");
              }
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

exports.postNFT = async (req, res) => {
  const username = req.body.username;
  console.log("username=", username);
  // Set the path to the project directory
  const projectDir = path.join(__dirname, "..");

  // Set the path to the Python script
  const pyFile = path.join(projectDir, "mintNFT.py");

  // Set the path to the virtual environment Python executable
  const env = path.join(projectDir, "venv", "Scripts", "python.exe");

  // Run the Python script with the virtual environment and pass the username parameter
  const pyProg = spawn(
    env,
    [pyFile, username],
    {
      env: {
        ...process.env, // include current environment variables
        PHRASE0: process.env.PHRASE0,
        PHRASE1: process.env.PHRASE1,
        PHRASE2: process.env.PHRASE2,
        PHRASE3: process.env.PHRASE3,
        PHRASE4: process.env.PHRASE4,
        PHRASE5: process.env.PHRASE5,
        PHRASE6: process.env.PHRASE6,
        PHRASE7: process.env.PHRASE7,
        PHRASE8: process.env.PHRASE8,
        PHRASE9: process.env.PHRASE9,
        PHRASE10: process.env.PHRASE10,
        PHRASE11: process.env.PHRASE11,
        PHRASE11: process.env.PHRASE11,
        SECRETKEY: process.env.SECRETKEY,
        NEWPASSWORD: process.env.NEWPASSWORD,
      },
    },
    { shell: true }
  );

  pyProg.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  pyProg.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pyProg.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const Reminder = schedule.scheduleJob("0 0 * * *", async () => {
  try {
    // Find all events that are starting in the next 24 hours
    const events = await Event.find({
      startDate: {
        $gt: new Date(),
        $lt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      },
    }).populate("participants", "email firstName lastName");

    // Create a transporter to send emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Loop through each event and send a reminder email to all participants
    for (const event of events) {
      for (const participant of event.participants) {
        // Calculating...
        // Convert to ISO format
        const isoStartDate = event.startDate.toISOString();
        // Extract date part
        const date = isoStartDate.slice(0, 10);
        // Extract time from date
        const startDate = moment(event.startDate);
        const endDate = moment(event.endDate);
        // Extract time and duration
        const startTime = startDate.format("LT");
        // Duration in hours
        const duration = Math.round(
          moment.duration(endDate.diff(startDate)).asHours()
        );

        // Retrive User(first name & last name) and upercase first lettre
        const firstName =
          participant.firstName.charAt(0).toUpperCase() +
          participant.firstName.slice(1);
        const lastName =
          participant.lastName.charAt(0).toUpperCase() +
          participant.firstName.slice(1);

        const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: participant.email,
          subject: `Reminder: Event "${event.name}" is Just Around the Corner!`,

          html: template(
            firstName,
            lastName,
            event.name,
            date,
            startTime,
            duration,
            event._id,
            event.location[0].latitude,
            event.location[0].longitude
          ),
        };
        await transporter.sendMail(mailOptions);
        console.log("Emails sent");
      }
    }
  } catch (err) {
    console.error(err);
  }
});

// Create New Comment
exports.createComment = async (req, res) => {
  try {
    console.log(req.body.user);
    const comment = new Comment({
      message: req.body.message,
    });

    // Check for bad words
    const containsBadWords = badWords.some((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "i");
      return regex.test(req.body.message);
    });
    if (containsBadWords) {
      res.send("badWord");
    } else {
      // Search user by id
      User.findById(req.body.user).then((user) => {
        comment.user = user;

        // Search event by id
        Event.findById(req.body.event).then((event) => {
          // Create Event instance
          comment.event = event;

          // Save Comment
          comment.save();
          res.send(comment);
        });
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all comments
exports.findComments = async (req, res) => {
  const event = req.params.eventId;
  try {
    const comments = await Comment.find({ event: { $eq: event } }).populate(
      "user",
      "username image gender"
    );
    res.send(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createPost = async (req, res) => {
  const prompt = req.body.prompt;
  const username = req.body.username;
  try {
    //stable diffusion 1.5
    leap.usePublicModel("sd-1.5");

    //generate the image by passing in the prompt, using leap SDK
    const response = await leap.generate.generateImage({
      prompt: prompt,
    });
    const imageUrl = response.data.images[0].uri;
    // download the image from the API response to a specific directory
    if (imageUrl) {
      // download the image from the API response to a specific directory
      const imageFilePath = await downloadImage(imageUrl);
      //send JSON response to front end, with the data being the image in this case
      const py = await res.status(200).json({
        success: true,
        data: imageUrl,
      });
    } else {
      res.status(400).json({
        success: false,
        error: "The image URL could not be retrieved",
      });
    }
  } catch (error) {
    console.log(error);
    //send error to front end, so user can easily see that something went wrong
    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

// function to download image from API response to specific directory
const downloadImage = async (imageUrl) => {
  const imageFileName = "image.jpg";
  const imageFilePath = `./uploads/nft/${imageFileName}`;
  const imageStream = await axios.get(imageUrl, { responseType: "stream" });
  imageStream.data.pipe(fs.createWriteStream(imageFilePath));
  return imageFilePath;
};

const today = new Date().setHours(0, 0, 0, 0); // get today's date at midnight
exports.getWinner = async (req, res) => {
  Activity.distinct(
    "user",
    {
      action: { $regex: /^participate/i },
      newDate: { $gte: today, $lt: today + 24 * 60 * 60 * 1000 },
    },
    (err, userIDs) => {
      if (err) {
        console.error(err);
        // handle error
      } else {
        const userPromises = userIDs.map((userID) => User.findById(userID));
        Promise.all(userPromises)
          .then((users) => {
            const usernames = users.map((user) => user.username);
            res.send(usernames);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  );
};

exports.checkGame = async (req, res) => {
  Activity.distinct(
    "user",
    {
      action: { $regex: /winner/i },
      newDate: { $gte: today, $lt: today + 24 * 60 * 60 * 1000 },
    },
    (err, userIDs) => {
      if (err) {
        console.error(err);
        // handle error
      } else {
        const userPromises = userIDs.map((userID) => User.findById(userID));
        Promise.all(userPromises)
          .then((users) => {
            const lastUser = users.pop();
            console.log(lastUser);
            res.json(lastUser.username);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  );
};

exports.getNFT = async (req, res) => {
  const userId = req.params.userId;
  try {
    // Retrieve the user's data from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the user's NFTs
    const nfts = user.nfts;

    res.json(nfts);
  } catch (error) {
    console.log("Error retrieving user NFTs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
