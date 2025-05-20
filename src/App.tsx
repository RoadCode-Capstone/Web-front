import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  RegisterSuccess,
  PasswordFinding,
  PasswordSetting,
} from "./presentation/pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/passwordFinding" element={<PasswordFinding />}></Route>
          <Route path="/passwordSetting" element={<PasswordSetting />}></Route>
          <Route path="/registerSuccess" element={<RegisterSuccess />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
