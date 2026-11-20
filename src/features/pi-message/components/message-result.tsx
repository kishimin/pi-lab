import { useState } from "react";

type Props = {
  message: string;
  onClickRetryButton: () => void;
  shareUrl?: string;
};

export const MessageResult = ({ message, onClickRetryButton, shareUrl }: Props) => {
  const [copyStatus, setCopyStatus] = useState("");

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus("リンクをコピーしました");
    } catch {
      setCopyStatus("コピーできませんでした。リンクを選択してコピーしてください。");
    }
  };

  const shareLink = async () => {
    if (!shareUrl || !navigator.share) return;
    try {
      await navigator.share({ title: "πで伝える", url: shareUrl });
    } catch {
      // Sharing can be cancelled; the copyable link remains available.
    }
  };

  return (
    <section aria-label="メッセージ結果" className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-6 text-center sm:p-8">
      <h2>{message}</h2>
      {shareUrl && (
        <>
          <button type="button" className="rounded bg-[#7cc7e8] px-4 py-2 shadow" onClick={() => void copyLink()}>
            共有リンクをコピー
          </button>
          <label className="w-full max-w-lg">共有リンク<input className="w-full rounded border p-2" readOnly value={shareUrl} onFocus={(event) => event.currentTarget.select()} /></label>
          <p role="status">{copyStatus}</p>
          {typeof navigator.share === "function" && <button type="button" onClick={() => void shareLink()}>共有する</button>}
          <a href={`https://twitter.com/intent/tweet?${new URLSearchParams({ url: shareUrl })}`} target="_blank" rel="noopener noreferrer">Xで共有</a>
        </>
      )}
      <button type="button" className="rounded bg-[#7cc7e8] px-4 py-2 shadow" onClick={onClickRetryButton}>
        別のメッセージを試す
      </button>
    </section>
  );
};
