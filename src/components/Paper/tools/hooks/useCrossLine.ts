import { usePaper } from '@/components/Paper/context';
import { defaultProps } from '@/components/Paper/tools/utils/item';
import { useCallback, useEffect, useRef } from 'react';

export const useCrossLine = () => {
  const [state] = usePaper();
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

  const drawCrossLine = useCallback(
    (point: paper.Point) => {
      if (!state.scope) {
        return;
      }

      removeCrossLine();
      crossLineV.current = new state.scope.Path.Line({
        ...defaultProps,
        insert: true,
        locked: true,
        from: [point.x, state.scope.view.bounds.top],
        to: [point.x, state.scope.view.bounds.bottom],
        strokeColor: 'red',
        dashArray: [5, 5],
      });

      crossLineH.current = new state.scope.Path.Line({
        ...defaultProps,
        insert: true,
        locked: true,
        from: [state.scope.view.bounds.left, point.y],
        to: [state.scope.view.bounds.right, point.y],
        strokeColor: 'red',
        dashArray: [5, 5],
      });
    },
    [state.scope],
  );

  useEffect(() => {
    return () => {
      removeCrossLine();
    };
  }, [state.tool]);

  return {
    drawCrossLine,
    removeCrossLine,
  };
};
