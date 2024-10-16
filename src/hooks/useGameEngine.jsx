import {
  isHost,
  useMultiplayerState,
  usePlayersList,
  getState,
} from "playroomkit";
import React from "react";

const GameEngineContext = React.createContext();

export const GameEngineProvider = ({ children }) => {
  const [isStarted, setIsStarted] = useMultiplayerState("isStarted", false);
  const [cubeColor, setCubeColor] = useMultiplayerState("cubeColor", "blue");

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  const setSelectedRole = (player, role) => {
    player.setState("playerType", role, true);
    gameSetup();
  };

  const gameSetup = () => {
    if (players.every((player) => player.state.playerType)) {
      setIsStarted(true);
    }
  };

  const changeCubeColor = () => {
    const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCubeColor(randomColor);
  };

  const gameState = {
    players,
    isStarted,
    setSelectedRole,
    gameSetup,
    cubeColor,
    changeCubeColor,
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
