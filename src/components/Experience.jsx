import { TeleportTarget, XROrigin } from "@react-three/xr";
import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import { Classroom } from "./Classroom";
import { useGameEngine } from "../hooks/useGameEngine";

export const Experience = () => {
  const { players, isStarted, setSelectedRole, cubeColor, changeCubeColor } =
    useGameEngine();
  const [playerPosition, setPlayerPosition] = useState(new Vector3());

  return (
    <>
      <XROrigin position={playerPosition} />
      <TeleportTarget onTeleport={setPlayerPosition}>
        <mesh scale={[10, 1, 10]} position={[0, -0.5, 0]}>
          <boxGeometry />
          <meshBasicMaterial color="green" />
        </mesh>
      </TeleportTarget>

      <Classroom />

      <mesh
        pointerEventsType={{ deny: "grab" }}
        onClick={() => changeCubeColor()}
        position={[0, 1, -1]}
      >
        <boxGeometry />
        <meshBasicMaterial color={cubeColor} />
      </mesh>

      {/* {targets.map((target) => (
        <mesh
          key={target.id}
          position={target.position}
          onClick={() => deleteTarget(target.id)}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
      ))} */}
    </>
  );
};
