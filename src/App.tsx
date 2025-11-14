import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navigate } from "react-router-dom";
import { HeaderLayout } from "./layouts";
import { RestrictedRoute, PrivateRoute } from "./presentation/components";
import {
  AttendancePage,
  LevelTestEditor,
  LevelTestSettingPage,
  MainPage,
  ProblemPage,
  RankingPage,
  RoadMapListPage,
  RoadMapPage,
  LoginPage,
  RegisterPage,
  PasswordResetPage,
} from "./presentation/pages";

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
                element={<LevelTestSettingPage />}
              />
              <Route path="/" element={<RoadMapPage />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/roadmap/list" element={<RoadMapListPage />} />
            </Route>
            <Route path="/leveltest" element={<LevelTestEditor />} />
            <Route path="/code" element={<ProblemPage />} />
          </Route>

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
