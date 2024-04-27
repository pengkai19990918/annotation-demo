import { PaperProvider } from '@/components/PointCloudCanvas/context/PointCloudProvider';
import { Points, Stats } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { BINLoader } from './Loader/BINLoader';
import './index.less';
import Controls from './tools/Controls';

const PointCloudCanvas = () => {
  // const pcd = useLoader(PCDLoader, './data/pcd/000000.pcd');
  const pcd: THREE.Points = useLoader(
    BINLoader,
    // 'https://anno.s3.bitiful.net/pcd/070070.bin',
    './data/bin/000000.bin',
  );

  return (
    <PaperProvider>
      <Canvas
        className={'three'}
        id="canvas3d"
        // camera={{
        //   position: [0, 0, 50],
        //   up: new Vector3(0, 0, 1),
        //   near: -1000,
        //   far: 1000,
        // }}
        // orthographic={true}
        // gl={(canvas) => {
        //   const webgl1Render = new WebGL1Renderer({ canvas, antialias: true });
        //   webgl1Render.shadowMap.autoUpdate = false;
        //   return webgl1Render;
        // }}
        dpr={2}
        onCreated={(state) => {
          console.log(state);
        }}
      >
        <color attach="background" args={['#000000']} />
        <axesHelper />
        <Controls />
        {/* render pcd */}
        <Points
          positions={pcd.geometry.attributes.position.array as Float32Array}
        >
          <pointsMaterial color={new THREE.Color(0x3bff11)} size={0.01} />
        </Points>
        <Stats />
      </Canvas>
    </PaperProvider>
  );
};

export default PointCloudCanvas;
