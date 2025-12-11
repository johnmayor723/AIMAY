import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";
import attendeeRoutes from "./routes/attendeeRoutes.js";

const app = express();

// DB
const dbUri = "mongodb+srv://admin:majoje1582@cluster0.cqudxbr.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err) );

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
//lkkkk
app.use(flash());

// Routes
app.use("/", attendeeRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
