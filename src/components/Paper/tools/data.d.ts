type BaseEvent = paper.ToolEvent;

export interface PaperEvent extends BaseEvent {
  event: MouseEvent | TouchEvent;
  tool: any;
}
