type Props = {
  message: string;
};

export const MessageResult = (props: Props) => {
  const { message } = props;

  return (
    <>
      <h2>{message}</h2>

      <button>{"別のメッセージを試す"}</button>
    </>
  );
};
