import { Layout } from "../../../components/layout";
import { Links } from "../components/links";

export const PiLoopPage = () => {
  return (
    <Layout title={undefined}>
      <main
        className={"flex flex-1 items-center justify-center px-4 py-6 sm:p-8"}
      >
        <Links />
      </main>
    </Layout>
  );
};
