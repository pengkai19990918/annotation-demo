type BaseEvent = paper.ToolEvent;

export interface PaperMouseEvent extends BaseEvent {
  event: MouseEvent;
  tool: any;
}

export interface PaperKeyEvent extends BaseEvent {
  event: KeyboardEvent;
  tool: any;
}
