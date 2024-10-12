import { TeleportTarget, XROrigin } from "@react-three/xr";
import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import { Book } from "./Book";

export const Experience = () => {
  const [red, setRed] = useState(false);
  const [position, setPosition] = useState(new Vector3());
  const [targets, setTargets] = useState([]);

  // // Function to spawn a new target
  // const spawnTarget = () => {
  //   const newTarget = {
  //     id: Math.random().toString(36).substr(2, 9),
  //     position: new Vector3(
  //       Math.random() * 10 - 5,
  //       Math.random() * 5,
  //       Math.random() * -10
  //     ),
  //   };
  //   setTargets((prevTargets) => [...prevTargets, newTarget]);
  // };

  // // Function to delete a target
  // const deleteTarget = (id) => {
  //   setTargets((prevTargets) =>
  //     prevTargets.filter((target) => target.id !== id)
  //   );
  // };

  // // Spawn a new target every 2 seconds
  // useEffect(() => {
  //   const interval = setInterval(spawnTarget, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <XROrigin position={position} />
      <TeleportTarget onTeleport={setPosition}>
        <mesh scale={[10, 1, 10]} position={[0, -0.5, 0]}>
          <boxGeometry />
          <meshBasicMaterial color="green" />
        </mesh>
      </TeleportTarget>

      <TeleportTarget onTeleport={setPosition}>
        <Book />
      </TeleportTarget>

      <mesh
        pointerEventsType={{ deny: "grab" }}
        onClick={() => setRed(!red)}
        position={[0, 1, -1]}
      >
        <boxGeometry />
        <meshBasicMaterial color={red ? "red" : "blue"} />
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
