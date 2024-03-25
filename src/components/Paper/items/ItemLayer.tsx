import { Layer } from 'react-paper-bindings';
import _ from 'lodash';
import { usePaper } from '../context';
import { ItemData } from './types';
import { Path } from './Path';
import { ToolName } from '@/components/Paper/tools';
import { Polygon } from '@/components/Paper/items/Polygon';
import { TItemType } from '@/components/Paper/enums';
import { Rectangle } from '@/components/Paper/items/Rectangle';
import { Line } from '@/components/Paper/items/Line';

type Props = {
  items: ItemData[];
};

export const ItemLayer = ({ items }: Props) => {
  const [state,] = usePaper();

  return (
    <Layer
      id={'itemLayer'}
      visible={!!state.image}
      itemType={TItemType.LAYER}
    >
      {_.map(items, (item) => {
        if (item.type === ToolName.Polygon) {
          return (
            <Polygon
              key={item.id}
              {...item}
              closed={true}
            />
          );
        } else if (item.type === ToolName.Rectangle) {
          return (
            <Rectangle
              key={item.id}
              {...item}
              closed={true}
            />
          )
        } else if (item.type === ToolName.Line) {
          return (
            <Line
              key={item.id}
              {...item}
              closed={false}
            />
          )
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
