require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
const modelsPath = require.resolve("./models");
Object.keys(require.cache).forEach(function (key) {
  if (key.startsWith(modelsPath)) {
    delete require.cache[key];
  }
});
const db = require("./models");
const cron = require("node-cron");
const { newSeason } = require("../server/evolution/newSeason");
const { checkCampaignStatus } = require("./controllers/campaignSchedular");

// Express Route
var missionRouter = require("./routes/missions");
// var hostRouter = require("./routes/hosts");
var userRouter = require("./routes/users");
var resetPwdroutes = require("./routes/resetPwdroutes");
var adminRouter = require("./routes/adminRoutes");
var SMSRouter = require("./routes/SMSauth");
var campaignRouter = require("./routes/campaignRoutes");
var newsRouter = require("./routes/newsRoutes");
var commentNewsRouter = require("./routes/commentNewsRoutes");
var donationRouter = require("./routes/donationRoutes");
var rankRoutes = require("./routes/rankRoutes");

// Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database successfully connected!");
      initialRole();
    },
    (error) => {
      console.log("Could not connect to database : " + error);
      process.exit();
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/missions", missionRouter);
// app.use("/hosts", hostRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/api/auth", resetPwdroutes);
app.use("/sms", SMSRouter);
app.use("/campaign", campaignRouter);
app.use("/donation", donationRouter);
app.use("/news", newsRouter);
app.use("/commentNews", commentNewsRouter);
app.use("/rank", rankRoutes);
// PORT
const port = process.env.PORT || 4000;

// 404 Error
// app.use((req, res, next) => {
//   res.status(404).send("Error 404!");
// });

// If error persist!
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

//organization routes
app.use("/organizations", require("./routes/organization.routes"));

app.use("/uploads", express.static("uploads"));
// Google Auth

const passport = require("passport");
const authRoute = require("./routes/googleauth.routes");
const fbauthRoute = require("./routes/facebookauth.routes");
const cookieSession = require("cookie-session");
const passportStrategy = require("./utilities/passport");
const User = require("./models/user");
const event = require("./models/event");
const Role = require("./models/role");

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./routes/auth.routes")(app);
require("./routes/event.routes")(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/auth", authRoute);
app.use("/", fbauthRoute);
require("./routes/auth.routes")(app);
app.listen(port, () => console.log(`Listenting on port ${port}...`));

// Import Roles
function initialRole() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
      new Role({
        name: "volunteer",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'volunteer' to roles collection");
      });
      new Role({
        name: "organization",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'organization' to roles collection");
      });
      new Role({
        name: "host",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'host' to roles collection");
      });
    }
  });
}

//Captcha routes
const captchaRoute = require("./routes/captcha.routes");
app.use("/api", captchaRoute);

// Schedule task to run on January 1, March 1, June 1, and September 1 at midnight
// cron.schedule('*/5 * * * * *', () => {
cron.schedule("0 0 1 1,3,6,9 *", () => {
  console.log("New Season...");
  newSeason();
  //const id='6431747f4886625a9e89e275'
  // addScore(id)
});

// Start the campaign scheduler cron job
cron.schedule("*/30 * * * * *", () => {
  console.log("Campaign Schedular loading ");
  checkCampaignStatus();
});

app.use("/uploads", express.static("uploads"));
app.use("/classify", express.static("classification.py"));
const { spawn } = require("child_process");
const path = require("path");

app.post("/donationPrediction", (req, res) => {
  // Données du nouveau donateur
  const newDonor = req.body;
  console.log(newDonor);
  // Chemin vers le script Python de prédiction
  const scriptPath = path.join(__dirname, "donationPrediction.py");

  // Chemin vers l'interpréteur Python
  const pythonInterpreter = path.join(
    __dirname,
    "venv",
    "Scripts",
    "python.exe"
  );

  // Construction de la liste des arguments pour le script Python
  const args = [JSON.stringify(newDonor)];

  // Appel du script Python avec les arguments en entrée
  const pyProg = spawn(pythonInterpreter, [scriptPath, ...args]);

  // Récupération des résultats de la prédiction
  pyProg.stdout.on("data", (data) => {
    const predictedAmount = parseInt(data.toString());
    res.status(200).send(predictedAmount.toString().trim());
  });

  // const pyProg = spawn("/usr/local/bin/python3", [
  //   "/Users/mayssaalwaoui/Documents/VolunteerHub/server/donationPrediction.py",
  //   ...args,
  // ]);
  // pyProg.stdout.on("data", function (data) {
  //   const predictedAmount = parseInt(data.toString());
  //   res.status(200).send(predictedAmount.toString().trim());
  // });
  // Gestion des erreurs
  pyProg.stderr.on("data", (data) => {
    console.error(`Erreur dans le script Python : ${data}`);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la prédiction du montant de don."
      );
  });
});

//address routes
app.use("/address", require("./routes/address.routes"));
