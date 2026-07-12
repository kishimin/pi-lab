import * as z from "zod";

export const messageSchema = z
  .string()
  .min(1, "メッセージは必須です")
  .max(200, "メッセージは200文字以内で入力してください");

export const piMessageInputSchema = z.object({
  message: messageSchema,
});
