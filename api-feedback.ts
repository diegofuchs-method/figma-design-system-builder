/**
 * Vercel Function: Handle feedback form submissions
 * Deploy this to: api/feedback.ts in your Vercel project
 *
 * Environment Variables Required:
 * - SENDGRID_API_KEY: Your SendGrid API key
 * - RECIPIENT_EMAIL: Email address to receive feedback (e.g., d.fuchs@method.me)
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import FormData from 'form-data';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userName, feature, feedback, filesBase64 } = req.body;

    // Validate required fields
    if (!userName || !feature || !feedback) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get API key and recipient email from environment variables
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'd.fuchs@method.me';

    if (!sendgridApiKey) {
      console.error('SENDGRID_API_KEY environment variable not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create email content
    const emailSubject = `Design System Builder Feedback - ${feature}`;
    const emailHtml = `
      <h2>New Feedback Submission</h2>
      <p><strong>From:</strong> ${escapeHtml(userName)}</p>
      <p><strong>Feature:</strong> ${escapeHtml(feature)}</p>
      <hr/>
      <h3>Feedback:</h3>
      <p>${escapeHtml(feedback).replace(/\n/g, '<br>')}</p>
      <hr/>
      <p><em>Submitted from Design System Builder plugin</em></p>
    `;

    // Prepare attachments if files exist
    const attachments = [];
    if (filesBase64 && Array.isArray(filesBase64)) {
      for (const file of filesBase64) {
        if (file.content && file.name) {
          attachments.push({
            content: file.content, // Base64 encoded content
            filename: file.name,
            type: file.type || 'application/octet-stream',
            disposition: 'attachment'
          });
        }
      }
    }

    // Send email via SendGrid API
    const emailPayload = {
      personalizations: [
        {
          to: [{ email: recipientEmail }],
          subject: emailSubject
        }
      ],
      from: {
        email: 'noreply@designsystembuilder.com',
        name: 'Design System Builder'
      },
      content: [
        {
          type: 'text/html',
          value: emailHtml
        }
      ],
      attachments
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sendgridApiKey}`
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('SendGrid API error:', error);
      return res.status(500).json({ error: 'Failed to send feedback email' });
    }

    return res.status(200).json({
      success: true,
      message: 'Feedback sent successfully!'
    });
  } catch (error) {
    console.error('Feedback API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
