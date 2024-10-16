import { myPlayer } from "playroomkit";
import React, { useState } from "react";
import { useGameEngine } from "./hooks/useGameEngine";

function App() {
  const { players, isStarted, setSelectedRole, setIsStarted } = useGameEngine();
  const me = myPlayer();

  return (
    <div>
      {!isStarted && (
        <div>
          <button onClick={() => setSelectedRole(me, "Computer")}>
            Computer Player
          </button>
          <button onClick={() => setSelectedRole(me, "VR")}>VR Player</button>
        </div>
      )}
      {isStarted && me.state.playerType === "Computer" && (
        <div>Computer Player</div>
      )}
      {isStarted && me.state.playerType === "VR" && <VR />}
    </div>
  );
}

export default App;
