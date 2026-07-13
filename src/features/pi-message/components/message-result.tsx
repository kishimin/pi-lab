type Props = {
  message: string;
};

export const MessageResult = (props: Props) => {
  const { message } = props;

  return (
    <>
      <h2>{"πでは伝わりません"}</h2>
    </>
  );
};
