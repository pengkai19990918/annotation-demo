import { useCallback, useRef } from 'react';
import { Tool } from 'react-paper-bindings';
import { usePaper } from '../context';
import { PaperKeyEvent, PaperMouseEvent } from './data';
import { ToolName } from './types';
import { isMouseLeft, isMouseRight, StopMouseEvents, useMouseWheel } from './utils';
import { createItem } from './utils/item';
import { useCrossLine } from '@/components/Paper/tools/hooks/useCrossLine';

const NAME = ToolName.Point;

/**
 * @description 打点工具
 * */
export const Point = () => {
  const [state, dispatch] = usePaper();
  const path = useRef<paper.Path>();

  const { drawCrossLine } = useCrossLine();

  useMouseWheel( NAME,(newZoom, center) => {
    drawCrossLine(center);
  });

  /**
   * @description 删除点
   */
  const removePath = () => {
    if (path.current) {
      path.current.remove();
      path.current = undefined;
    }
  };

  /**
   * @description 保存点数据
   */
  const savePath = (e: PaperMouseEvent) => {
    if (state.image) {
      dispatch({
        type: 'addItem',
        item: createItem(NAME as any, {
          segments: [[e.point.x, e.point.y]],
        }),
      });
    }
  };

  const handleMouseDown = useCallback(
    (e: PaperMouseEvent) => {
      const { event } = e;

      if (state.selection !== null) {
        dispatch({ type: 'setSelection', selection: undefined });
      }

      StopMouseEvents(event);

      if (isMouseLeft(event)) {
        if (state.scope) {
          savePath(e);
        }
      } else if (isMouseRight(event)) {
      }
    },
    [dispatch, state.selection, state.scope, state.image],
  );

  const handleMouseMove = useCallback(
    (event: paper.ToolEvent) => {
      drawCrossLine(event.point);
    },
    [state.scope, state.image],
  );

  const handleMouseDrag = useCallback((event: paper.ToolEvent) => {
      drawCrossLine(event.point);
    },
    [state.scope, state.image]);

  const handleMouseUp = useCallback(() => {
  }, [dispatch, state.image]);

  const handleKeyDown = useCallback(
    (e: PaperKeyEvent) => {
      const { event } = e;

      switch (event.key) {
        case 'n':
          break;
        case 'Escape':
          removePath();
          break;

        default:
          break;
      }
    },
    [state.scope, state.image, dispatch],
  );

  return (
    <Tool
      name={NAME}
      active={state.tool === NAME}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseDrag={handleMouseDrag}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
    />
  );
};
