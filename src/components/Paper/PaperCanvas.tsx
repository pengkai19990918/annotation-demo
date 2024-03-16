import { forwardRef, useCallback, useContext } from 'react';
import { CanvasProps, Canvas as PaperCanvas, View } from 'react-paper-bindings';

import _ from 'lodash';
import { Context } from './context';
import { Image, ImageLayer } from './image';
import { Tool } from './tools';

type Props = CanvasProps & {
  image: Image;
  width: number;
  height: number;
};

export const Canvas = forwardRef<HTMLCanvasElement | null, Props>(
  function Canvas({ image, width, height, ...other }, forwardedRef) {
    const value = useContext(Context);
    const [, dispatch] = value;

    const handleScopeReady = useCallback(
      (scope: paper.PaperScope) => dispatch({ type: 'setScope', scope: scope }),
      [dispatch],
    );

    return (
      <PaperCanvas
        {...other}
        ref={forwardedRef}
        width={width}
        height={height}
        onScopeReady={handleScopeReady}
      >
        <Context.Provider value={value}>
          <View>
            <ImageLayer image={image} />
          </View>
          {_.keys(Tool).map((tool: any) => {
            // @ts-ignore
            const ToolComponent = Tool[tool];
            return <ToolComponent key={tool} />;
          })}
        </Context.Provider>
      </PaperCanvas>
    );
  },
);
