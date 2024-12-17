const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Email configuration
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;


// Email details
const SUBJECT = 'Challenge 3 Completed';
const BODY = `
Name: Priyanshu Maithani
Branch: Computer Science  
Mobile Number: +918394058356
`;

// Function to validate image type
function validateImage(filePath) {
  const allowedExtensions = ['.png', '.jpg', '.jpeg'];
  const fileExtension = path.extname(filePath).toLowerCase();
  return allowedExtensions.includes(fileExtension);
}

// Function to send an email with attachment
async function sendEmail(imagePath) {
  try {
    // Validate the image file type
    if (!validateImage(imagePath)) {
      console.error('Error: Only images of type PNG, JPG, and JPEG are allowed.');
      return;
    }

    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.error('Error: Image file does not exist at the provided path.');
      return;
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD, // Use app password
      },
    });

    // Email options
    const mailOptions = {
      from: USER_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: SUBJECT,
      text: BODY,
      attachments: [
        {
          filename: path.basename(imagePath),
          path: imagePath,
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.response);
  } catch (error) {
    console.error('❌ Error while sending email:', error.message);
  }
}

// Example usage
const IMAGE_PATH = path.join(__dirname, 'image.jpg');
console.log('Image Path:', IMAGE_PATH);

sendEmail(IMAGE_PATH);
