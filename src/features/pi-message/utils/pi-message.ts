export const resultMessages = [
  "3.14まで頑張りましたが、伝わりませんでした",
  "3で伝えるには、雑すぎました",
  "πでは伝わりません",
  "τで伝えるのは良いかも",
  "このメッセージは伝わりません",
  "eでは伝わるのかな？",
] as const;

export const generateMessageResult = (): string => {
  const result = Math.floor(Math.random() * 100) + 1;

  if (result < 30) {
    return resultMessages[0];
  }

  if (result < 40) {
    return resultMessages[1];
  }

  if (result < 80) {
    return resultMessages[2];
  }

  if (result < 90) {
    return resultMessages[3];
  }

  if (result < 95) {
    return resultMessages[4];
  }

  return resultMessages[5];
};
