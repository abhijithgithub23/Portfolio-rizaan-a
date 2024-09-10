import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Shapes = (props) => {
  const ref = useRef();
  const [positions] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 5;
    ref.current.rotation.y += delta / 6;
  });

  const shapes = ['box', 'sphere', 'torus', 'cone'];

  return (
    <group ref={ref} {...props}>
      {positions.map((_, i) => {
        const shape = shapes[i % shapes.length]; // Rotate between different shapes
        const position = [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]];
        return (
          <mesh key={i} position={position} scale={[0.1, 0.1, 0.1]}>
            {shape === 'box' && <boxGeometry />}
            {shape === 'sphere' && <sphereGeometry args={[0.1, 32, 32]} />}
            {shape === 'torus' && <torusGeometry args={[0.08, 0.02, 16, 100]} />}
            {shape === 'cone' && <coneGeometry args={[0.1, 0.2, 32]} />}
            <meshPhysicalMaterial
              color={i % 2 === 0 ? '#ff9f80' : '#809fff'} // Coral and light blue
              roughness={0.5}
              metalness={0.8}
              reflectivity={0.9}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const ArtisticBackground = () => {
  return (
    <div className='w-full h-auto absolute blur-[0.5px] inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 2.5] }} shadows>
        <ambientLight intensity={0.5} color='#ffffff' />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#f0f0f0" castShadow />
        <Suspense fallback={null}>
          <Shapes />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ArtisticBackground;
