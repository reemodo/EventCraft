import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, createTheme } from "@mui/material";

import withAuth from "./modules/auth/hooks/useAuth/withAuth";

import Navbar from "./modules/NavBar/Navbar";
import { Home } from "./modules/events/pages/home/Home";
import { WorkSpace } from "./modules/events/pages/workspace/WorkSpace";
import EventPage from "./modules/events/pages/EventPage";
import { CardEdit } from "./modules/events/card/components/CardEdit/CardEdit";

import "./App.css";
import EditEventPage from "./modules/events/pages/EditEventPage";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2222",
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
        <Stack direction={"row"}>
          <Router>
            <Box>
              <Navbar />
            </Box>
            <Box sx={{ flex: 1, backgroundColor:'#8080801f'}}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/eventPage/:id"
                  element={
                    <EventPage
                      imageUrl="\Frame-1-3-min-1-3.png"
                      lat="32.81781057069659"
                      lng="35.00259862330999"
                    />
                  }
                />

                <Route path="/workSpace" element={withAuth(WorkSpace)} />
                <Route path="/editCard/:id" element={withAuth(CardEdit)} />

                <Route
                  path="/editEvent/:id"
                  element={withAuth(EditEventPage)}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </Router>
        </Stack>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
