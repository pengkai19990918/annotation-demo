import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

const Controls: React.FC = () => {

  useFrame((frame) => {
    
  });

  return (
    <OrbitControls
      makeDefault
      enableDamping={false}
      enablePan={true}
      rotateSpeed={0.5}
      mouseButtons={{
        LEFT: -1 as any,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
    />
  );
};

export default Controls;
