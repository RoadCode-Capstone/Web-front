import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Login, Register } from './presentation/components';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
				</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
