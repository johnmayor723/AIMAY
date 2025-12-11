import Attendee from "../models/Attendee.js";

export const homePage = async (req, res) => {
  res.render("index", { message: req.flash("message") });
};

export const register = async (req, res) => {
  const { name, address, phone } = req.body;
  const location = "Akera";

  // Count existing attendees
  const count = await Attendee.countDocuments({ location });

  if (count >= 40) {
    req.flash("message", "Sorry, Akera is fully booked (Max 40)");
    return res.redirect("/");
  }

  // Generate next serial number
  const serial = (count + 1).toString().padStart(4, "0");

  // Save attendee
  await Attendee.create({
    name,
    address,
    phone,
    location,
    code: serial,
  });

  // Send WhatsApp message using wa.me link
  const whatsappUrl = `https://wa.me/${phone}?text=Your%20Wedding%20Entry%20Code%20is%20${serial}`;

  req.flash("message", `Registered successfully! Your code: ${serial}. Check WhatsApp.`);
  return res.redirect(whatsappUrl);
};

export const verifyPage = (req, res) => {
  res.render("verify", { message: req.flash("message") });
};

export const verifyCode = async (req, res) => {
  const { code } = req.body;

  const attendee = await Attendee.findOne({ code });

  if (!attendee) {
    req.flash("message", "Invalid code. Try again.");
    return res.redirect("/verify");
  }

  req.flash("message", `Code valid! Welcome ${attendee.name}`);
  res.redirect("/verify");
};
