import _ from 'lodash';
import { Circle, Group, Path as PaperPath } from 'react-paper-bindings';
import { Context } from '@/components/Paper/context';
import { useContext, useCallback } from 'react';
import tinycolor from "tinycolor2";
import { TItemType } from '@/components/Paper/enums';

type Props = {
  id?: string;
  active?: boolean;
  pathData?: string;
  selected?: boolean;
  strokeColor?: string;
  strokeScaling?: boolean;
  strokeWidth?: number;
  type?: string;
  segments?: number[][];
  closed?: boolean;
  color?: string;
  // [key in string]: any;
};

export const Point = (props: Props) => {

  const handleMouseEnter = useCallback(() => {
    // if (document.body) {
    //   document.body.style.cursor = 'pointer';
    // }
  }, []);

  const handleMouseLeave = useCallback(() => {
    // if (document.body) {
    //   document.body.style.cursor = 'auto';
    // }
  }, []);

  const value = useContext(Context);
  const [state, dispatch] = value;

  return (
    <Group
      itemType={TItemType.GROUP}
    >
      <Circle
        position={props.segments?.[0] || []}
        {..._.omit(props, ['segments'])}
        radius={5 / (state.scope?.view.zoom || 1)}
        fillColor={tinycolor('#00ff00').setAlpha(1).toRgbString()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        itemType={TItemType.PATH}
      />
    </Group>

  );
};
