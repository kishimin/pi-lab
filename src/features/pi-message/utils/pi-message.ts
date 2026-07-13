export const generateMessageResult = (): string => {
  const result = Math.floor(Math.random() * 100) + 1;

  if (result < 30) {
    return "3.14まで頑張りましたが、伝わりませんでした";
  }

  if (result < 40) {
    return "3で伝えるには、雑すぎました";
  }

  if (result < 80) {
    return "πでは伝わりません";
  }

  if (result < 90) {
    return "τで伝えるのは良いかも";
  }

  if (result < 95) {
    return "このメッセージは伝わりません";
  }

  return "eでは伝わるのかな？";
};
