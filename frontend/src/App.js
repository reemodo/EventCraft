import "./App.css";
import { EventFormModal } from "./modules/events/components/EventFormModal/EventFormModal";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EventFormModal isOpen={true} />
      </LocalizationProvider>
    </div>
  );
}

export default App;
