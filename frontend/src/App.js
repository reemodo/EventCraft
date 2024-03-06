import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./modules/NavBar/Navbar";
import Home from "./modules/home/Home";
import { AuthModal } from "./modules/auth/components/AuthModal/AuthModal";


function App() {
  return (
  <Router>
    <div className="App">
      <Navbar/>
    </div>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/log" element={<AuthModal/>} />
    </Routes>

  </Router>
  );
}

export default App;
