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
              position: [0, 50, 140],
              rotation: [0, -0.19993853092067707, 0],
              fov: 45,
            }}
            colorManagement
            shadowMap
            className="canvas"
          >
            <Suspense fallback={<Loader />}>
              <directionalLight intensity={0.8} position={[-20, -20, 40]} />
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
