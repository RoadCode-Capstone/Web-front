import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginForm,
  RegisterForm,
  PasswordFinding,
  PasswordSetting,
} from "./presentation/components";
import { Login } from "./presentation/pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          {/* <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/passwordFinding" element={<PasswordFinding />}></Route>
          <Route path="/passwordSetting" element={<PasswordSetting />}></Route>
          <Route path="/registerSuccess" element={<RegisterSuccess />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
