import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { CanvasProps, Canvas as PaperCanvas, View } from 'react-paper-bindings';

import _ from 'lodash';
import { Context } from './context';
import { Image, ImageLayer } from './image';
import { ItemLayer } from './items/ItemLayer';
import { Tool } from './tools';

type Props = CanvasProps & {
  image: Image;
  width: number;
  height: number;
};

export type CanvasRef = HTMLCanvasElement | null;

export const Canvas = forwardRef<HTMLCanvasElement | null, Props>(
  function Canvas({ image, width, height, ...other }, forwardedRef) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const value = useContext(Context);
    const [state, dispatch] = value;

    const handleScopeReady = useCallback(
      (scope: paper.PaperScope) => {
        dispatch({ type: 'setScope', scope: scope });
      },
      [dispatch],
    );

    // ref转发 返回 canvasRef
    useImperativeHandle<CanvasRef, CanvasRef>(
      forwardedRef,
      () => canvasRef.current,
    );

    useEffect(() => {
      // 禁用右键菜单
      canvasRef.current?.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });

      return () => {
        canvasRef.current?.removeEventListener('contextmenu', (e) => {
          e.preventDefault();
        });
      };
    }, []);

    return (
      <PaperCanvas
        {...other}
        ref={canvasRef}
        width={width}
        height={height}
        onScopeReady={handleScopeReady}
      >
        <Context.Provider value={value}>
          <View>
            <ImageLayer image={image} />
            <ItemLayer  items={state.data} active={true}/>
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
