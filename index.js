const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const attendeeRoutes = require("./routes/attendeeRoutes.js");

const app = express();

// DB
const dbUri = "mongodb+srv://admin:majoje1582@cluster0.cqudxbr.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

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