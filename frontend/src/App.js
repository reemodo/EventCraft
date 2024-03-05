import "./App.css";
import { AuthModal } from "./modules/auth/components/AuthModal/AuthModal";

function App() {
  return (
    <div className="App">
      <AuthModal isOpen={true} />
    </div>
  );
}

export default App;
