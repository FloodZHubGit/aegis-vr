import { useFrame } from "@react-three/fiber";
import {
  TeleportTarget,
  useXRInputSourceState,
  XROrigin,
} from "@react-three/xr";
import { useRef, useState } from "react";
import { Vector3, Euler } from "three";

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

      <XROrigin position={position} />

      <mesh
        pointerEventsType={{ deny: "grab" }}
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
  const cameraRef = useRef();

  useFrame((state, delta) => {
    if (ref.current == null || controller == null) {
      return;
    }
    const thumbstickState = controller.gamepad["xr-standard-thumbstick"];
    if (thumbstickState == null) {
      return;
    }

    // Get the camera's world quaternion
    const cameraQuaternion = state.camera.quaternion;
    const euler = new Euler().setFromQuaternion(cameraQuaternion, "YXZ");
    const yRotation = euler.y;

    // Calculate movement direction based on the y-axis rotation
    const moveX = (thumbstickState.xAxis ?? 0) * delta;
    const moveZ = (thumbstickState.yAxis ?? 0) * delta;
    const direction = new Vector3(moveX, 0, moveZ).applyAxisAngle(
      new Vector3(0, 1, 0),
      yRotation
    );

    ref.current.position.x += direction.x;
    ref.current.position.z += direction.z;
  });

  return <XROrigin ref={ref} camera={{ ref: cameraRef }} />;
}
