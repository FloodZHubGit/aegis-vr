import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { XR, XROrigin, createXRStore } from "@react-three/xr";

const store = createXRStore({
  hand: { left: { rayPointer: true }, right: { rayPointer: true } },
  controller: { left: { rayPointer: true }, right: { rayPointer: true } },
});

function App() {
  return (
    <div className="relative h-screen">
      <Canvas>
        <XR store={store}>
          <ambientLight />
          <Experience />
        </XR>
      </Canvas>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={() => store.enterAR()}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Enter AR
        </button>
        <button
          onClick={() => store.enterVR()}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Enter VR
        </button>
      </div>
    </div>
  );
}

export default App;
