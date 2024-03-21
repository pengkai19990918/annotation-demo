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
  segments?: number[][];
};

export type ItemData = {
  id?: string;
  type?: string;
  segments?: number[][];
};
