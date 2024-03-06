import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Navbar from "./modules/NavBar/Navbar";
import Home from "./modules/home/Home";

import { AuthModal } from "./modules/auth/components/AuthModal/AuthModal";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div className="App">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<AuthModal />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );

}

export default App;
