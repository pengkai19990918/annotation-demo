import { Layer } from 'react-paper-bindings';

import _ from 'lodash';
import { usePaper } from '../context';
import { ItemData } from './types';
import { Path } from './Path';

type Props = {
  items: ItemData[];
};

export const ItemLayer = ({ items }: Props) => {
  const [state, dispatch] = usePaper();

  return (
    <Layer id={'itemLayer'} visible={!!state.image}>
      {_.map(items, (item) => {
        return (
          <Path
            key={item.id}
            {...item}
            closed={true}
          />
        );
      })}
    </Layer>
  );
};
