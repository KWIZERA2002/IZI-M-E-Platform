const nodemailer = require('nodemailer');

const smtpUrl = String(process.env.SMTP_URL || process.env.MAIL_URL || '').trim();
const smtpHost = String(process.env.SMTP_HOST || process.env.SMTP_SERVER || process.env.MAIL_HOST || '').trim();
const smtpPort = Number(process.env.SMTP_PORT || process.env.MAIL_PORT || 587);
const rawSmtpUser = String(process.env.SMTP_USER || process.env.SMTP_USERNAME || process.env.MAIL_USER || process.env.EMAIL_USER || '').trim();
const rawSmtpPass = String(process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.MAIL_PASS || process.env.EMAIL_PASSWORD || '').trim();
const isGmailHost = /(^|\.)gmail\.com$/i.test(smtpHost) || /smtp\.gmail\.com/i.test(smtpUrl);
const smtpUser = rawSmtpUser;
// Gmail App Passwords are often copied with spaces; normalize them automatically.
const smtpPass = isGmailHost ? rawSmtpPass.replace(/\s+/g, '') : rawSmtpPass;
const emailFrom = String(process.env.EMAIL_FROM || process.env.SMTP_FROM || process.env.MAIL_FROM || smtpUser || '').trim();
const appUrl = (process.env.APP_URL || process.env.RENDER_EXTERNAL_URL || process.env.FRONTEND_URL || 'http://localhost:5000').replace(/\/$/, '');
const manualDisable = String(process.env.DISABLE_EMAIL || '').toLowerCase() === 'true';
const smtpConnectionTimeout = Number(process.env.SMTP_CONNECTION_TIMEOUT_MS || 12000);
const smtpGreetingTimeout = Number(process.env.SMTP_GREETING_TIMEOUT_MS || 12000);
const smtpSocketTimeout = Number(process.env.SMTP_SOCKET_TIMEOUT_MS || 20000);
const smtpDnsTimeout = Number(process.env.SMTP_DNS_TIMEOUT_MS || 10000);

const hasAuth = !!(smtpUser && smtpPass);
const emailDisabled = manualDisable || (!smtpUrl && !smtpHost) || !emailFrom;

function getBaseTransportOptions(overrides = {}) {
  return {
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: hasAuth ? {
      user: smtpUser,
      pass: smtpPass
    } : undefined,
    tls: {
      rejectUnauthorized: String(process.env.SMTP_TLS_REJECT_UNAUTHORIZED || '').toLowerCase() !== 'false'
    },
    connectionTimeout: smtpConnectionTimeout,
    greetingTimeout: smtpGreetingTimeout,
    socketTimeout: smtpSocketTimeout,
    dnsTimeout: smtpDnsTimeout,
    ...overrides
  };
}

function createTransport(overrides = {}) {
  if (emailDisabled) return null;
  if (smtpUrl) {
    return nodemailer.createTransport(smtpUrl, {
      connectionTimeout: smtpConnectionTimeout,
      greetingTimeout: smtpGreetingTimeout,
      socketTimeout: smtpSocketTimeout,
      dnsTimeout: smtpDnsTimeout,
      ...overrides
    });
  }
  return nodemailer.createTransport(getBaseTransportOptions(overrides));
}

function createDirectHostTransport(overrides = {}) {
  if (emailDisabled || !smtpHost) return null;
  return nodemailer.createTransport(getBaseTransportOptions(overrides));
}

function createGmailAlternatePortTransport() {
  if (emailDisabled || !isGmailHost || !smtpHost) return null;
  const altPort = smtpPort === 465 ? 587 : 465;
  return nodemailer.createTransport(getBaseTransportOptions({
    port: altPort,
    secure: altPort === 465
  }));
}

function formatSmtpError(prefix, error) {
  const message = error && error.message ? String(error.message) : 'Unknown SMTP error';
  const code = error && error.code ? String(error.code) : '';
  const responseCode = error && error.responseCode ? String(error.responseCode) : '';
  const response = error && error.response ? String(error.response) : '';
  return `${prefix}: ${message}${code ? ` [${code}]` : ''}${responseCode ? ` [${responseCode}]` : ''}${response ? ` | ${response}` : ''}`;
}

function isTimeoutError(error) {
  const code = String(error && error.code ? error.code : '').toUpperCase();
  const text = `${error && error.message ? error.message : ''} ${error && error.response ? error.response : ''}`;
  return code === 'ETIMEDOUT' || /timeout|timed out|connection timeout|greeting never received/i.test(text);
}

const transporter = createTransport();

function buildTransportWithoutCustomFromAuth() {
  return createTransport();
}

async function sendMailWithResilience(mailOptions, options = {}) {
  const { errorPrefix = 'Failed to send email', allowFromFallback = false } = options;

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    const primaryMessage = error && error.message ? error.message : 'Unknown SMTP error';
    const response = error && error.response ? String(error.response) : '';

    const shouldRetryWithSimpleFrom = Boolean(
      allowFromFallback
      && smtpUser
      && emailFrom
      && emailFrom !== smtpUser
      && /from|sender|mailbox|envelope|550|553|5\.7\./i.test(`${primaryMessage} ${response}`)
    );

    if (shouldRetryWithSimpleFrom) {
      try {
        const retryTransporter = buildTransportWithoutCustomFromAuth();
        await retryTransporter.sendMail({ ...mailOptions, from: smtpUser });
        console.warn('[Mail] Email sent after fallback to SMTP_USER as from address');
        return { success: true, usedFromFallback: true };
      } catch (retryError) {
        throw new Error(formatSmtpError(errorPrefix, retryError));
      }
    }

    if (isTimeoutError(error)) {
      const timeoutFallbackTransports = [];

      if (smtpUrl && smtpHost) {
        timeoutFallbackTransports.push({
          name: 'direct host/port transport',
          transporter: createDirectHostTransport()
        });
      }

      const altTransporter = createGmailAlternatePortTransport();
      if (altTransporter) {
        timeoutFallbackTransports.push({
          name: 'gmail alternate port transport',
          transporter: altTransporter
        });
      }

      for (const fallback of timeoutFallbackTransports) {
        if (!fallback.transporter) continue;
        try {
          await fallback.transporter.sendMail(mailOptions);
          console.warn(`[Mail] Email sent after timeout fallback on ${fallback.name}`);
          return { success: true, usedPortFallback: true };
        } catch (altError) {
          console.warn(`[Mail] Timeout fallback failed on ${fallback.name}:`, altError.message);
        }
      }
    }

    throw new Error(formatSmtpError(errorPrefix, error));
  }
}

if (!emailDisabled) {
  console.log(`[Mail] SMTP configured and ready (${smtpUrl ? 'url transport' : `${smtpHost}:${smtpPort}`})${hasAuth ? ' with auth' : ' without auth'}`);
  transporter.verify().then(() => {
    console.log('[Mail] SMTP connection verified successfully');
  }).catch((err) => {
    console.warn('[Mail] SMTP verification failed:', err.message);
  });
} else {
  const missing = [];
  if (!smtpUrl && !smtpHost) missing.push('SMTP_URL or SMTP_HOST/SMTP_SERVER');
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
    await sendMailWithResilience(mailOptions, { errorPrefix: 'Failed to send verification email' });
    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
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
    await sendMailWithResilience(mailOptions, { errorPrefix: 'Failed to send reset email' });
    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
};

const sendInviteEmail = async (email, name, inviteUrl) => {
  // inviteUrl is passed in by the caller — Admin.js uses fallbackInviteUrl so it is always
  // the correct public URL regardless of whether APP_URL is set.
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
    await sendMailWithResilience(mailOptions, {
      errorPrefix: 'Failed to send invitation email',
      allowFromFallback: true
    });
    return { success: true, inviteUrl };
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
};

const testSmtpConnection = async () => {
  if (emailDisabled) {
    const missing = [];
    if (!smtpUrl && !smtpHost) missing.push('SMTP_URL or SMTP_HOST');
    if (!emailFrom) missing.push('EMAIL_FROM');
    return {
      enabled: false,
      reason: manualDisable ? 'Manually disabled via DISABLE_EMAIL=true' : 'Missing required env vars',
      missing,
      config: { host: smtpHost || '(not set)', port: smtpPort, user: smtpUser || '(not set)', from: emailFrom || '(not set)' }
    };
  }
  try {
    await transporter.verify();
    return {
      enabled: true,
      connected: true,
      config: {
        transport: smtpUrl ? 'url' : 'host/port',
        host: smtpUrl ? '(SMTP_URL)' : smtpHost,
        port: smtpUrl ? null : smtpPort,
        secure: smtpPort === 465,
        user: smtpUser || '(none)',
        from: emailFrom
      }
    };
  } catch (err) {
    if (isTimeoutError(err)) {
      const timeoutFallbackVerifiers = [];

      if (smtpUrl && smtpHost) {
        timeoutFallbackVerifiers.push({
          name: 'direct host/port transport',
          transporter: createDirectHostTransport(),
          config: {
            transport: 'host/port (fallback)',
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            user: smtpUser || '(none)',
            from: emailFrom
          }
        });
      }

      if (isGmailHost) {
        timeoutFallbackVerifiers.push({
          name: 'gmail alternate port transport',
          transporter: createGmailAlternatePortTransport(),
          config: {
            transport: 'host/port (fallback)',
            host: smtpHost,
            port: smtpPort === 465 ? 587 : 465,
            secure: smtpPort !== 465,
            user: smtpUser || '(none)',
            from: emailFrom
          }
        });
      }

      for (const fallback of timeoutFallbackVerifiers) {
        if (!fallback.transporter) continue;
        try {
          await fallback.transporter.verify();
          return {
            enabled: true,
            connected: true,
            warning: `Primary SMTP transport timed out; fallback ${fallback.name} verified successfully`,
            config: fallback.config
          };
        } catch (_) {
          // Keep trying the next fallback.
        }
      }
    }

    return {
      enabled: true,
      connected: false,
      error: err.message,
      config: {
        transport: smtpUrl ? 'url' : 'host/port',
        host: smtpUrl ? '(SMTP_URL)' : smtpHost,
        port: smtpUrl ? null : smtpPort,
        user: smtpUser || '(none)',
        from: emailFrom
      }
    };
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendInviteEmail,
  testSmtpConnection,
  isEmailEnabled: !emailDisabled
};
