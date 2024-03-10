import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme } from "@mui/material";
import Navbar from "./modules/NavBar/Navbar";
import { Home } from "./modules/events/pages/home/Home";
import { WorkSpace } from "./modules/events/pages/workspace/WorkSpace";
import EventPage from "./modules/events/pages/EventPage";
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";

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
      text: { main: "#fff" },
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/eventPage"
                element={
                  <EventPage
                    imageUrl="\Frame-1-3-min-1-3.png"
                    lat="32.81781057069659"
                    lng="35.00259862330999"
                  />
                }
              />

              <Route path="/workSpace" element={<WorkSpace />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
