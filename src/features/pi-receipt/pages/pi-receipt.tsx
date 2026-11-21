import { useState } from "react";
import { Layout } from "../../../components/layout";
import { calculateReceipt, type ReceiptItem } from "../utils/receipt";

type DraftItem = { name: string; price: string };
type Receipt = { items: ReceiptItem[]; note: string };

const notes = ["πのかけら", "円周のひと休み", "無限のひと粒"];
const newNote = () => notes[Math.floor(Math.random() * notes.length)];

const createImage = async (receipt: Receipt): Promise<File> => {
  const totals = calculateReceipt(receipt.items);
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 340 + receipt.items.length * 46;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#1f2138";
  context.font = "bold 32px sans-serif";
  context.fillText("πレシート", 40, 55);
  context.font = "24px sans-serif";
  let y = 110;
  for (const item of receipt.items) {
    context.textAlign = "left";
    context.fillText(item.name, 40, y, 440);
    context.textAlign = "right";
    context.fillText(`¥${item.price.toLocaleString("ja-JP")}`, 680, y);
    y += 46;
  }
  context.textAlign = "left";
  for (const line of [`πのおまけ: ${receipt.note} ¥0`, `小計 ¥${totals.subtotal.toLocaleString("ja-JP")}`, `架空税率 3.14% ¥${totals.tax.toLocaleString("ja-JP")}`, `合計 ¥${totals.total.toLocaleString("ja-JP")}`, `πポイント ${totals.points}`]) {
    context.fillText(line, 40, y, 640);
    y += 43;
  }
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Image generation failed");
  return new File([blob], "pi-receipt.png", { type: "image/png" });
};

export const PiReceiptPage = () => {
  const [items, setItems] = useState<DraftItem[]>([{ name: "", price: "" }]);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState("");
  const parsed = items.map((item) => ({ name: item.name.trim(), price: Number(item.price) }));
  const isValid = items.every((item, index) => item.name.trim() !== "" && item.price.trim() !== "" && Number.isSafeInteger(parsed[index].price) && parsed[index].price >= 0 && parsed[index].price <= 1000000);
  const subtotal = parsed.reduce((sum, item) => sum + (Number.isSafeInteger(item.price) && item.price >= 0 && item.price <= 1000000 ? item.price : 0), 0);

  const updateItem = (index: number, field: keyof DraftItem, value: string) => {
    setItems((previous) => previous.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };
  const createReceipt = () => {
    if (!isValid || !Number.isSafeInteger(subtotal * 314)) {
      setError("商品名と、0〜1,000,000円の整数の金額を入力してください。");
      return;
    }
    setError("");
    setReceipt({ items: parsed, note: newNote() });
  };
  const saveImage = async () => {
    if (!receipt) return;
    try {
      const file = await createImage(receipt);
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setImageError("");
    } catch {
      setImageError("画像を保存できませんでした。もう一度お試しください。");
    }
  };
  const shareImage = async () => {
    if (!receipt || !navigator.share) return;
    try {
      const file = await createImage(receipt);
      if (!navigator.canShare?.({ files: [file] })) {
        setImageError("この端末では画像を共有できません。画像を保存してください。");
        return;
      }
      await navigator.share({ files: [file], title: "πレシート" });
    } catch {
      setImageError("共有できませんでした。画像を保存することもできます。");
    }
  };
  const totals = receipt ? calculateReceipt(receipt.items) : null;

  return (
    <Layout title={"πレシート"}>
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 text-[#1f2138]">
        <p className="mb-8 text-[#61667a]">いつもの買い物を、ちょっと不思議なレシートに。</p>
        <form onSubmit={(event) => { event.preventDefault(); createReceipt(); }} className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-wrap gap-4 rounded-xl bg-[#f6f6fa] p-4">
              <label className="min-w-0 flex-1">商品名<input className="mt-1 w-full rounded border bg-white p-2" value={item.name} onChange={(event) => updateItem(index, "name", event.target.value)} /></label>
              <label className="min-w-28 flex-1">金額<input className="mt-1 w-full rounded border bg-white p-2" type="number" inputMode="numeric" value={item.price} onChange={(event) => updateItem(index, "price", event.target.value)} /></label>
            </div>
          ))}
          <button type="button" className="text-[#004a6e] underline" onClick={() => setItems((previous) => [...previous, { name: "", price: "" }])}>商品を追加</button>
          <p className="font-bold">小計 ¥{subtotal.toLocaleString("ja-JP")}</p>
          {error && <p role="alert" className="text-red-700">{error}</p>}
          <button type="submit" className="w-full rounded-xl bg-[#7cc7e8] px-4 py-3 font-bold">レシートを作る</button>
        </form>
        {receipt && totals && (
          <section aria-label="πレシート" className="mt-8 space-y-3 rounded-xl border p-5">
            {receipt.items.map((item, index) => <p key={index} className="flex justify-between gap-4"><span>{item.name}</span><span>¥{item.price.toLocaleString("ja-JP")}</span></p>)}
            <p className="flex justify-between gap-4"><span>πのおまけ: {receipt.note}</span><span>¥0</span></p>
            <p>小計 ¥{totals.subtotal.toLocaleString("ja-JP")}</p>
            <p>架空税率 3.14% ¥{totals.tax.toLocaleString("ja-JP")}</p>
            <p><span>合計</span> ¥{totals.total.toLocaleString("ja-JP")}</p>
            <p><span>πポイント</span> {totals.points}</p>
            <div className="flex flex-wrap gap-4">
              <button type="button" className="rounded bg-[#7cc7e8] px-4 py-2" onClick={() => void saveImage()}>画像を保存</button>
              {typeof navigator.share === "function" && typeof navigator.canShare === "function" && <button type="button" className="rounded bg-[#7cc7e8] px-4 py-2" onClick={() => void shareImage()}>画像を共有</button>}
              <button type="button" className="rounded border px-4 py-2" onClick={createReceipt}>再生成</button>
            </div>
            {imageError && <p role="alert">{imageError}</p>}
          </section>
        )}
      </main>
    </Layout>
  );
};
