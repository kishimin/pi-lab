export const Progress = () => {
  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center text-4xl font-bold"
      }
    >
      <h3 className={"break-all"}>
        {"3.14159265358979323846264338327950288419716939937510..."}
      </h3>
      <h3>{"割り切れないため処理に時間がかかっています"}</h3>
    </main>
  );
};
