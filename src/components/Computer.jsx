import { TeleportTarget, XROrigin } from "@react-three/xr";
import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import { Classroom } from "./Classroom";
import { useGameEngine } from "../hooks/useGameEngine";

export const Computer = () => {
  const { players, isStarted, setSelectedRole, cubeColor, changeCubeColor } =
    useGameEngine();

  return (
    <>
      <button onClick={changeCubeColor}>Change Cube Color</button>
      <p>{cubeColor}</p>
    </>
  );
};
