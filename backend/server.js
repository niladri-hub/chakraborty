const nodemailer = require("nodemailer");

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or another SMTP provider
      auth: {
        user: "niladric06@gmail.com",
        pass: "niladri@23", // Use App Password if 2FA enabled
      },
    });

    // Send mail
    await transporter.sendMail({
      from: email,
      to: "niladric06@gmail.com", // your inbox
      subject: `New Contact from ${name}`,
      text: message,
    });

    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message." });
  }
});
