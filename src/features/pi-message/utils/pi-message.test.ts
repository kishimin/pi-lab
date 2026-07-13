import { vi } from "vitest";
import { generateMessageResult } from "./pi-message";

const spyRandom = (returnValue: number) =>
  vi.spyOn(Math, "random").mockReturnValue(returnValue);

test("1以上30未満の時該当のメッセージが表示される", () => {
  spyRandom(0.1);
  const result = generateMessageResult();

  expect(result).toBe("3.14まで頑張りましたが、伝わりませんでした");
});

test("30以上40未満の時該当のメッセージが表示される", () => {
  spyRandom(0.3);
  const result = generateMessageResult();

  expect(result).toBe("3で伝えるには、雑すぎました");
});
