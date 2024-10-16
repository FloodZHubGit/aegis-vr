import {
  isHost,
  useMultiplayerState,
  usePlayersList,
  getState,
} from "playroomkit";
import React from "react";

const GameEngineContext = React.createContext();

export const GameEngineProvider = ({ children }) => {
  const [isStarted, setIsStarted] = React.useState(false);

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  const setSelectedRole = (player, role) => {
    player.setState("playerType", role, true);
  };

  const gameSetup = () => {
    if (isHost()) {
      players.forEach((player) => {
        player.setState("playerType", "", true);
      });
    }
  };

  const gameState = {
    players,
    isStarted,
    setSelectedRole,
    gameSetup,
  };

  return (
    <GameEngineContext.Provider
      value={{
        ...gameState,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
};

export const useGameEngine = () => {
  const context = React.useContext(GameEngineContext);
  if (context === undefined) {
    throw new Error("useGameEngine must be used within a GameEngineProvider");
  }
  return context;
};
