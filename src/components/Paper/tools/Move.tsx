import { useCallback } from 'react';
import { Tool } from 'react-paper-bindings';
import { usePaper } from '../context';
import { PaperMouseEvent } from './data';
import { ToolName } from './types';
import { useMouseWheel, usePan, usePinch } from './utils';

const NAME = ToolName.Move;

export const Move = () => {
  const [state] = usePaper();

  const pinch = usePinch();
  const pan = usePan();

  useMouseWheel(NAME);

  const handleMouseDown = useCallback(
    (/*event: paper.ToolEvent*/) => {
      /*
    if (doubleTap(event.event)) {
      // TODO reset image
    }
    */
    },
    [],
  );

  const handleMouseDrag = useCallback(
    (event: PaperMouseEvent) => {
      const { event: e } = event;
      if (e instanceof TouchEvent && e.touches.length === 2) {
        pinch.mouseDrag(event);
      } else {
        pan.mouseDrag(event);
      }
    },
    [pan, pinch],
  );

  const handleMouseUp = useCallback(() => {
    pan.mouseUp();
    pinch.mouseUp();
  }, [pan, pinch]);

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
