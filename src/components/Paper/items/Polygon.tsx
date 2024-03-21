import _ from 'lodash';
import { Circle, Group, Path as PaperPath } from 'react-paper-bindings';
import { Context } from '@/components/Paper/context';
import { useContext, useState, useCallback } from 'react';
import tinycolor from "tinycolor2";

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
  const { color = '#00ff00' } = props;

  const [circleVisible, setCircleVisible] = useState(false);


  const handleCircleVisible = (value: boolean) => {
    setCircleVisible(value);
  }

  const handleMouseEnter = useCallback(() => {
    // if (document.body) {
    //   document.body.style.cursor = 'pointer';
    // }
    handleCircleVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // if (document.body) {
    //   document.body.style.cursor = 'auto';
    // }
    handleCircleVisible(false);
  }, []);

  const value = useContext(Context);
  const [state, dispatch] = value;



  return (
    <Group>
      <PaperPath
        {...props}
        fillColor={tinycolor(color).setAlpha(0.01).toRgbString()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {_.map(props.segments, (segment, index) => {
        return (
          <Circle
            key={index}
            center={segment}
            radius={5 / (state.scope?.view.zoom || 1)}
            fillColor={color}
            visible={circleVisible}
          />
        );
      })}
    </Group>

  );
};
