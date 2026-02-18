import nodemailer from "nodemailer"

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendMail = async (mail,code) => {
  const info = await transporter.sendMail({
    from: 'Secure-task-manager-api',
    to: mail,
    subject: "Your Verification Code",
    html: `
<div style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="500" cellpadding="0" cellspacing="0" 
               style="background:#ffffff; border-radius:8px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">

          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#333;">Secure Task Manager</h2>
              <p style="margin:5px 0 0; color:#777; font-size:14px;">
                Email Verification Code
              </p>
            </td>
          </tr>

          <tr>
            <td style="color:#555; font-size:16px; line-height:24px;">
              <p>Hello,</p>
              <p>Your verification code is:</p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 0;">
              <div style="
                font-size:28px;
                font-weight:bold;
                letter-spacing:6px;
                color:#2d89ef;
                background:#f1f5ff;
                padding:15px 25px;
                display:inline-block;
                border-radius:6px;">
                ${code}
              </div>
            </td>
          </tr>

          <tr>
            <td style="color:#555; font-size:14px; line-height:22px;">
              <p>This code will expire in <strong>5 minutes</strong>.</p>
              <p>If you did not request this, please ignore this email.</p>
            </td>
          </tr>

          <tr>
            <td style="padding-top:30px; border-top:1px solid #eee; font-size:12px; color:#999;" align="center">
              <p>
                © ${new Date().getFullYear()} Secure Task Manager<br/>
                This is an automated message, please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</div>
`})


  console.log("Message sent:", info.messageId);
};