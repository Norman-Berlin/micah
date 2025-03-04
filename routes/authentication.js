const express = require('express');
// const bcrypt = require('bcrypt');
const { pool } = require('../config/db');
const router = express.Router();

//user registration handling route
router.post('/registration', async (req, res) => {
    const { fullname, email, contact, password } = req.body;
  
    try {
      // Check if the email already exists
      const validateEmail = `SELECT * FROM micah_supporters WHERE email = ?;`
      const [emailResults] = await pool.promise().execute(validateEmail, [email]);
  
      if (emailResults.length > 0) {
        return res.status(400).json({ error: 'Email already registered.' });
      }
  
      // Validate contact
      const validateContact = `SELECT * FROM micah_supporters WHERE contact = ?;`
      const [contactResults] = await pool.promise().execute(validateContact, [contact]);
  
      if (contactResults.length > 0) {
        return res.status(400).json({ error: 'Phone number already registered.' });
      }
  
    //   // Hash the password
    //   const hashedPassword = await bcrypt.hash(password, 10);
  
      // Generate verification token
      // const verificationToken = crypto.randomBytes(20).toString('hex');
  
      // // Prepare the email
      // const transporter = nodemailer.createTransport({
      //   host: 'smtp.gmail.com',
      //   port: 465,
      //   secure: true,
      //   auth: {
      //     user: 'onlinelearningclas@gmail.com',
      //     pass: 'fjaxelsjzejciyhp',
      //   },
      //   connectionTimeout: 60000, // 60 seconds timeout for email connections
      //   tls: {
      //     rejectUnauthorized: false,
      //   },
      // });
  
      // const mailOptions = {
      //   from: 'no-reply@yourdomain.com',
      //   to: email,
      //   subject: 'DIET MASTER Account Verification',
      //   html: `
      //     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; text-align: center;">
      //       <h2 style="color: #007BFF; margin-bottom: 20px;">Welcome to DIET MASTER.</h2>
      //       <p style="font-size: 16px;">Please click the button below to verify your email address:</p>
      //       <a href="http://192.168.130.103:3000/activate/${verificationToken}"
      //          style="
      //            display: inline-block;
      //            padding: 10px 20px;
      //            margin: 20px auto;
      //            color: #fff;
      //            background-color: #28a745;
      //            text-decoration: none;
      //            font-size: 16px;
      //            border-radius: 5px;
      //          ">
      //         Activate your account
      //       </a>
      //       <p style="font-size: 14px; color: #666;">If you didn't create an account, you can safely ignore this email.</p>
      //     </div>
      //   `,
      // };
  
      // // Function to retry email sending
      // async function sendEmailWithRetry(mailOptions, retries = 3) {
      //   for (let attempt = 1; attempt <= retries; attempt++) {
      //     try {
      //       await transporter.sendMail(mailOptions);
      //       return; // Email sent successfully
      //     } catch (error) {
      //       console.error(Attempt ${attempt} failed:, error);
      //       if (attempt === retries) throw error; // Rethrow after max retries
      //     }
      //   }
      // }
  
      // // Send the email with retry logic
      // await sendEmailWithRetry(mailOptions);
  
      // Insert the user into the database only if email sending succeeds
      // const insertQuery = INSERT INTO micah_supporters (username, email, contact, password, verification_token) VALUES (?, ?, ?, ?, ?);
      // await pool.promise().execute(insertQuery, [fullname, email, contact, hashedPassword, verificationToken]);
  
      const insertQuery = `INSERT INTO micah_supporters (username, email, contact, password) VALUES (?, ?, ?, ?);`
      await pool.promise().execute(insertQuery, [fullname, email, contact, password]);
      // Insert the user into the database only if email sending succeeds
      
  
      res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
      console.error('Detailed error during registration:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
      });
      res.status(500).json({ error: 'Could not complete registration. Please try again later.' });
    }
  });

  module.exports = router;