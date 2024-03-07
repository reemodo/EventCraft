import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import Navbar from "./modules/NavBar/Navbar";
import Home from "./modules/home/Home";
import { WorkSpace } from "./modules/events/pages/workspace/WorkSpace";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFF",
        contrastText: "#000",
      },
      secondary: {
        main: "#4caf50",
        contrastText: "#fff",
      },
      text: { main: "#000" },
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workSpace" element={<WorkSpace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
