import './assets/App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GameDetails from "./pages/GameDetails";
import Profile from "./pages/Profile";
import AddGame from "./pages/AddGame";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/details/:id" element={<GameDetails/>} />
              <Route path="/addGame" element={<AddGame/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
