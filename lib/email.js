import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({ to, subject, html, text }) {
  try {
    const mailOptions = {
      from: {
        name: 'VPN Academy',
        address: process.env.EMAIL_USER,
      },
      to,
      subject,
      html,
      text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

export async function sendAdminCreatedEmail({ to, adminName, createdBy, temporaryPassword }) {
  const subject = 'New Admin Account Created - VPN Academy';
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Admin Account Created</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">VPN Academy</p>
      </div>
      
      <div style="padding: 40px 20px; background-color: #f8f9fa;">
        <h2 style="color: #333; margin-top: 0;">Hello ${adminName},</h2>
        
        <p style="color: #666; line-height: 1.6;">
          A new administrator account has been created for you on VPN Academy by <strong>${createdBy}</strong>.
        </p>
                   <p><strong>Temporary Password:</strong> ${temporaryPassword}</p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <h3 style="color: #333; margin-top: 0;">Your Admin Access:</h3>
          <p style="color: #666; margin: 5px 0;"><strong>Email:</strong> ${to}</p>
          <p style="color: #666; margin: 5px 0;"><strong>Role:</strong> Administrator</p>
          <p style="color: #666; margin: 5px 0;"><strong>Status:</strong> Active</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/login" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Access Admin Panel
          </a>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #856404; margin: 0; font-size: 14px;">
            <strong>Important:</strong> Please use the password that was provided to you by ${createdBy}. 
            For security reasons, we recommend changing your password after your first login.
          </p>
        </div>
        
        <p style="color: #666; line-height: 1.6;">
          Best regards,<br>
          <strong>The VPN Academy Team</strong>
        </p>
      </div>
    </div>
  `;

  return sendEmail({ to, subject, html });
}