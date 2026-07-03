// app/api/contact/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Handles multipart/form-data POST from the contact form.
// Sends a formatted email (with optional file attachment) to your inbox via
// Resend (https://resend.com) — free tier covers 3,000 emails/month.
//
// SETUP (5 minutes):
//   1. npm install resend
//   2. Sign up at resend.com → get your API key
//   3. Add to .env.local:
//        RESEND_API_KEY=re_xxxxxxxxxxxx
//        CONTACT_TO_EMAIL=dispatch@ajaxdispatch.com   ← your inbox
//        CONTACT_FROM_EMAIL=onboarding@ajaxdispatch.com ← verified sender domain
//   4. In Resend dashboard → Domains → add & verify ajaxdispatch.com (5-min DNS)
//      (Until domain is verified you can use the sandbox: onboarding@resend.dev)
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    /* ── 1. Parse the multipart form ── */
    const formData = await req.formData()

    const name      = formData.get('name')      as string
    const email     = formData.get('email')     as string
    const phone     = formData.get('phone')     as string
    const company   = formData.get('company')   as string
    const truckType = formData.get('truckType') as string
    const mcNumber  = formData.get('mcNumber')  as string
    const message   = formData.get('message')   as string
    const file      = formData.get('agreement') as File | null

    /* Basic server-side validation */
    if (!name || !email || !phone || !truckType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    /* ── 2. Build attachment if a file was uploaded ── */
    type Attachment = { filename: string; content: Buffer }
    const attachments: Attachment[] = []

    if (file && file.size > 0) {
      const bytes  = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      attachments.push({ filename: file.name, content: buffer })
    }

    /* ── 3. Send the email via Resend ── */
    const { error } = await resend.emails.send({
      from:    process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev',
      to:      process.env.CONTACT_TO_EMAIL   ?? 'you@example.com',
      reply_to: email,
      subject: `New Carrier Onboarding Request — ${name} (${truckType})`,

      // Plain-text fallback
      text: [
        `New onboarding request received from ajaxdispatch.com`,
        ``,
        `Name:       ${name}`,
        `Email:      ${email}`,
        `Phone:      ${phone}`,
        `Company:    ${company || '—'}`,
        `Truck Type: ${truckType}`,
        `MC Number:  ${mcNumber || '—'}`,
        ``,
        `Message:`,
        message || '(none)',
        ``,
        file ? `Dispatch Agreement: ${file.name} attached` : 'No agreement uploaded',
      ].join('\n'),

      // Rich HTML email
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8" /></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f9f9f7; margin:0; padding:32px 16px;">
          <div style="max-width:580px; margin:0 auto; background:#fff; border-radius:16px; overflow:hidden; border:1px solid #e8e5de;">

            <!-- Header -->
            <div style="background:#0A0A14; padding:28px 32px; display:flex; align-items:center; gap:12px;">
              <div style="background:#F59E0B; width:10px; height:10px; border-radius:50%;"></div>
              <span style="color:#fff; font-weight:700; font-size:14px; letter-spacing:2px; text-transform:uppercase;">New Carrier Onboarding Request</span>
            </div>

            <!-- Body -->
            <div style="padding:32px;">
              <table style="width:100%; border-collapse:collapse;">
                ${[
                  ['Full Name',   name],
                  ['Email',       `<a href="mailto:${email}" style="color:#D97706;">${email}</a>`],
                  ['Phone',       `<a href="tel:${phone}" style="color:#D97706;">${phone}</a>`],
                  ['Company',     company || '—'],
                  ['Truck Type',  truckType],
                  ['MC Number',   mcNumber || '—'],
                ].map(([label, value]) => `
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #f0ede8; color:#9ca3af; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; width:130px;">${label}</td>
                    <td style="padding:10px 0; border-bottom:1px solid #f0ede8; color:#111827; font-size:14px; font-weight:600;">${value}</td>
                  </tr>
                `).join('')}
              </table>

              ${message ? `
              <div style="margin-top:24px; background:#f8f7f3; border-radius:12px; padding:16px 20px; border:1px solid #e8e5de;">
                <p style="color:#6b7280; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin:0 0 8px;">Message</p>
                <p style="color:#374151; font-size:14px; line-height:1.7; margin:0;">${message.replace(/\n/g, '<br/>')}</p>
              </div>` : ''}

              <!-- Agreement badge -->
              <div style="margin-top:20px; display:inline-flex; align-items:center; gap:8px; background:${file ? '#fffbeb' : '#f9f9f9'}; border:1px solid ${file ? '#fcd34d' : '#e5e7eb'}; border-radius:8px; padding:8px 14px;">
                <span style="font-size:13px;">${file ? '📎' : '📋'}</span>
                <span style="font-size:12px; color:${file ? '#92400e' : '#9ca3af'}; font-weight:600;">
                  ${file ? `Dispatch Agreement attached: ${file.name}` : 'No agreement uploaded — send to carrier after contact'}
                </span>
              </div>
            </div>

            <!-- Footer -->
            <div style="background:#f8f7f3; padding:16px 32px; border-top:1px solid #e8e5de;">
              <p style="color:#9ca3af; font-size:12px; margin:0;">Submitted via <strong>ajaxdispatch.com</strong> contact form · Reply directly to ${email}</p>
            </div>
          </div>
        </body>
        </html>
      `,

      attachments,
    })

    if (error) {
      console.error('[Resend error]', error)
      return NextResponse.json({ error: 'Email failed to send' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('[Contact API error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}