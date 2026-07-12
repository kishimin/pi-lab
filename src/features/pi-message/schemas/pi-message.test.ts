import { messageSchema } from "./pi-message";

describe("メッセージ", () => {
  test("空の時必須エラーとなる", () => {
    const result = messageSchema.safeParse("");

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("メッセージは必須です");
  });

  test("201文字のとき最大長エラーとなる", () => {
    const result = messageSchema.safeParse("あ".repeat(201));

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "メッセージは201文字以内で入力してください",
    );
  });
});
