import { TeleportTarget, XRLayer, XROrigin } from "@react-three/xr";
import { useRef, useState, useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { Classroom } from "./Classroom";
import { useGameEngine } from "../hooks/useGameEngine";

export const Experience = () => {
  const {
    players,
    isStarted,
    setSelectedRole,
    cubeColor,
    changeCubeColor,
    clickPhryge,
    clickDog,
  } = useGameEngine();
  const [playerPosition, setPlayerPosition] = useState(new Vector3());
  const [imageAspect1, setImageAspect1] = useState(1);
  const [videoAspect1, setVideoAspect1] = useState(1);

  const image1 = useMemo(() => {
    const result = document.createElement("img");
    result.src = "/images/phryge.png";
    result.onload = () => {
      setImageAspect1(result.width / result.height);
    };
    return result;
  }, []);

  const video1 = useMemo(() => {
    const result = document.createElement("video");
    result.src = "/videos/dog.mp4";
    result.onloadedmetadata = () => {
      setVideoAspect1(result.videoWidth / result.videoHeight);
    };
    result.loop = true;
    result.muted = true;
    result.play();
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
        position={[0, 1.5, 1]}
        scale={[0.5 * imageAspect1, 0.5, 1]}
        src={image1}
        pointerEventsType={{ deny: "grab" }}
        onClick={() => clickPhryge()}
      />

      <XRLayer
        position={[0, 1.5, 2]}
        rotation={[0, Math.PI, 0]}
        scale={[0.5 * videoAspect1, 0.5, 1]}
        src={video1}
        pointerEventsType={{ deny: "grab" }}
        onClick={() => clickDog()}
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
