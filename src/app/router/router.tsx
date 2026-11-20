import { Route, Routes } from "react-router";
import { paths } from "../../types/page-texts";
import { PiLoopPage } from "../../features/pi-loop/pages/pi-loop";
import { PrivacyPage } from "../../features/privacy/pages/privacy";
import { SharedMessagePage } from "../../features/pi-message/pages/shared-message";
import { PiMessagePage } from "../../features/pi-message/pages/pi-message";

export const RouterContents = () => {
  return (
    <Routes>
      <Route path={paths.index} element={<PiLoopPage />} />
      <Route path={paths.privacy} element={<PrivacyPage />} />
      <Route path={paths.sharedMessage} element={<SharedMessagePage />} />
      <Route path={paths.piMessage} element={<PiMessagePage />} />
    </Routes>
  );
};
