import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Login, Register, PasswordFinding } from './presentation/components';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/password-finding" element={<PasswordFinding />}></Route>
				</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
