// React
import { Suspense, useEffect } from "react";

// Three
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

// Styles
import "./About.css";

// Components
import Model from "./components/Model/Model";
import Loader from "./components/Loader/Loader";


const Room = () => {
  return (
    <>
      <div id="canvas-container">

        <Canvas camera={{ rotation: [1, 9, 5], position: [-45, 45, 80] }}>
          <Suspense fallback={<Loader />}>
            <Environment preset="forest" background />

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
      </div>
    </>
  );
};

export default Room;
