import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";
import attendeeRoutes from "./routes/attendeeRoutes.js";

const app = express();

// DB
mongoose.connect("mongodb://127.0.0.1:27017/wedding-app");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "weddingSecret123",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Routes
app.use("/", attendeeRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
