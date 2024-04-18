import { PaperProvider } from '@/components/PointCloudCanvas/context/PointCloudProvider';
import { Box, OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import './index.less';

const PointCloudCanvas = () => {
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
      >
        <color attach="background" args={['#000000']} />
        <axesHelper />
        <OrbitControls enableDamping={false} enablePan enableRotate enableZoom />
        <Box>
          <meshBasicMaterial wireframe />
        </Box>
        <Stats />
      </Canvas>
    </PaperProvider>
  );
};

export default PointCloudCanvas;
