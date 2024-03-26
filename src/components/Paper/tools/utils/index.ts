export { createItem, defaultProps } from './item';
export { usePan } from './pan';
export { usePinch } from './pinch';
export { useMouseWheel } from './wheel';

type handleMouseButtonReturn =
  | 'MouseLeft'
  | 'MouseMiddle'
  | 'MouseRight'
  | 'Unknown';

// 兼容各主流浏览器的事件处理函数
export function handleMouseButton(event: MouseEvent): handleMouseButtonReturn {
  // 根据不同浏览器获取button值
  const button = event.button;
  // 判断按键
  switch (button) {
    case 0: // 左键
      return 'MouseLeft';
    case 1: // 在某些浏览器中可能是中间键
      return 'MouseMiddle';
    case 2: // 右键
      // 阻止默认的右键菜单弹出（可选）
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false; // 对于IE8及以下版本
      }
      return 'MouseRight';
    default:
      return 'Unknown'; // 其他情况
  }
}

export function isMouseLeft(event: MouseEvent): boolean {
  return handleMouseButton(event) === 'MouseLeft';
}

export function isMouseMiddle(event: MouseEvent): boolean {
  return handleMouseButton(event) === 'MouseMiddle';
}

export function isMouseRight(event: MouseEvent): boolean {
  return handleMouseButton(event) === 'MouseRight';
}

export function StopMouseEvents(event: MouseEvent) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false; // 对于IE8及以下版本
  }

  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true; // 对于IE8及以下版本
  }
}
