require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// إعداد Gmail OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);
oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

async function createTransporter() {
  const accessToken = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_EMAIL,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken.token
    }
  });
}

app.post('/send-email', async (req, res) => {
  const { tenantEmail, boxNumber, entryCode, timeAr, timeEn } = req.body;

  if (!tenantEmail || !boxNumber || !entryCode) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const templatePath = path.join(__dirname, 'public', 'email_template.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html
      .replace(/{{box}}/g, boxNumber)
      .replace(/{{code}}/g, entryCode)
      .replace(/{{time_ar}}/g, timeAr)
      .replace(/{{time_en}}/g, timeEn);

    const transporter = await createTransporter();

    const mailOptions = {
      from: `"Smart Lock App" <${process.env.GMAIL_EMAIL}>`,
      to: tenantEmail,
      subject: '🔐 رمز الدخول',
      html: html,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Email send failed:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
