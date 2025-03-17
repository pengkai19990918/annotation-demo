import {
  BufferGeometry,
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
        try {
          // 解析.bin 点云的二进制数据
          const reader = new FileReader();
          reader.onload = function (event) {
            function parseBinaryData(arrayBuffer: ArrayBuffer) {
              const dataView = new DataView(arrayBuffer);

              // 假设每个点有 x, y, z 和 intensity 四个浮点数
              const numPoints =
                arrayBuffer.byteLength / (4 * Float32Array.BYTES_PER_ELEMENT);
              const points = [];
              for (let i = 0; i < numPoints; i++) {
                const x = dataView.getFloat32(
                  i * 4 * Float32Array.BYTES_PER_ELEMENT,
                  true,
                );
                const y = dataView.getFloat32(
                  i * 4 * Float32Array.BYTES_PER_ELEMENT + 4,
                  true,
                );
                const z = dataView.getFloat32(
                  i * 4 * Float32Array.BYTES_PER_ELEMENT + 8,
                  true,
                );
                // 点云强度
                // const intensity = dataView.getFloat32(
                //   i * 4 * Float32Array.BYTES_PER_ELEMENT + 12,
                //   true,
                // );
                // points.push({ x, y, z, intensity });
                points.push(x, y, z,);
              }

              return points;
            }

            const data = new Float32Array(parseBinaryData(event.target?.result as ArrayBuffer));
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
