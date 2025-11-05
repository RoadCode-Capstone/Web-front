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
import LoginPage from "./presentation/pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./presentation/pages/RegisterPage";
import MainPage from "./presentation/pages/MainPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dev/components" element={<Components />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/passwordFinding" element={<PasswordFinding />}></Route>
          <Route path="/passwordSetting" element={<PasswordSetting />}></Route>
          <Route path="/registerSuccess" element={<RegisterSuccess />}></Route>

          <Route path="/userInfo" element={<UserInfo />}></Route>

          <Route path="/" element={<MainPage />}></Route>

          <Route path="/newRoadMap" element={<Planning />}></Route>
          <Route path="/levelTest" element={<LevelTest />}></Route>
          <Route path="/levelTest/result" element={<LevelTestResult />}></Route>
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
