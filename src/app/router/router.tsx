import { Route, Routes } from "react-router";
import { paths } from "../../types/page-texts";
import { PiLoopPage } from "../../features/pi-loop/pages/pi-loop";
import { PiMessagePage } from "../../features/pi-message/pages/pi-message";

export const RouterContents = () => {
  return (
    <Routes>
      <Route path={paths.index} element={<PiLoopPage />} />
      <Route path={paths.piMessage} element={<PiMessagePage />} />
    </Routes>
  );
};
