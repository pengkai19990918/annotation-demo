import { useCallback } from 'react';
import { Layer, Raster } from 'react-paper-bindings';

import { usePaper } from '../context';
import { fitImage } from './fitImage';
import { Image } from './types';

type Props = {
  image: Image;
};

export const ImageLayer = ({ image }: Props) => {
  const [state, dispatch] = usePaper();

  const handleImageLoad = useCallback(
    (raster: paper.Raster) => {

      if (raster && raster.view) {
        raster.fitBounds({
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
        fitImage(raster.view, image);
        dispatch({ type: 'setImage', image });
      }
    },
    [image.url, dispatch],
  );

  return (
    <Layer id={image.id} visible={!!state.image}>
      {image.url && <Raster locked source={image.url} onLoad={handleImageLoad} />}
    </Layer>
  );
};
