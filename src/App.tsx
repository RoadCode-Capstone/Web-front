import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  RegisterSuccess,
  PasswordFinding,
  PasswordSetting,
  UserInfo,
  Main,
  Planning,
  LevelTest,
  Problem,
  LevelTestResult,
} from "./presentation/pages";
import Components from "./presentation/pages/Components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dev/components" element={<Components />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/passwordFinding" element={<PasswordFinding />}></Route>
          <Route path="/passwordSetting" element={<PasswordSetting />}></Route>
          <Route path="/registerSuccess" element={<RegisterSuccess />}></Route>

          <Route path="/userInfo" element={<UserInfo />}></Route>

          <Route path="/main" element={<Main />}></Route>

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
