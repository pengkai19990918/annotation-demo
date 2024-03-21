import _ from 'lodash';
import { useCallback, useRef } from 'react';
import { Tool } from 'react-paper-bindings';
import { usePaper } from '../context';
import { ToolName } from './types';
import { useMouseWheel } from './utils';
import { createItem, defaultProps } from './utils/item';

const NAME = ToolName.Rectangle;

export const Rectangle = () => {
  const [state, dispatch] = usePaper();
  const path = useRef<paper.Path>();

  useMouseWheel(NAME);

  const handleMouseDown = useCallback(() => {
    if (state.selection !== null) {
      dispatch({ type: 'setSelection', selection: undefined });
    }
  }, [dispatch, state.selection]);

  const handleMouseDrag = useCallback(
    (event: paper.ToolEvent) => {
      if (state.scope) {
        if (!path.current) {
          path.current = new state.scope.Path({
            ...defaultProps,
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
      // path.current.simplify(10);
      dispatch({
        type: 'addItem',
        item: createItem(NAME as any, {
          segments: _.map(path.current.segments, (segment) => {
            return [segment.point.x, segment.point.y];
          }),
        }),
      });
      path.current.remove();
      path.current = undefined;
    }
  }, [dispatch, state.image]);

  return (
    <Tool
      name={NAME}
      active={state.tool === NAME}
      onMouseDown={handleMouseDown}
      onMouseDrag={handleMouseDrag}
      onMouseUp={handleMouseUp}
    />
  );
};
