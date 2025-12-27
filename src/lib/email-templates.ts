export interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  phone: string;
  subject: string;
  message: string;
}

export const generateContactEmailTemplate = (data: ContactFormData): string => {
  const timestamp = new Date().toLocaleString();

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Form Submission - TrueNorth Talent Advisory</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #000000;
        color: #ffffff;
        line-height: 1.6;
      }

      .email-container {
        max-width: 500px;
        margin: 20px auto;
        background: #000000;
        border: 1px solid #333333;
        border-radius: 12px;
        overflow: hidden;
      }

      .header {
        background: #111111;
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid #333333;
      }

      .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .logo-img {
        width: 32px;
        height: 32px;
        border-radius: 8px;
      }

      .logo-text {
        font-size: 24px;
        font-weight: 700;
        color: #ffffff;
        margin: 0;
      }

      .header-subtitle {
        color: #cccccc;
        font-size: 14px;
        margin: 0;
      }

      .content {
        padding: 20px;
      }

      .submission-title {
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 20px;
        text-align: center;
      }

      .field-group {
        margin-bottom: 15px;
        padding: 12px;
        background: #111111;
        border: 1px solid #333333;
        border-radius: 8px;
      }

      .field-label {
        font-size: 12px;
        font-weight: 600;
        color: #888888;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .field-value {
        font-size: 14px;
        color: #ffffff;
        word-wrap: break-word;
        line-height: 1.4;
      }

      .message-field .field-value {
        white-space: pre-wrap;
      }

      .footer {
        text-align: center;
        padding: 20px;
        background: #111111;
        border-top: 1px solid #333333;
      }

      .cta-button {
        display: inline-block;
        padding: 10px 20px;
        background: #1325c5;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
      }

      .timestamp {
        margin-top: 15px;
        color: #888888;
        font-size: 11px;
      }

      .icon {
        font-size: 14px;
      }

      @media only screen and (max-width: 600px) {
        .email-container {
          margin: 10px;
          max-width: none;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <div class="logo-container">
          <img src="https://res.cloudinary.com/ds6nd4lbj/image/upload/v1766790533/logo_fb7ofs.jpgg" alt="True North Talent Advisory Logo" class="logo-img" />
          <h1 class="logo-text">True North Talent Advisory</h1>
        </div>
        <p class="header-subtitle">New Contact Form Submission</p>
      </div>

      <div class="content">
        <h2 class="submission-title">New Contact Form Submission</h2>

        <div class="field-group">
          <div class="field-label">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span> Full Name
          </div>
          <div class="field-value">${data.fullName}</div>
        </div>

        <div class="field-group">
          <div class="field-label">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg></span> Email Address
          </div>
          <div class="field-value">${data.email}</div>
        </div>

        ${
          data.company
            ? `
        <div class="field-group">
          <div class="field-label">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2-icon lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg></span> Company
          </div>
          <div class="field-value">${data.company}</div>
        </div>
        `
            : ""
        }

        <div class="field-group">
          <div class="field-label">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg></span> Phone Number
          </div>
          <div class="field-value">${data.phone}</div>
        </div>

        <div class="field-group">
          <div class="field-label">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg></span> Subject
          </div>
          <div class="field-value">${data.subject}</div>
        </div>

        <div class="field-group message-field">
          <div class="field-label">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-dot-icon lucide-folder-dot"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><circle cx="12" cy="13" r="1"/></svg></span> Project Details
          </div>
          <div class="field-value">${data.message}</div>
        </div>
      </div>

      <div class="footer">
        <a
          href="mailto:${
            data.email
          }?subject=Re: Your Contact Request - TrueNorth Talent Advisory&body=Hi ${
    data.fullName
  },%0D%0A%0D%0AThank you for reaching out to TrueNorth Talent Advisory.%0D%0A%0D%0A"
          class="cta-button"
        >
          Reply to Client
        </a>

        <div class="timestamp">Received on ${timestamp}</div>
      </div>
    </div>
  </body>
</html>
  `;
};
