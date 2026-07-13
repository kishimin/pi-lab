export const generateMessageResult = (): string => {
  const result = Math.floor(Math.random() * 100) + 1;
  if (result < 30) {
    return "3.14まで頑張りましたが、伝わりませんでした";
  }

  if (result < 40) {
    return "3で伝えるには、雑すぎました";
  }

  return "";
};
