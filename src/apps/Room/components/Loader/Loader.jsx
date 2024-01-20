// Three
import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <h2 id="loading">{progress.toFixed()}%</h2>
    </Html>
  );
}

export default Loader;
