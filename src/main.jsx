import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { insertCoin } from "playroomkit";
import { GameEngineProvider } from "./hooks/useGameEngine";

insertCoin({
  maxPlayersPerRoom: 2,
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <GameEngineProvider>
        <App />
      </GameEngineProvider>
    </React.StrictMode>
  );
});
