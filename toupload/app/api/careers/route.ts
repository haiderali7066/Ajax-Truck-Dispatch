// app/api/careers/route.ts
// Receives career application data and emails it to careers@ajaxdispatch.com
//
// Setup:
//   npm install nodemailer
//   npm install --save-dev @types/nodemailer
//
// .env.local:
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=587
//   SMTP_USER=your@gmail.com
//   SMTP_PASS=your-app-password          ← Gmail: use App Password, not real password
//   CAREERS_EMAIL=careers@ajaxdispatch.com

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, role, experience, message } = body

    // Basic server-side validation
    if (!name?.trim() || !email?.trim() || !role?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
      port:   Number(process.env.SMTP_PORT) || 587,
      secure: false,                            // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from:    `"AJAX Dispatch Careers" <${process.env.SMTP_USER}>`,
      to:      process.env.CAREERS_EMAIL || 'careers@ajaxdispatch.com',
      replyTo: email,
      subject: `New Application: ${role} — ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body  { font-family: -apple-system, sans-serif; color: #1a1a1a; background: #f8f7f3; margin: 0; padding: 20px; }
            .card { background: #fff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; border: 1px solid #e8e5de; }
            .header { background: #0A0A14; border-radius: 10px; padding: 20px 24px; margin-bottom: 28px; }
            .header h1 { color: #F59E0B; font-size: 22px; margin: 0 0 4px; }
            .header p  { color: #9CA3AF; font-size: 13px; margin: 0; }
            .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #9CA3AF; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #1a1a1a; margin-bottom: 20px; }
            .message-box { background: #f8f7f3; border: 1px solid #e8e5de; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.7; color: #374151; white-space: pre-wrap; }
            .badge { display: inline-block; background: #FFFBEB; border: 1px solid #FDE68A; color: #92400E; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 1px; }
            hr { border: none; border-top: 1px solid #e8e5de; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>New Career Application</h1>
              <p>Received via ajaxdispatch.com/careers</p>
            </div>

            <div class="field-label">Applicant</div>
            <div class="field-value"><strong>${name}</strong></div>

            <div class="field-label">Email</div>
            <div class="field-value"><a href="mailto:${email}" style="color:#D97706;">${email}</a></div>

            <div class="field-label">Phone</div>
            <div class="field-value">${phone?.trim() || '<span style="color:#9CA3AF">Not provided</span>'}</div>

            <hr/>

            <div class="field-label">Applying For</div>
            <div class="field-value"><span class="badge">${role}</span></div>

            <div class="field-label">Experience Level</div>
            <div class="field-value">${experience?.trim() || '<span style="color:#9CA3AF">Not specified</span>'}</div>

            <hr/>

            <div class="field-label">Their Message</div>
            <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>

            <p style="margin-top:24px;font-size:12px;color:#9CA3AF;text-align:center;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </body>
        </html>
      `,
      // Plain-text fallback
      text: [
        `NEW CAREER APPLICATION — AJAX DISPATCH`,
        ``,
        `Name:       ${name}`,
        `Email:      ${email}`,
        `Phone:      ${phone || 'Not provided'}`,
        `Role:       ${role}`,
        `Experience: ${experience || 'Not specified'}`,
        ``,
        `Message:`,
        message,
      ].join('\n'),
    })

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[/api/careers] Error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}