import "./App.css";

import { AuthContextProvider } from "./context/AuthContext";
import Home from "./Components/Home";

function App() {
  return (
    <AuthContextProvider>
      <Home />
    </AuthContextProvider>
  );
}

export default App;


