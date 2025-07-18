const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email service
      auth: {
        user: "your-email@gmail.com",       // 🔁 replace with your email
        pass: "your-app-password"           // 🔁 use App Password if Gmail
      }
    });

    // Email options
    const mailOptions = {
      from: email,
      to: "your-email@gmail.com",          // 🔁 receiver's email (usually same)
      subject: `New message from ${name}`,
      text: message
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
