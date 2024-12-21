import React from "react";
import * as THREE from "three";
import TapeCanvas from "./TapeCanvas/TapeCanvas";
import { Canvas } from "@react-three/fiber";

export default function ProjectDENIS() {
  return (
    <div>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <TapeCanvas></TapeCanvas>
      </Canvas>
    </div>
  );
}
