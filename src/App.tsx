import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Register,
  RegisterSuccess,
  PasswordFinding,
  PasswordSetting,
  UserInfo,
  Main,
  Planning,
  LevelTest,
  LevelTestResult,
} from "./presentation/pages";
import Components from "./presentation/pages/Components";
import { Navigate } from "react-router-dom";
import LoginPage from "./presentation/pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./presentation/pages/RegisterPage";
import MainPage from "./presentation/pages/MainPage";
import { HeaderLayout } from "./layouts/HeaderLayout";
import { LeveltestSettingPage } from "./presentation/pages/leveltest/LevelTestSettingPage";
import { ProblemPage } from "./presentation/pages/ProblemPage";
import { RoadMap } from "./presentation/pages/RoadMap";
import { RankingPage } from "./presentation/pages/RankingPage";
import AttendancePage from "./presentation/pages/AttendancePage";
import RestrictedRoute from "./presentation/components/auth/RestrictedRoute";
import PrivateRoute from "./presentation/components/auth/PrivateRoute";
import PasswordResetPage from "./presentation/pages/PasswordResetPage";
import { LeveltestEditor } from "./presentation/pages/leveltest/leveltestEditor";
import RoadMapListPage from "./presentation/pages/RoadMapListPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* private pages */}
          <Route element={<PrivateRoute />}>
            <Route element={<HeaderLayout />}>
              <Route path="/none" element={<MainPage />} />
              <Route
                path="/leveltest/setting"
                element={<LeveltestSettingPage />}
              />
              <Route path="/" element={<RoadMap />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/roadmap/list" element={<RoadMapListPage />} />
            </Route>
            <Route path="/leveltest" element={<LeveltestEditor />} />
            <Route path="/code" element={<ProblemPage />} />
          </Route>
          <Route path="/dev/components" element={<Components />}></Route>

          {/* public pages(이미 로그인한 사람 제한) */}
          <Route element={<RestrictedRoute />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/reset" element={<PasswordResetPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
          {/* <Route path="/passwordFinding" element={<PasswordFinding />}></Route>
          <Route path="/passwordSetting" element={<PasswordSetting />}></Route>
          <Route path="/registerSuccess" element={<RegisterSuccess />}></Route>

          <Route path="/userInfo" element={<UserInfo />}></Route>

          <Route path="/newRoadMap" element={<Planning />}></Route>
          <Route path="/levelTest/result" element={<LevelTestResult />}></Route> */}
          {/* <Route path="/problem/:problemId" element={<Problem />}></Route> */}
          {/* <Route
            path="/problem"
            element={
              <Problem
                problemDescription={""}
                inputDescription={""}
                outputDescription={""}
                language={"python"}
                problemName={""}
                onActionClick={function (code: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          ></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
