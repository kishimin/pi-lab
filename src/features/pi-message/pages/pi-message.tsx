import { Footer } from "../../../components/footer";
import { Header } from "../../../components/header";
import { useForm } from "react-hook-form";
import type { PiMessageInputSchema } from "../types/pi-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { piMessageInputSchema } from "../schemas/pi-message";

export const PiMessagePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PiMessageInputSchema>({
    resolver: zodResolver(piMessageInputSchema),
    mode: "onChange",
  });

  const onSubmit = () => console.log("submit");

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
};
