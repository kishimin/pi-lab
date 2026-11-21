export type ReceiptItem = { name: string; price: number };

export const calculateReceipt = (items: ReceiptItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = Math.floor((subtotal * 314) / 10000);
  const total = subtotal + tax;
  const points = Math.floor((total * 314) / 10000);
  return { subtotal, tax, total, points };
};
