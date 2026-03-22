import { Router, type IRouter } from "express";
import { db, contactMessages } from "@workspace/db";
import { SubmitContactBody, SubmitContactResponse, GetContactMessagesResponse } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, email, message } = parsed.data;

  await db.insert(contactMessages).values({ name, email, message });

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
