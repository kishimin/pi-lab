import { expect, test } from "vitest";
import { calculateReceipt } from "./receipt";

test("商品合計に架空税率3.14%を加えた合計と切り捨てたπポイントを計算する", () => {
  expect(calculateReceipt([{ name: "コーヒー", price: 10000 }])).toEqual({
    subtotal: 10000,
    tax: 314,
    total: 10314,
    points: 323,
  });
});
