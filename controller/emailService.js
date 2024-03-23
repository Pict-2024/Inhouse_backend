import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pictinhouse@gmail.com',
    pass: 'czmn gmvh ezqy gnkw', 
  },
});

// Function to send an email
export const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

