import nodemailer from 'nodemailer';
import { 
  generateContactEmailTemplate,
  ContactFormData,
} from './email-templates';

// Gmail app password configuration
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const RECIPIENT_EMAIL = process.env.SMTP_USER;

// Initialize and return a reusable Nodemailer transporter instance using the configured SMTP settings
const createTransporter = () => {
  return nodemailer.createTransport(EMAIL_CONFIG);
};


// Send contact form email
export const sendContactEmail = async (
  formData: ContactFormData
): Promise<{ ok: boolean; error?: string }> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"TrueNorth Talent Advisory" <${EMAIL_CONFIG.auth.user}>`,
      to: RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${formData.fullName}`,
      html: generateContactEmailTemplate(formData),
      replyTo: formData.email,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', result.messageId);
    return { ok: true };
  } catch (error) {
    console.error('Error sending contact email:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { ok: false, error: message };
  }
};

// Test email configuration
export const testEmailConfig = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};
