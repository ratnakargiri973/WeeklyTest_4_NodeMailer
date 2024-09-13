import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
let PORT=process.env.PORT || 9876 ;
let PASSWORD=process.env.PASSWORD;
// let PASSWORD="Pritiranjan@123";
// console.log(PASSWORD)

app.post('/user', async (req, res) => {
  console.log(req.body);

  let {name,email,message} = req.body;
  const thankYouMessage = `
  Dear ${name},

  A big THANK YOU for getting in touch with us! We have received your message, and we truly appreciate you taking the time to reach out.

  Here are the details you provided:

  Name: ${name}
  Email: ${email}
  Your Message: ${message}

  We will review your message and get back to you as soon as possible. If you need immediate assistance, feel free to contact us at support@example.com.

  Thank you once again for your message! We look forward to assisting you.

  Best regards,
  Pritiranjan Patra
`;
  
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: "patrapritiranjan957@gmail.com",
          pass:`${PASSWORD}`,
        },
      });

      const info = await transporter.sendMail({
        from: '<patrapritiranjan957@gmail.com>',
        to: `${email}`,
        subject: `Welcome ${name}`,
        text: thankYouMessage, 
        html:  `
        <p>Dear <strong>${name}</strong>,</p>
        <p>A big <strong>THANK YOU</strong> for getting in touch with us! We have received your message, and we truly appreciate you taking the time to reach out.</p>
        <p><strong>Here are the details you provided:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Your Message:</strong> ${message}</li>
        </ul>
        <p>We will review your message and get back to you as soon as possible. If you need immediate assistance, feel free to contact us at support@example.com.</p>
        <p>Thank you once again for your message! We look forward to assisting you.</p>
        <p>Best regards,<br>Pritiranjan Patra</p>
      `,
      });
      
      res.json(info)

})
app.listen(PORT,()=>{
    console.log('Listening on port 9876');
})