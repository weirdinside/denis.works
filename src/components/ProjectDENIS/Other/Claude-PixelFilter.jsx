import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

// Custom pixelation effect
class PixelationEffect extends Effect {
  constructor({ intensity = 0.0, resolution = new THREE.Vector2() } = {}) {
    super(
      "PixelationEffect",
      `
      uniform float intensity;
      uniform vec2 u_resolution;
      
      void mainUv(inout vec2 uv) {
        vec2 dxy = intensity * vec2(1.0 / u_resolution.x, 1.0 / u_resolution.y);
        uv = dxy * floor(uv / dxy);
      }
      
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        outputColor = inputColor;
      }
    `,
    );

    this.uniforms.set("intensity", new THREE.Uniform(intensity));
    this.uniforms.set("u_resolution", new THREE.Uniform(resolution));
  }

  update(renderer) {
    this.uniforms
      .get("u_resolution")
      .value.set(renderer.domElement.width, renderer.domElement.height);
  }
}

// Extend R3F with our custom effect
extend({ PixelationEffect });

function Box() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshLambertMaterial color="red" />
    </mesh>
  );
}

function Effects() {
  return (
    <EffectComposer>
      <pixelationEffect intensity={0.01} />
    </EffectComposer>
  );
}

export default function PixelatedScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 70 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <directionalLight position={[1, 0, 1]} intensity={1} />
      <Box />
      <Effects />
    </Canvas>
  );
}
