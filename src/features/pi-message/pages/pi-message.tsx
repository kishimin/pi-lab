import { useForm } from "react-hook-form";
import { type PageType, type PiMessageInputSchema } from "../types/pi-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { piMessageInputSchema } from "../schemas/pi-message";
import { Progress } from "../components/progressing-message";
import { useEffect, useState } from "react";
import { MessageResult } from "../components/message-result";
import { generateMessageResult } from "../utils/pi-message";
import { Layout } from "../../../components/layout";
import { pageTitles } from "../../../types/page-texts";

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
    if (pageType === "progress") {
      const timer = setTimeout(() => {
        setPageType("result");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [pageType]);

  const onSubmit = () => {
    setPageType("progress");
  };

  switch (pageType) {
    case "input":
      return (
        <Layout title={pageTitles.piMessage}>
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
        </Layout>
      );

    case "progress":
      return <Progress />;

    case "result":
      return (
        <Layout title={pageTitles.piMessage}>
          <MessageResult
            message={generateMessageResult()}
            onClickRetryButton={() => setPageType("input")}
          />
        </Layout>
      );
  }
};
