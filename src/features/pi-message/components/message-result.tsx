type Props = {
  /** 結果で表示されるメッセージ */
  message: string;
  /** 別のメッセージを試すボタンをクリックしたときの処理 */
  onClickRetryButton: () => void;
};

export const MessageResult = (props: Props) => {
  const { message, onClickRetryButton } = props;

  return (
    <section className={"flex flex-1 flex-col items-center justify-center"}>
      <h2>{message}</h2>

      <button onClick={onClickRetryButton}>{"別のメッセージを試す"}</button>
    </section>
  );
};
