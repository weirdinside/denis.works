import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Image({ image }: { image: string }) {
  const texture = useLoader(THREE.TextureLoader, image);
  return (
    <mesh>
      <planeGeometry attach="geometry" args={[7, 6]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
