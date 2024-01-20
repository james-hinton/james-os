import { Suspense, useEffect, useState } from "react";

// Three
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Styles
import "./Room.scss";

// Components
import Model from "./components/Model/Model";
import Loader from "./components/Loader/Loader";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const CameraLogger = () => {
  const { camera } = useThree();
  const [lastLog, setLastLog] = useState(Date.now());

  useFrame(() => {
    const now = Date.now();
    if (now - lastLog >= 1000) {
      // Log every 1000 milliseconds (1 second)
      console.log("Camera Position:", camera.position);
      console.log("Camera Rotation:", camera.rotation);
      setLastLog(now);
    }
  });

  return null; // This component does not render anything
};

const Room = () => {
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }
  if (!isWebGLAvailable()) {
    return <div>Please enable WebGL to use this feature.</div>;
  }

  return (
    <>
      <div id="canvas-container" className="interactable">
        <ErrorBoundary>
          <Canvas
            camera={{
              position: [
                0, 0, 0
              ],
              rotation: [
                -0.3013837081135052, // Radians
                -0.7158750724030751, // Radians
                -0.20124447110888063, // Radians
              ],
              fov: 45,
            }}
            colorManagement
            shadowMap
            className="canvas"
          >
            <Suspense fallback={<Loader />}>
              <directionalLight intensity={0.8} position={[-20, -20, 40]} />
              <CameraLogger />

              <Model
                path={"/models/room/scene.gltf"}
                scale={30}
                position={[0, 0, -20]}
              />

              <Model
                path={"/models/robot/scene.gltf"}
                scale={3}
                position={[0, 18, -23]}
              />

              <Model
                path={"/models/linux/scene.gltf"}
                scale={0.1}
                position={[-1.5, 15, 17]}
              />

              <Model
                path={"/models/chess/scene.gltf"}
                scale={0.015}
                position={[-17, 10.5, 20]}
              />

              <OrbitControls autoRotate autoRotateSpeed={0.3} />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Room;
