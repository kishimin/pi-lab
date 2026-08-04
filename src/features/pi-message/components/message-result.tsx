type Props = {
  /** 結果で表示されるメッセージ */
  message: string;
  /** 別のメッセージを試すボタンをクリックしたときの処理 */
  onClickRetryButton: () => void;
};

export const MessageResult = (props: Props) => {
  const { message, onClickRetryButton } = props;

  return (
    <section
      className={"flex flex-1 flex-col items-center justify-center gap-4"}
    >
      <h2>{message}</h2>

      <button
        className={"rounded bg-[#7cc7e8] px-4 py-2 shadow"}
        onClick={onClickRetryButton}
      >
        {"別のメッセージを試す"}
      </button>
    </section>
  );
};
