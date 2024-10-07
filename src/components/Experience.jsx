import { useFrame } from "@react-three/fiber";
import {
  TeleportTarget,
  useXRInputSourceState,
  XROrigin,
} from "@react-three/xr";
import { useRef, useState } from "react";
import { Vector3 } from "three";

export const Experience = () => {
  const [red, setRed] = useState(false);
  const [position, setPosition] = useState(new Vector3());
  return (
    <>
      <Locomotion />
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

function Locomotion() {
  const controller = useXRInputSourceState("controller", "right");
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current == null || controller == null) {
      return;
    }
    const thumstickState = controller.gamepad["xr-standard-thumbstick"];
    if (thumstickState == null) {
      return;
    }
    ref.current.position.x += (thumstickState.xAxis ?? 0) * delta;
    ref.current.position.z += (thumstickState.yAxis ?? 0) * delta;
  });
  return <XROrigin ref={ref} />;
}
