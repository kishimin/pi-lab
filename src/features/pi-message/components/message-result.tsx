type Props = {
  /** 結果で表示されるメッセージ */
  message: string;
  /** 別のメッセージを試すボタンをクリックしたときの処理 */
  onClickRetryButton: () => void;
};

export const MessageResult = (props: Props) => {
  const { message, onClickRetryButton } = props;

  return (
    <>
      <h2>{message}</h2>

      <button onClick={onClickRetryButton}>{"別のメッセージを試す"}</button>
    </>
  );
};
