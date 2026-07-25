import { Footer } from "../../../components/footer";
import { Header } from "../../../components/header";
import { useForm } from "react-hook-form";
import { type PageType, type PiMessageInputSchema } from "../types/pi-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { piMessageInputSchema } from "../schemas/pi-message";
import { Progress } from "../components/progressing-message";
import { useEffect, useState } from "react";
import { MessageResult } from "../components/message-result";
import { generateMessageResult } from "../utils/pi-message";

export const PiMessagePage = () => {
  const [pageType, setPageType] = useState<PageType>("input");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PiMessageInputSchema>({
    resolver: zodResolver(piMessageInputSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageType("result");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onSubmit = () => {
    setPageType("progress");
  };

  switch (pageType) {
    case "input":
      return (
        <>
          <Header />

          <h1>{"πで伝える"}</h1>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit(onSubmit)(e);
            }}
          >
            <label htmlFor={"message"}>{"メッセージ"}</label>
            <input id={"message"} {...register("message")} />
            <p>{errors.message?.message}</p>

            <button>{"πで伝える"}</button>
          </form>

          <Footer />
        </>
      );
    case "progress":
      return <Progress />;
    case "result":
      return (
        <>
          <Header />

          <h1>{"πで伝える"}</h1>

          <MessageResult message={generateMessageResult()} />

          <Footer />
        </>
      );
  }
};
