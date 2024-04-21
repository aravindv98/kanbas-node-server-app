import express from "express"
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js"
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
const CONNECTION_STRING = "mongodb+srv://aravindv98:kanbas123@kanbas-a6.orjwinj.mongodb.net/kanbas?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: "https://a6--fascinating-chaja-290edb.netlify.app",
}));
const sessionOptions = {
    secret: "any secret",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

app.use(
    session(sessionOptions)
);
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);