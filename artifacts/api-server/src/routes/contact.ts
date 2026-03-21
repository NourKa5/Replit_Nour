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

router.get("/contact/messages", async (_req, res) => {
  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  const response = GetContactMessagesResponse.parse(
    messages.map((m) => ({
      ...m,
      createdAt: m.createdAt.toISOString(),
    }))
  );

  res.json(response);
});

export default router;
