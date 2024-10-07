import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { XR, createXRStore } from "@react-three/xr";

const store = createXRStore();

function App() {
  return (
    <div className="relative h-screen">
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <XR store={store}>
          <color attach="background" args={["#ececec"]} />
          <Experience />
        </XR>
      </Canvas>
      <button
        onClick={() => store.enterAR()}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Enter AR
      </button>
    </div>
  );
}

export default App;
