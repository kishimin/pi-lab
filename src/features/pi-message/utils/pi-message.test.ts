import { vi } from "vitest";
import { generateMessageResult } from "./pi-message";

describe("generateMessageResult", () => {
  const spyRandom = (returnValue: number) =>
    vi.spyOn(Math, "random").mockReturnValue(returnValue);

  test("1の時3.14まで頑張りましたが、伝わりませんでしたと表示される", () => {
    spyRandom(0.1);
    const result = generateMessageResult();

    expect(result).toBe("3.14まで頑張りましたが、伝わりませんでした");
  });

  test("30の時3で伝えるには、雑すぎましたと表示される", () => {
    spyRandom(0.3);
    const result = generateMessageResult();

    expect(result).toBe("3で伝えるには、雑すぎました");
  });

  test("40の時πでは伝わりませんと表示される", () => {
    spyRandom(0.4);
    const result = generateMessageResult();

    expect(result).toBe("πでは伝わりません");
  });

  test("80の時τで伝えるのは良いかもと表示される", () => {
    spyRandom(0.8);
    const result = generateMessageResult();

    expect(result).toBe("τで伝えるのは良いかも");
  });

  test("90の時あなたのメッセージは伝わりませんと表示される", () => {
    spyRandom(0.9);
    const result = generateMessageResult();

    expect(result).toBe("このメッセージは伝わりません");
  });

  test("95の時eでは伝わるのかな？と表示される", () => {
    spyRandom(0.95);
    const result = generateMessageResult();

    expect(result).toBe("eでは伝わるのかな？");
  });
});
