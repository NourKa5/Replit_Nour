import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { db, contactMessages } from "@workspace/db";
import { SubmitContactBody, SubmitContactResponse, GetContactMessagesResponse } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

const resend = new Resend(process.env.RESEND_API_KEY);
const NOUR_EMAIL = "noormich@post.bgu.ac.il";

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, email, message } = parsed.data;

  await db.insert(contactMessages).values({ name, email, message });

  // Send email notification
  const emailResult = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: NOUR_EMAIL,
    reply_to: email,
    subject: `New message from ${name} — Portfolio`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#0B0B08;color:#F5F0E0;border-radius:12px;">
        <h2 style="color:#EAB308;margin:0 0 4px;">New Contact Form Message</h2>
        <p style="color:#9A9A80;font-size:13px;margin:0 0 24px;">Someone reached out through your portfolio website.</p>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #2A2A1E;color:#9A9A80;font-size:13px;width:80px;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #2A2A1E;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #2A2A1E;color:#9A9A80;font-size:13px;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #2A2A1E;">
              <a href="mailto:${email}" style="color:#EAB308;text-decoration:none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#9A9A80;font-size:13px;vertical-align:top;">Message</td>
            <td style="padding:10px 0;line-height:1.6;white-space:pre-wrap;">${message}</td>
          </tr>
        </table>

        <a href="mailto:${email}?subject=Re: Your message to Nour Karawani"
           style="display:inline-block;margin-top:24px;padding:12px 24px;background:#EAB308;color:#0B0B08;font-weight:700;border-radius:8px;text-decoration:none;font-size:14px;">
          Reply to ${name} →
        </a>

        <p style="margin-top:24px;color:#3A3A2E;font-size:11px;">Sent from nour-karawani.com contact form</p>
      </div>
    `,
  });

  if (emailResult.error) {
    console.error("Resend error:", JSON.stringify(emailResult.error));
  } else {
    console.log("Email sent successfully, id:", emailResult.data?.id);
  }

  const response = SubmitContactResponse.parse({
    success: true,
    message: "Thank you for reaching out! I'll get back to you soon.",
  });

  res.json(response);
});

router.get("/contact/messages", async (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const provided = req.headers["x-admin-password"];
  if (!adminPassword || provided !== adminPassword) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  const response = GetContactMessagesResponse.parse(messages);

  res.json(response);
});

export default router;
