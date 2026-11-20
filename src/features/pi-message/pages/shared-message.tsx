import { Navigate, useLocation, useNavigate } from "react-router";
import { Layout } from "../../../components/layout";
import { pageTitles, paths } from "../../../types/page-texts";
import { MessageResult } from "../components/message-result";
import { readSharedResult } from "../utils/share-result";

export const SharedMessagePage = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const result = readSharedResult(hash);

  if (result === null) return <Navigate to={paths.piMessage} replace />;

  return (
    <Layout title={pageTitles.piMessage}>
      <MessageResult message={result} onClickRetryButton={() => void navigate(paths.piMessage)} />
    </Layout>
  );
};
