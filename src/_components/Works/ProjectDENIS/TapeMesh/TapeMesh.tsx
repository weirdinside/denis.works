import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { dispose } from "@react-three/fiber";

export default function TapeMesh() {
  const meshRef = useRef();

  const url = "/tape_objconverted.glb";

  const { scene } = useGLTF(url);
  useEffect(() => {
    return () => {
      dispose(scene);
      useGLTF.clear(url);
    };
  }, [scene, url]);

  return (
    <primitive ref={meshRef} object={scene}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
    </primitive>
  );
}
