import { useForm } from "react-hook-form";
import type { PiMessageInputSchema } from "../types/pi-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { piMessageInputSchema } from "../schemas/pi-message";

export const MessageInput = () => {
  const {
    register,
    formState: { errors },
  } = useForm<PiMessageInputSchema>({
    resolver: zodResolver(piMessageInputSchema),
    mode: "onChange",
  });
  return (
    <>
      <label htmlFor={"message"}>{"メッセージ"}</label>
      <input id={"message"} {...register("message")} />
      <p>{errors.message?.message}</p>
    </>
  );
};
