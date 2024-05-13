import _ from 'lodash';
import { Circle, Group, Path as PaperPath } from 'react-paper-bindings';
import { Context } from '@/components/Paper/context';
import { useContext, useState, useCallback } from 'react';
import tinycolor from "tinycolor2";
import { TItemType } from '@/components/Paper/enums';
import { anchorDefaultProps, pathDefaultProps } from '../common/constant';

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

export const Polygon = (props: Props) => {
  const { id, color = '#00ff00' } = props;

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

  const currentVisible = state.selection === id;
  
  return (
    <Group
      itemType={TItemType.GROUP}
    >
      <PaperPath
        {...pathDefaultProps}
        {...props}
        strokeColor={color}
        fillColor={tinycolor(color).setAlpha(0.01).toRgbString()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        itemType={TItemType.PATH}
      />

      {_.map(props.segments, (segment, index) => {
        return (
          <Circle
          key={index}
          data={{index}}
          position={segment}
          radius={anchorDefaultProps.radius / (state.scope?.view.zoom || 1)}
          strokeScaling={anchorDefaultProps.strokeScaling}
          strokeColor={color}
          fillColor={tinycolor(color).setAlpha(currentVisible ? 1 : 0.5).toRgbString()}
          visible={currentVisible}
          itemType={TItemType.ANCHOR}
          />
        );
      })}
    </Group>

  );
};
