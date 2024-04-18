import useMeasure from 'react-use-measure';
import { Provider } from './context';
import { Image as typeImg } from './image';
import { Canvas } from './PaperCanvas';
import Toolbar from './Toolbar';
import './index.less';
import { useContext } from 'react';
import { PlayerContext } from '@/components/Player/context';

type Props = {
  image: typeImg;
};

export const Paper = ({ image }: Props) => {
  const [ref, { width, height }] = useMeasure({ debounce: 150 });

  const playerContext = useContext(PlayerContext);

  const url = playerContext?.data ? URL.createObjectURL(playerContext?.data || new Blob()) : '';

  return (
    <Provider>
      <div>
        <Toolbar />
      </div>
      <div className="paper" ref={ref}>
        {width > 0 && height > 0 && (
          <Canvas image={{
            ...image,
            url,
          }} width={width} height={height} />
        )}
      </div>
    </Provider>
  );
};
