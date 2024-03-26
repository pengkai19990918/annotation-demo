import { TItemType } from '@/components/Paper/enums';
import { Line } from '@/components/Paper/items/Line';
import { Polygon } from '@/components/Paper/items/Polygon';
import { Rectangle } from '@/components/Paper/items/Rectangle';
import { ToolName } from '@/components/Paper/tools';
import _ from 'lodash';
import { Layer } from 'react-paper-bindings';
import { usePaper } from '../context';
import { Path } from './Path';
import { ItemData } from './types';
import { Point } from '@/components/Paper/items/Point';

type Props = {
  items: ItemData[];
};

export const ItemLayer = ({ items }: Props) => {
  const [state] = usePaper();

  return (
    <Layer id={'itemLayer'} visible={!!state.image} itemType={TItemType.LAYER}>
      {_.map(items, (item) => {
        switch (item.type) {
          case ToolName.Polygon:
            return <Polygon key={item.id} {...item} closed={true} />;
          case ToolName.Rectangle:
            return <Rectangle key={item.id} {...item} closed={true} />;
          case ToolName.Line:
            return <Line key={item.id} {...item} closed={false} />;
          case ToolName.Point:
            return <Point key={item.id} {...item} />;
          default:
            return <Path key={item.id} {...item} closed={true} />;
        }
      })}
    </Layer>
  );
};
