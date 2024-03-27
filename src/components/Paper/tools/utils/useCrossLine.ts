import { usePaper } from '@/components/Paper/context';
import { useCallback, useEffect, useRef } from 'react';
import { defaultProps } from '@/components/Paper/tools/utils/item';


export const useCrossLine = () => {
  const [state, dispatch] = usePaper();
  const crossLineV = useRef<paper.Path.Line>();
  const crossLineH = useRef<paper.Path.Line>();

  const removeCrossLine = useCallback(() => {
    if (crossLineV.current) {
      crossLineV.current.remove();
      crossLineV.current = undefined;
    }
    if (crossLineH.current) {
      crossLineH.current.remove();
      crossLineH.current = undefined;
    }
  }, []);

  const drawCrossLine = useCallback((point?: paper.Point) => {

    if (!state.scope) {
      return;
    }

    if (!point) {
      if (crossLineV.current) {
        crossLineV.current.segments[0].point.y = state.scope.view.bounds.top;
        crossLineV.current.segments[1].point.y = state.scope.view.bounds.bottom;
      }
      if (crossLineH.current) {
        crossLineH.current.segments[0].point.x = state.scope.view.bounds.left;
        crossLineH.current.segments[1].point.x = state.scope.view.bounds.right;
      }
      return;
    }

    removeCrossLine();

    crossLineV.current = new state.scope.Path.Line({
      ...defaultProps,
      insert: true,
      from: [point.x, state.scope.view.bounds.top],
      to: [point.x, state.scope.view.bounds.bottom],
      strokeColor: 'red',
      dashArray: [5, 5],
    });

    crossLineH.current = new state.scope.Path.Line({
      ...defaultProps,
      insert: true,
      from: [state.scope.view.bounds.left, point.y],
      to: [state.scope.view.bounds.right, point.y],
      strokeColor: 'red',
      dashArray: [5, 5],
    });
  }, [state.scope]);

  useEffect(() => {
    return () => {
      removeCrossLine();
    };
  }, [state.tool]);

  return {
    drawCrossLine,
    removeCrossLine,
  }
};