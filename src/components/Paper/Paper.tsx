import useMeasure from 'react-use-measure';

import { Provider } from './context';
import { Image } from './image';
import { Canvas } from './PaperCanvas';

import styles from './index.less';
import Toolbar from './Toolbar';

type Props = {
  image: Image;
};

export const Paper = ({ image }: Props) => {
  const [ref, { width, height }] = useMeasure({ debounce: 150 });
  return (
    <Provider>
      <div>
        <Toolbar />
      </div>
      <div className={styles.paper} ref={ref}>
        {width > 0 && height > 0 && (
          <Canvas image={image} width={width} height={height} />
        )}
      </div>
    </Provider>
  );
};
