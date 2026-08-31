const express=require("express");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const app=express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const path = require("path");
const session = require("express-session");
const passport = require("./config/passport");
const careerProfileRoutes = require("./routes/careerProfileRoutes");
const roadmapRoutes=require("./routes/roadmapRoutes");
const learningProgressRoutes=require("./routes/learningProgressRoutes");
const skillRoutes=require("./routes/skillRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const projectRoutes=require("./routes/projectRoutes");
const certificateRoutes=require("./routes/certificateRoutes");
const weeklyReviewRoutes=require("./routes/weeklyReviewRoutes");
const achievementRoutes=require("./routes/achievementRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const experienceRoutes=require("./routes/experienceRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const stageChallengeRoutes = require( "./routes/stageChallengeRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(helmet({crossOriginEmbedderPolicy: false}));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static(path.join(process.cwd(), "uploads")));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }
    })
);
app.use(passport.initialize());
app.use((req, res, next) => {
  console.log(
    " REQUEST:",
    req.method,
    req.originalUrl
  );

  next();
});
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/career-profile",careerProfileRoutes);
app.use("/api/v1/roadmaps",roadmapRoutes);
app.use("/api/v1/learning-progress",learningProgressRoutes);
app.use("/api/v1/skills",skillRoutes);
app.use( "/api/v1/resumes",resumeRoutes);
app.use("/api/v1/projects",projectRoutes);
app.use("/api/v1/certificates",certificateRoutes);
app.use("/api/v1/weekly-review/",weeklyReviewRoutes);
app.use("/api/v1/achievements/",achievementRoutes);
app.use("/api/v1/notifications",notificationRoutes);
app.use("/api/v1/experiences",experienceRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);
app.use("/api/v1/stage-challenge",stageChallengeRoutes);

app.get("/",(req,res)=>{
    res.send("Backend is running.... !");
});
module.exports=app;