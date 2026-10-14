import nodemailer from 'nodemailer';

export async function sendContactEmail(payload: {
  email: string;
  subject: string;
  message: string;
}) {
  const { email, subject, message } = payload;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('SMTP is not configured');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: user,
    to: user,
    replyTo: email,
    subject,
    html: `
      <h3>New Form Submission</h3>
      <p><strong>From:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  return { success: true, messageId: info.messageId };
}
