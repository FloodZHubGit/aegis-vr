import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { XR, XROrigin, createXRStore } from "@react-three/xr";

const store = createXRStore({ controller: { grip: true, pointer: true } });

function App() {
  return (
    <div className="relative h-screen">
      <Canvas>
        <XR store={store}>
          <ambientLight />
          <Experience />
        </XR>
      </Canvas>
      <button
        onClick={() => store.enterVR()}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Enter AR
      </button>
    </div>
  );
}

export default App;
