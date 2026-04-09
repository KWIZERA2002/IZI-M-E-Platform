const nodemailer = require('nodemailer');

const smtpHost = process.env.SMTP_HOST || process.env.SMTP_SERVER || process.env.MAIL_HOST || '';
const smtpPort = Number(process.env.SMTP_PORT || process.env.MAIL_PORT || 587);
const smtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME || process.env.MAIL_USER || process.env.EMAIL_USER || '';
const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.MAIL_PASS || process.env.EMAIL_PASSWORD || '';
const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_FROM || process.env.MAIL_FROM || smtpUser || '';
const appUrl = (process.env.APP_URL || process.env.RENDER_EXTERNAL_URL || process.env.FRONTEND_URL || 'http://localhost:5000').replace(/\/$/, '');
const manualDisable = String(process.env.DISABLE_EMAIL || '').toLowerCase() === 'true';

const emailDisabled = manualDisable || !smtpHost || !smtpUser || !smtpPass || !emailFrom;

const transporter = emailDisabled
  ? null
  : nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

if (!emailDisabled) {
  console.log(`[Mail] SMTP configured and ready (${smtpHost}:${smtpPort})`);
} else {
  const missing = [];
  if (!smtpHost) missing.push('SMTP_HOST/SMTP_SERVER');
  if (!smtpUser) missing.push('SMTP_USER/SMTP_USERNAME');
  if (!smtpPass) missing.push('SMTP_PASS/SMTP_PASSWORD');
  if (!emailFrom) missing.push('EMAIL_FROM');
  console.warn('[Mail] Email sending disabled. Missing config:', missing.join(', ') || 'DISABLE_EMAIL=true');
}

const sendVerificationEmail = async (email, username, token) => {
  const verifyUrl = `${appUrl}/verify?token=${token}`;
  if (emailDisabled) {
    console.log('Email sending disabled. Verification URL:', verifyUrl);
    return { success: true, skipped: true, verifyUrl };
  }

  const mailOptions = {
    from: emailFrom,
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
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;
  if (emailDisabled) {
    console.log('Password reset email disabled. Reset URL:', resetUrl);
    return { success: true, skipped: true, resetUrl };
  }

  const mailOptions = {
    from: emailFrom,
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
  const inviteUrl = `${appUrl}/accept-invite?token=${token}`;
  if (emailDisabled) {
    console.log('Email sending disabled. Invitation URL:', inviteUrl);
    return { success: true, skipped: true, inviteUrl };
  }

  const mailOptions = {
    from: emailFrom,
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

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendInviteEmail,
  isEmailEnabled: !emailDisabled
};
