import { useForm } from "react-hook-form";
import type { PiMessageInputSchema } from "../types/pi-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { piMessageInputSchema } from "../schemas/pi-message";

export const MessageInput = () => {
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
      <form
        onSubmit={() => {
          void handleSubmit(onSubmit);
        }}
      >
        <label htmlFor={"message"}>{"メッセージ"}</label>
        <input id={"message"} {...register("message")} />
        <p>{errors.message?.message}</p>

        <button type={"submit"}>{"πで伝える"}</button>
      </form>
    </>
  );
};
