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
    reset,
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

  const onClickRetryButton = () => {
    reset();
    setPageType("input");
  };

  const messageInputStateClassName = errors.message
    ? "border-red-600 hover:border-red-700 focus:border-red-600 focus:ring-red-100"
    : "border-slate-300 hover:border-slate-400 focus:border-sky-500 focus:ring-sky-100";

  switch (pageType) {
    case "input":
      return (
        <Layout title={pageTitles.piMessage}>
          <main
            className={
              "flex flex-1 items-center justify-center px-4 py-6 sm:p-8"
            }
          >
            <form
              className={"flex w-full max-w-sm flex-col items-center"}
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(onSubmit)(e);
              }}
            >
              <div className={"flex w-full flex-col gap-2"}>
                <label
                  htmlFor={"message"}
                  className={errors.message ? "text-red-600" : undefined}
                >
                  {"メッセージ"}
                </label>
                <input
                  id={"message"}
                  className={
                    `w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-colors focus:ring-4 ${messageInputStateClassName}`
                  }
                  {...register("message")}
                />
                {errors.message && (
                  <p className={"text-red-600"}>{errors.message.message}</p>
                )}
              </div>

              <button
                className={"mt-6 rounded bg-[#7cc7e8] px-4 py-2 shadow"}
              >
                {"πで伝える"}
              </button>
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
            onClickRetryButton={onClickRetryButton}
          />
        </Layout>
      );
  }
};
