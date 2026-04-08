const nodemailer = require('nodemailer');

const emailDisabled = process.env.NODE_ENV === 'development' || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.EMAIL_FROM;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

if (!emailDisabled) {
  console.log('[Mail] SMTP configured and ready');
}

const sendVerificationEmail = async (email, username, token) => {
  const verifyUrl = `${process.env.APP_URL}/verify?token=${token}`;
  if (emailDisabled) {
    console.log('Email sending disabled. Verification URL:', verifyUrl);
    return { success: true, skipped: true, verifyUrl };
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your IZI M&E Platform Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333;">Welcome to IZI M&E Platform</h2>
          <p>Hi ${username},</p>
          <p>Thank you for signing up! Please verify your email address to activate your account.</p>
          <div style="margin: 30px 0;">
            <a href="${verifyUrl}" style="background-color: #4f8ef7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #666; font-size: 12px;">Or copy and paste this link in your browser:</p>
          <p style="color: #666; font-size: 12px; word-break: break-all;">${verifyUrl}</p>
          <p style="color: #666; margin-top: 20px;">This verification link expires in 24 hours.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">IZI M&E Platform - Rwanda Monitoring & Evaluation System</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    throw new Error('Failed to send verification email: ' + error.message);
  }
};

const sendPasswordResetEmail = async (email, username, resetToken) => {
  const resetUrl = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
  if (emailDisabled) {
    console.log('Password reset email disabled. Reset URL:', resetUrl);
    return { success: true, skipped: true, resetUrl };
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Your IZI M&E Platform Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hi ${username},</p>
          <p>We received a request to reset your password. Click the link below to set a new password.</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4f8ef7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 12px;">This link expires in 1 hour.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">IZI M&E Platform - Rwanda Monitoring & Evaluation System</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    throw new Error('Failed to send reset email: ' + error.message);
  }
};

const sendInviteEmail = async (email, name, token) => {
  const inviteUrl = `${process.env.APP_URL}/accept-invite?token=${token}`;
  if (emailDisabled) {
    console.log('Email sending disabled. Invitation URL:', inviteUrl);
    return { success: true, skipped: true, inviteUrl };
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "You've been invited to IZI M&E Platform",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333;">You've been invited to IZI M&E Platform</h2>
          <p>Hi ${name},</p>
          <p>An administrator has created an account for you on the IZI M&E Platform (Rwanda Monitoring &amp; Evaluation System).</p>
          <p>Click the button below to accept your invitation, set your display name, and create your password.</p>
          <div style="margin: 30px 0;">
            <a href="${inviteUrl}" style="background-color: #4f8ef7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Accept Invitation &amp; Set Password
            </a>
          </div>
          <p style="color: #666; font-size: 12px;">Or copy and paste this link in your browser:</p>
          <p style="color: #666; font-size: 12px; word-break: break-all;">${inviteUrl}</p>
          <p style="color: #666; margin-top: 20px;">This invitation link expires in 7 days. If you did not expect this invitation, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">IZI M&amp;E Platform - Rwanda Monitoring &amp; Evaluation System</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, inviteUrl };
  } catch (error) {
    console.error('Email send failed:', error);
    throw new Error('Failed to send invitation email: ' + error.message);
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail, sendInviteEmail };
