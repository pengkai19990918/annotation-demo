import {
  BufferGeometry,
  Color,
  FileLoader,
  Float32BufferAttribute,
  Loader,
  LoadingManager,
  NormalBufferAttributes,
  Object3DEventMap,
  Points,
  PointsMaterial,
} from 'three';

class BINLoader extends Loader {
  constructor(manager: LoadingManager | undefined = undefined) {
    super(manager);
  }

  load(
    url: string,
    onLoad?: (
      data: Points<
        BufferGeometry<NormalBufferAttributes>,
        PointsMaterial,
        Object3DEventMap
      >,
    ) => void,
    onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined,
    onError?: ((err: unknown) => void) | undefined,
  ) {
    const scope = this;

    const loader = new FileLoader(scope.manager);
    loader.setPath(scope.path);
    loader.setResponseType('arraybuffer');
    loader.setRequestHeader(scope.requestHeader);
    loader.setWithCredentials(scope.withCredentials);
    loader.load(
      url,
      function (data) {
        console.log(data.toString());

        // console.log(new DataView(data).getFloat16(0));
        try {
          // 解析.bin 点云的二进制数据
          const reader = new FileReader();
          reader.onload = function (event) {

            function parseBinaryData(arrayBuffer: ArrayBuffer) {
              console.log(arrayBuffer);
              
              const dataView = new DataView(arrayBuffer);
              const pointCount = arrayBuffer.byteLength / (4 * 3); // 假设每个点有3个Float32坐标
              const points = [];
          
              // for (let i = 0; i < pointCount; i++) {
                  
              //     const x = dataView.getFloat32(i * 12, true); // true 表示小端字节序
              //     const y = dataView.getFloat32(i * 12 + 4, true);
              //     const z = dataView.getFloat32(i * 12 + 8, true);
              //     points.push({x, y, z});
              // }
          
              console.log(points);
          }

          parseBinaryData(event.target?.result as ArrayBuffer);


            const data = new Float32Array(
              event.target?.result as ArrayBufferLike,
            );
            onLoad?.(scope.parse(data));
          };
          reader.readAsArrayBuffer(new Blob([data]) as unknown as Blob);
        } catch (e) {
          if (onError) {
            onError(e);
          } else {
            console.error(e);
          }
          scope.manager.itemError(url);
        }
      },
      onProgress,
      onError,
    );
  }

  parse(data: Float32Array) {
    // parse data

    const c = new Color();

    // build geometry

    const geometry = new BufferGeometry();

    if (data.length > 0)
      geometry.setAttribute('position', new Float32BufferAttribute(data, 3));

    geometry.computeBoundingSphere();

    // build material
    const material = new PointsMaterial({ size: 0.005 });
    material.vertexColors = true;
    // build point cloud

    return new Points(geometry, material);
  }
}

export { BINLoader };
