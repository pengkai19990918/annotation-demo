import { useCallback, useRef } from 'react';
import { Tool } from 'react-paper-bindings';
import { usePaper } from '../context';
import { PaperKeyEvent, PaperMouseEvent } from './data';
import { ToolName } from './types';
import {
  StopMouseEvents,
  isMouseLeft,
  isMouseRight,
  useMouseWheel,
} from './utils';
import { createItem, defaultProps } from './utils/item';
import _ from 'lodash';

const NAME = ToolName.Line;


/**
 * @description 线段工具
 * */
export const Line = () => {
  const [state, dispatch] = usePaper();
  const path = useRef<paper.Path>();
  const currentPathLine = useRef<paper.Path>();
  const currentCircles = useRef<paper.Path.Circle[]>([]);

  useMouseWheel(NAME, (newZoom) => {
    if (currentCircles.current.length > 0) {
      // 缩放锚点 保持锚点大小不变（视觉大小）
      currentCircles.current.forEach((circle) => {
        circle.scale(1 / newZoom);
      });
    }
  });

  /**
   * @description 删除线段最后点与鼠标坐标之间的连线
   */
  const removeCurrentPathLine = () => {
    if (currentPathLine.current) {
      currentPathLine.current.remove();
      currentPathLine.current = undefined;
    }
  };

  /**
   * @description 删除线段
   */
  const removePath = () => {
    if (path.current) {
      path.current.remove();
      path.current = undefined;
    }
  };

  /**
   * @description 删除线段锚点
   */
  const removeCurrentCircles = () => {
    if (currentCircles.current.length > 0) {
      currentCircles.current.forEach((circle) => {
        circle.remove();
      });
      currentCircles.current.length = 0;
    }
  };

  /**
   * @description 线段路径
   * @param segments
   * @param itemProps
   * @returns Path | undefined
   */
  const createPath = (segments: paper.Point[], itemProps = {}) => {
    if (state.scope) {
      return new state.scope.Path({
        insert: true,
        ...defaultProps,
        ...itemProps,
        segments,
      });
    }
  }

  /**
   * @description 鼠标坐标与最后点坐标之间的虚线
   * @param segments
   * @param itemProps
   * @returns Path | undefined
   */
  const createCurrentPathLine = (segments: [paper.Point, paper.Point], itemProps = {}) => {
    if (state.scope) {
      return new state.scope.Path({
        insert: true,
        ...defaultProps,
        ...itemProps,
        segments
      });
    }
  }

  /**
   * @description 创建线段锚点
   * @param center
   * @param itemProps
   * @returns Circle | undefined
   * */
  const createCircle = (center: paper.Point, itemProps = {
    radius: 5,
  }) => {
    if (state.scope) {
      const inputRadius = itemProps.radius / state.scope.view.zoom;
      return new state.scope.Path.Circle({
        insert: true,
        ...defaultProps,
        ...itemProps,
        radius: inputRadius,
        center
      });
    }
  }

  /**
   * @description 保存多边形数据
   */
  const savePath = () => {
    if (path.current) {
      path.current.closed = false;

      if (state.image) {
        // path.current.simplify(10);        
        dispatch({
          type: 'addItem',
          item: createItem(NAME as any, {
            segments: _.map(path.current.segments, (segment) => {
              return [segment.point.x, segment.point.y]
            }),
          }),
        });
      }
      removePath();
      removeCurrentPathLine();
      removeCurrentCircles();
    }
  }

  const handleMouseDown = useCallback(
    (e: PaperMouseEvent) => {
      const { event } = e;

      if (state.selection !== null) {
        dispatch({ type: 'setSelection', selection: undefined });
      }

      StopMouseEvents(event);

      if (isMouseLeft(event)) {
        if (state.scope) {

          if (!path.current) {
            path.current = createPath([e.point]);
            const currentCircle =  createCircle(e.point);

            if (currentCircle) {
              currentCircles.current.push(currentCircle);
            }

          } else {
            path.current.add(e.point);
            const currentCircle =  createCircle(e.point);

            if (currentCircle) {
              currentCircles.current.push(currentCircle);
            }
          }
        }
      } else if (isMouseRight(event)) {
        if (path.current && state.scope) {

          if (path.current.segments.length === 1) {
            removePath();
            removeCurrentPathLine();
            removeCurrentCircles();
          } else if (path.current.segments.length > 1) {
            // 删除最后一个点
            path.current.lastSegment.remove();
            currentCircles.current.pop()?.remove();
            removeCurrentPathLine();
            currentPathLine.current = createCurrentPathLine([path.current.lastSegment.point, e.point]);
          }
        }
      }
    },
    [dispatch, state.selection, state.scope],
  );

  const handleMouseMove = useCallback(
    (event: paper.ToolEvent) => {
      if (state.scope && path.current) {
        removeCurrentPathLine();
        currentPathLine.current = createCurrentPathLine([path.current.lastSegment.point, event.point]);
      }
    },
    [state.scope],
  );

  const handleMouseDrag = useCallback(() => {}, [state.scope]);

  const handleMouseUp = useCallback(() => {}, [dispatch, state.image]);

  const handleKeyDown = useCallback(
    (e: PaperKeyEvent) => {
      const { event } = e;
    
      switch (event.key) {
        case 'n':
          savePath();
          break;
        case 'Escape':
          removePath();
          removeCurrentPathLine();
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