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
    const thumbstickState = controller.gamepad["xr-standard-thumbstick"];
    if (thumbstickState == null) {
      return;
    }

    // Get the player's current rotation
    const rotation = ref.current.rotation.y;

    // Calculate the direction based on the player's rotation
    const direction = new Vector3(
      (thumbstickState.xAxis ?? 0) * delta,
      0,
      (thumbstickState.yAxis ?? 0) * delta
    ).applyAxisAngle(new Vector3(0, 1, 0), rotation);

    // Apply the direction to the player's position
    ref.current.position.add(direction);
  });
  return <XROrigin ref={ref} />;
}
