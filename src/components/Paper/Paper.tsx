import { PlayerContext } from '@/components/Player/context';
import { useContext } from 'react';
import useMeasure from 'react-use-measure';
import { Canvas } from './PaperCanvas';
import Toolbar from './Toolbar';
import { Provider } from './context';
import { Image as typeImg } from './image';
import './index.less';

type Props = {
  image: typeImg;
};

export const Paper = ({ image }: Props) => {
  const [ref, { width, height }] = useMeasure({ debounce: 150 });
  console.log(height);

  const playerContext = useContext(PlayerContext);

  const url = playerContext?.data
    ? URL.createObjectURL(playerContext?.data || new Blob())
    : '';

  return (
    <Provider>
      <div className="h-full flex flex-col">
        <div className="">
          <Toolbar />
        </div>
        <div className="flex-1" ref={ref}>
          <div className="paper">
            {width > 0 && height > 0 && (
              <Canvas
                image={{
                  ...image,
                  url,
                }}
                width={width}
                height={height}
              />
            )}
          </div>
        </div>
      </div>
    </Provider>
  );
};
