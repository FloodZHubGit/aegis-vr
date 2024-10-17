import { TeleportTarget, XRLayer, XROrigin } from "@react-three/xr";
import { useRef, useState, useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { Classroom } from "./Classroom";
import { useGameEngine } from "../hooks/useGameEngine";

export const Experience = () => {
  const { players, isStarted, setSelectedRole, cubeColor, changeCubeColor } =
    useGameEngine();
  const [playerPosition, setPlayerPosition] = useState(new Vector3());

  const image1 = useMemo(() => {
    const result = document.createElement("img");
    // find image in public/images/phryge.png
    result.src = "/images/phryge.png";
    return result;
  }, []);

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

      <XRLayer
        position={[0, 1.5, -0.5]}
        onClick={() => video.play()}
        scale={0.5}
        src={image1}
      />

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
