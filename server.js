const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log("Server is running");
// Contact form route
app.post('/contact', (req, res) => {
    const { fullName, email, subject, message } = req.body;

    console.log("Email received:", email); // Log the email value to check if it's correct

    // Create transporter with Gmail service
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "darwishadil4@gmail.com",
            pass: "dpbu lqzr gowe udwu",
        },
    });

    // Setup email data
   
let mailOptions = {
  from: email, // Use your email address here
    to: 'darwishadil4@gmail.com', // Recipient's email address
    subject: subject,
    text: `Name: ${fullName}\nEmail: ${email}\nsubject: ${subject}\nMessage: ${message}`,
    replyTo: email // Set the sender's email address as the reply-to address
};



    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending message');
        } else {
            console.log('Message sent: %s', info.messageId);
            res.status(200).send('Message sent successfully');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
