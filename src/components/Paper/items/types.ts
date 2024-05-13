export enum ItemName {
  Circle = 'Circle',
  Path = 'Path',
  Pen = 'Pen',
  Rectangle = 'Rectangle',
  Polygon = 'Polygon',
  LineStrip = 'LineStrip',
  Point = 'Point',
}

export type Item = {
  id: string;
  type: string;
  color?: string;
  label?: string;
  segments?: number[][];
};

export type ItemData = Partial<{
  id: string;
  type: string;
  color: string;
  label: string;
  segments: number[][];
}>;
