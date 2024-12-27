import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export default function TapeMesh(props: any) {
  const meshRef = useRef();

  const { nodes } = useGLTF("/tape_objconverted.glb");

  return (
    <primitive {...props} ref={meshRef} object={nodes.Top}>
      <boxGeometry args={[1, 1, 1]} />
    </primitive>
  );
}
