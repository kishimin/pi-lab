import { Footer } from "../../../components/footer";
import { Header } from "../../../components/header";
import { MessageInput } from "../components/message-input";

export const PiMessagePage = () => {
  return (
    <>
      <Header />

      <h1>{"πで伝える"}</h1>

      <MessageInput />

      <Footer />
    </>
  );
};
