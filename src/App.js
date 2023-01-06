import React from "react";
import { AuthContextProvider } from "./context/auth-context";

function App() {
  return (
    <AuthContextProvider>
      <div>hotel booking app</div>
    </AuthContextProvider>
  );
}

export default App;
