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
    req.flash("message", "Sorry, Akera is fully booked (Maximum of 40 attendees reached).");
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

  // Venue details
  const venueAddress = "3 CMD Road, Ikosi, Lagos";
  const mapLink = encodeURIComponent("https://www.google.com/maps?q=3+CMD+Road+Ikosi+Lagos");

  // Build WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Dear ${name},

Thank you for indicating your intention to attend the wedding of Aisha & Mayowa.

Your Entry Code is: ${serial}

Venue Address:
${venueAddress}

Google Maps Directions:
https://www.google.com/maps?q=3+CMD+Road+Ikosi+Lagos

We look forward to celebrating with you!`
  );

  const whatsappUrl = `https://wa.me/${phone}?text=${whatsappMessage}`;

  // Flash message for website
  req.flash(
    "message",
    `Registration successful! Your entry code is ${serial}. A WhatsApp message has been sent to you with venue details.`
  );

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
