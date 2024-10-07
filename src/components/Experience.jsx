import { TeleportTarget, XROrigin } from "@react-three/xr";
import { useRef, useState } from "react";
import { Vector3 } from "three";

export const Experience = () => {
  const [red, setRed] = useState(false);
  const [position, setPosition] = useState(new Vector3());
  return (
    <>
      <XROrigin />
      <TeleportTarget onTeleport={setPosition}>
        <mesh scale={[10, 1, 10]} position={[0, -0.5, 0]}>
          <boxGeometry />
          <meshBasicMaterial color="green" />
        </mesh>
      </TeleportTarget>

      <mesh
        pointerEventsType={{ allow: "grab" }}
        onClick={() => setRed(!red)}
        position={[0, 1, -1]}
      >
        <boxGeometry />
        <meshBasicMaterial color={red ? "red" : "blue"} />
      </mesh>
    </>
  );
};
