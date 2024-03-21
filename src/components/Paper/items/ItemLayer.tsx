import { Layer } from 'react-paper-bindings';

import _ from 'lodash';
import { usePaper } from '../context';
import { ItemData } from './types';
import { Path } from './Path';
import { ToolName } from '@/components/Paper/tools';
import { Polygon } from '@/components/Paper/items/Polygon';

type Props = {
  items: ItemData[];
};

export const ItemLayer = ({ items }: Props) => {
  const [state,] = usePaper();

  return (
    <Layer id={'itemLayer'} visible={!!state.image}>
      {_.map(items, (item) => {
        if (item.type === ToolName.Polygon) {
          return (
            <Polygon
              key={item.id}
              {...item}
              closed={true}
            />
          );
        }
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
