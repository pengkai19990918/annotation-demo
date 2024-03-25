import { useCallback, useRef } from 'react';
import _ from 'lodash';
import { Tool } from 'react-paper-bindings';
import { usePaper } from '../context';
import { ToolName } from './types';
import { useMouseWheel } from './utils';
import { TItemType } from '@/components/Paper/enums';

interface TBaseItem extends paper.Item {
  itemType?: string;
  props?: any;
  type?: string;
  segments?: any;
}

type TNowItem = {
  item: TBaseItem,
}


const NAME = ToolName.Select;

export const Select = () => {
  const [state, dispatch] = usePaper();
  const item = useRef<paper.Item & { props?: any; segments?: any }>();
  const point = useRef<paper.Point>();
  const changed = useRef<boolean>(false);
  const hoverItem = useRef<TBaseItem>();
  const selectItem = useRef<TBaseItem>();

  useMouseWheel(NAME);


  /**
   * @description 鼠标悬停
   * @param hitItem
   * @returns void
   * */
  const itemHover = (hitItem: TBaseItem | undefined) => {
    if (hitItem) {

      if (hoverItem.current && hoverItem.current.props.id !== hitItem.props.id) {
        const anchors = hoverItem.current.parent.getItems({
          itemType: TItemType.ANCHOR,
        });

        _.forEach(anchors, (anchor) => {
          anchor.visible = false;
        });
      }

      hoverItem.current = hitItem;

      if (hitItem.parent.className === TItemType.GROUP) {
        const anchors = hitItem.parent.getItems({
          itemType: TItemType.ANCHOR,
        });

        _.forEach(anchors, (anchor) => {
          anchor.visible = true;
        });
      }

    } else {

      if (hoverItem.current && hoverItem.current.props.id !== state.selection) {
        const anchors = hoverItem.current.parent.getItems({
          itemType: TItemType.ANCHOR,
        });

        _.forEach(anchors, (anchor) => {
          anchor.visible = false;
        });
        hoverItem.current = undefined;
      }
    }
  };


  /**
   * @description 根据当前的hit item 获取需要选中的item
   * @param hit
   * @returns item
   * */
  const getCurrentItem = (hit: paper.HitResult & TNowItem) => {
    if (hit && hit.item) {

      if (hit.item.itemType === TItemType.ANCHOR) {
        const hitItem = hit.item.parent.getItem({
          itemType: TItemType.PATH,
        });
        if (hitItem) {
          return hitItem;
        }
      } else if (hit.item.itemType === TItemType.PATH) {
        return hit.item;
      }

      return;
    }
  };

  /**
   * @description 修改矩形锚点位置
   * @param options
   * */
  const changeRectangle = (options: {
    currentItem: TBaseItem,
    index: number,
    point: paper.Point
  }) => {
    const { currentItem, index, point } = options;

    // 根据某个锚点的位置修改其他锚点的位置
    if (index === 0) {
      currentItem.segments[1].point.y = point.y;
      currentItem.segments[2].point.x = point.x;

      currentItem.parent.getItem({
        itemType: TItemType.ANCHOR,
        data: { index: 1 },
      }).position.set(currentItem.segments[1].point);

      currentItem.parent.getItem({
        itemType: TItemType.ANCHOR,
        data: { index: 2 },
      }).position.set(currentItem.segments[2].point);

    } else if (index === 1) {
      currentItem.segments[0].point.y = point.y;
      currentItem.segments[2].point.x = point.x;

      currentItem.parent.getItem({
        itemType: TItemType.ANCHOR,
        data: { index: 0 },
      }).position.set(currentItem.segments[0].point);

      currentItem.parent.getItem({
        itemType: TItemType.ANCHOR,
        data: { index: 2 },
      }).position.set(currentItem.segments[2].point);

    } else if (index === 2) {
      currentItem.segments[1].point.x = point.x;
      currentItem.segments[3].point.y = point.y;

      currentItem.parent.getItem({
        itemType: TItemType.ANCHOR,
        data: { index: 1 },
      }).position.set(currentItem.segments[1].point);

      currentItem.parent.getItem({
        itemType: TItemType.ANCHOR,
        data: { index: 3 },
      }).position.set(currentItem.segments[3].point);

    } else if (index === 3) {
      currentItem.segments[0].point.x = point.x;
      currentItem.segments[2].point.y = point.y;

      currentItem.parent.getItem({
        itemType: TItemType.ANCHOR,
        data: { index: 0 },
      }).position.set(currentItem.segments[0].point);

      currentItem.parent.getItem({
        itemType: TItemType.ANCHOR,
        data: { index: 2 },
      }).position.set(currentItem.segments[2].point);
    }
    currentItem.segments[index].point.set(point);
  }


  /**
   * @description 根据item类型修改item
   * @param options
   * */
  const changeItem = (options: {
    currentItem: TBaseItem,
    index: number,
    point: paper.Point
  }) => {
    const { currentItem, index, point } = options;

    switch (currentItem.props.type) {
      case ToolName.Line:
      case ToolName.Polygon:
        currentItem?.segments[index].point.set(point);
        break;
      case ToolName.Rectangle:
        changeRectangle(options);
        break;
      default:
        break;
    }
  };

  const handleMouseDown = useCallback(
    (event: paper.ToolEvent) => {
      if (state.scope) {
        const hit = state.scope.project.hitTest(event.point, {
          fill: true,
          segments: false,
          stroke: true,
          tolerance: 10 / state.scope.view.zoom,
        });

        if (hit && hit.item) {
          selectItem.current = hit.item;
        } else {
          selectItem.current = undefined;
        }

        const hitItem = getCurrentItem(hit);

        if (hitItem) {
          item.current = hitItem;
          point.current = event.point;
          dispatch({ type: 'setSelection', selection: item.current.props.id });
        } else {
          item.current = undefined;
          point.current = undefined;
          dispatch({ type: 'setSelection', selection: undefined });
        }

      }
    },
    [state.scope, dispatch],
  );

  const handleMouseMove = useCallback((event: paper.ToolEvent) => {
    if (state.scope) {
      const hit = state.scope.project.hitTest(event.point, {
        fill: true,
        segments: false,
        stroke: true,
        tolerance: 10 / state.scope.view.zoom,
      });
      const hitItem = getCurrentItem(hit);
      itemHover(hitItem);
    }
  }, [state.scope, state.selection, dispatch]);

  const handleMouseDrag = useCallback((event: paper.ToolEvent) => {
    if (selectItem.current && point.current) {

      if (selectItem.current.itemType === TItemType.PATH) {

        selectItem.current.parent.translate(event.point.subtract(point.current));
        changed.current = true;
        point.current = event.point;

      } else if (selectItem.current.itemType === TItemType.ANCHOR) {
        if (!item.current) {
          return;
        }
        const translate = event.point.subtract(point.current);
        selectItem.current.translate(translate);

        changeItem({
          currentItem: item.current,
          index: selectItem.current.data.index,
          point: selectItem.current.position,
        });

        changed.current = true;
        point.current = event.point;
      }

    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (item.current && changed.current) {
      dispatch({
        type: 'updateItem',
        id: item.current.props.id,
        item: {
          segments: _.map(item.current.segments, (segment) => {
            return [segment.point.x, segment.point.y];
          }),
        },
      });
    }
    changed.current = false;
    point.current = undefined;
  }, [dispatch]);

  /*
  const handleKeyDown = useCallback((event: paper.ToolEvent) => {
    if (!item.current) return

    const { key, modifiers: { shift } } = event
    switch (key) {
      case 'delete':
        actions.item.remove(item.current)
        changed.current = false
        item.current = null
        point.current = null
        break
      case 'up':
        item.current.translate(0, shift ? -10 : -1)
        changed.current = true
        break
      case 'down':
        item.current.translate(0, shift ? 10 : 1)
        changed.current = true
        break
      case 'left':
        item.current.translate(shift ? -10 : -1, 0)
        changed.current = true
        break
      case 'right':
        item.current.translate(shift ? 10 : 1, 0)
        changed.current = true
        break
      default:
        break
    }
  }, []);

  const handleKeyUp = useCallback((event: paper.ToolEvent) => {
    if (!item.current || !changed.current || event.key === 'shift') return

    // debounce history update
    // when user preses some key multiple times
    // we don't immediately record history change
    // because we would end up with many small changes

    const { current } = item
    const { pathData } = current

    setTimeout(() => {
      actions.item.update(current, { pathData })
      changed.current = false
    }, 350)
  }, []);
  */

  return (
    <Tool
      name={NAME}
      active={state.tool === NAME}
      //onKeyUp={handleKeyUp}
      //onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseDrag={handleMouseDrag}
      onMouseUp={handleMouseUp}
    />
  );
};
