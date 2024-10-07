import { useState } from "react";

export const Experience = () => {
  const [red, setRed] = useState(false);

  return (
    <>
      <mesh
        pointerEventsType={{ allow: "grab" }}
        onClick={() => setRed(!red)}
        position={[0, 1, -1]}
      >
        <boxGeometry />
        <meshBasicMaterial color={red ? "red" : "blue"} />
      </mesh>
      <DraggableCube />
    </>
  );
};

function DraggableCube() {
  const isDraggingRef = useRef(false);
  const meshRef = useRef < Mesh > null;

  return (
    <mesh
      ref={meshRef}
      onPointerDown={(e) => {
        if (isDraggingRef.current) {
          return;
        }
        isDraggingRef.current = true;
        meshRef.position.copy(e.point);
      }}
      onPointerMove={(e) => {
        if (!isDraggingRef.current) {
          return;
        }
        meshRef.position.copy(e.point);
      }}
      onPointerUp={(e) => (isDraggingRef.current = false)}
    >
      <boxGeometry />
    </mesh>
  );
}
