import _ from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { usePaper } from "../../context";
import { defaultProps } from "../utils";
import { useCrossLine } from "./useCrossLine";
import { useMouseWheel } from "./useMouseWheel";
import { ToolName } from '@/components/Paper/tools';


export function useRectangle() {

  
  const [state, dispatch] = usePaper();
  const path = useRef<paper.Path>();

  const { drawCrossLine } = useCrossLine();

  useMouseWheel(ToolName.Rectangle,(newZoom, center) => {
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
      return path.current;

      // dispatch({
      //   type: 'addItem',
      //   item: createItem(NAME as any, {
      //     color: path.current.strokeColor?.toCSS(true),
      //     segments: _.map(path.current.segments, (segment) => {
      //       return [segment.point.x, segment.point.y];
      //     }),
      //   }),
      // });
    }
  }, [dispatch, state.image, state.tool]);
  

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseDrag,
    handleMouseUp,
  }
}