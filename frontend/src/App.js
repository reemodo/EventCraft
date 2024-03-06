import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./modules/NavBar/Navbar";
import Home from "./modules/home/Home";
import { AuthModal } from "./modules/auth/components/AuthModal/AuthModal";


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFF'
      },
      secondary:{
        main: '#4caf50'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar/>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/log" element={<AuthModal/>} />
        </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;
