import { useCrossLine } from '@/components/Paper/tools/hooks/useCrossLine';
import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { Tool } from 'react-paper-bindings';
import { usePaper } from '../context';
import { ToolName } from './types';
import { useMouseWheel } from './utils';
import { createItem, defaultProps } from './utils/item';

const NAME = ToolName.Rectangle;

export const Rectangle = () => {

  const [state, dispatch] = usePaper();
  const path = useRef<paper.Path>();

  const { drawCrossLine } = useCrossLine();

  useMouseWheel(NAME,(newZoom, center) => {
    drawCrossLine(center);
  });

  const removePath = () => {
    if (path.current) {
      path.current.remove();
      path.current = undefined;
    }
  };

  useEffect(() => {
    removePath();
  }, [state.data]);

  const handleMouseDown = useCallback(() => {
    if (state.selection !== null) {
      dispatch({ type: 'setSelection', selection: undefined });
    }
  }, [dispatch, state.selection]);

  const handleMouseMove = useCallback(
    (event: paper.ToolEvent) => {
      drawCrossLine(event.point);
    },
    [state.scope, state.image],
  );

  const handleMouseDrag = useCallback(
    (event: paper.ToolEvent) => {
      drawCrossLine(event.point);
      if (state.scope) {
        if (!path.current) {
          path.current = new state.scope.Path({
            ...defaultProps,
            strokeColor: state.scope?.Color.random().toCSS(true),
            insert: true,
            closed: true,
            segments: [event.point, event.point, event.point, event.point],
          });
        } else {
          path.current.segments[1].point.x = event.point.x;
          path.current.segments[2].point = event.point;
          path.current.segments[3].point.y = event.point.y;
        }
      }
    },
    [state.scope],
  );

  const handleMouseUp = useCallback(() => {
    if (state.image && path.current) {
      console.log(path.current.parent.children);

      // const intersectsPath = path.current.parent.children.filter((child) => {

      //   return child !== path.current && child.intersects(path.current);
      // });

      // console.log(intersectsPath);
      if (state.tool === NAME) {
        // path.current.remove();
        // path.current = undefined;
        // return [];
      }

      dispatch({
        type: 'addItem',
        item: createItem(NAME as any, {
          color: path.current.strokeColor?.toCSS(true),
          segments: _.map(path.current.segments, (segment) => {
            return [segment.point.x, segment.point.y];
          }),
        }),
      });
    }
  }, [dispatch, state.image, state.tool]);

  return (
    <Tool
      name={NAME}
      active={state.tool === NAME}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseDrag={handleMouseDrag}
      onMouseUp={handleMouseUp}
    />
  );
};
