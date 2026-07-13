import { generateMessageResult } from "./pi-message";

test("1以上30未満の時該当のメッセージが表示される", () => {
  const result = generateMessageResult();

  expect(result).toBe("3.14まで頑張りましたが、伝わりませんでした");
});
