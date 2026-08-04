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
          <main className={"flex flex-1 items-center justify-center"}>
            <form
              className={"flex flex-col items-center"}
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(onSubmit)(e);
              }}
            >
              <label htmlFor={"message"}>{"メッセージ"}</label>
              <input
                id={"message"}
                className={
                  "mt-2 mb-2 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-colors hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                }
                {...register("message")}
              />
              <p>{errors.message?.message}</p>

              <button>{"πで伝える"}</button>
            </form>
          </main>
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
