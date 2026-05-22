import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLearningOSStore } from '../../store/useLearningOSStore';

const Branch = ({ position, rotation, length, color }) => (
  <mesh position={position} rotation={rotation}>
    <cylinderGeometry args={[0.055, 0.13, length, 16]} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.18} roughness={0.45} />
  </mesh>
);

const Fruit = ({ position, color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.7 + position[0]) * 0.05;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.13, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
    </mesh>
  );
};

const LivingTreeMesh = () => {
  const { tree, subjects } = useLearningOSStore();
  const group = useRef();
  const stageScale = 0.72 + tree.stage * 0.12;

  useFrame(({ clock }) => {
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.28) * 0.18;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.035;
  });

  return (
    <group ref={group} scale={stageScale}>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.32, 0.48, 2.45, 32]} />
        <meshStandardMaterial color="#164e63" emissive="#0891b2" emissiveIntensity={0.32} roughness={0.38} />
      </mesh>
      <mesh position={[0, -2.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.025, 12, 96]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.75} />
      </mesh>
      {subjects.map((subject, index) => {
        const angle = (index / subjects.length) * Math.PI * 2;
        const x = Math.cos(angle) * 0.72;
        const z = Math.sin(angle) * 0.72;
        return (
          <group key={subject.id}>
            <Branch
              position={[x * 0.72, 0.16 + (index % 3) * 0.28, z * 0.72]}
              rotation={[1.1, 0, -angle + Math.PI / 5]}
              length={1.8 + subject.mastery / 110}
              color={subject.color}
            />
            <Fruit position={[x * 1.8, 0.86 + (index % 3) * 0.32, z * 1.8]} color={subject.color} />
          </group>
        );
      })}
      {Array.from({ length: tree.focusSessions / 3 }, (_, index) => (
        <mesh key={index} position={[
          Math.sin(index * 2.4) * 2.2,
          -0.4 + (index % 8) * 0.34,
          Math.cos(index * 1.8) * 1.7,
        ]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#e0f2fe" transparent opacity={0.68} />
        </mesh>
      ))}
    </group>
  );
};

const TreeScene = () => (
  <Canvas camera={{ position: [0, 0.5, 5.6], fov: 48 }}>
    <ambientLight intensity={0.8} />
    <pointLight position={[2.5, 4, 3]} intensity={2.2} color="#67e8f9" />
    <pointLight position={[-2, 1, 2]} intensity={1.6} color="#c084fc" />
    <fog attach="fog" args={['#020617', 5.2, 9]} />
    <LivingTreeMesh />
  </Canvas>
);

export default TreeScene;
