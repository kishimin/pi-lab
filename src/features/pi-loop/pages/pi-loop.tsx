import { Layout } from "../../../components/layout";
import { pageTitles } from "../../../types/page-texts";
import { Links } from "../components/links";

export const PiLoopPage = () => {
  return (
    <Layout title={pageTitles.index}>
      <Links />
    </Layout>
  );
};
