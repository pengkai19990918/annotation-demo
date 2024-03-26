import _ from 'lodash';
import { Circle } from './Circle';
import { Delete } from './Delete';
import { Move } from './Move';
import { Pen } from './Pen';
import { Polygon } from './Polygon';
import { Rectangle } from './Rectangle';
import { Select } from './Select';
import { Line } from './Line';
import { Point } from './Point';

export type IPlainObject<T> = Record<string, T>;

// 枚举基类
export interface IEnum {
  code: string | number;
  name: string;
  path?: string;
  color?: string;
  animation?: boolean;
  icon?: JSX.Element; // 带图标
}

export enum ToolName {
  Circle = 'Circle',
  Delete = 'Delete',
  Move = 'Move',
  Pen = 'Pen',
  Select = 'Select',
  Rectangle = 'Rectangle',
  Polygon = 'Polygon',
  Line = 'Line',
  Point = 'Point',
}

export interface IToolNameModel extends IEnum {
  code: ToolName;
}

export const TOOL_TYPE: IPlainObject<IToolNameModel> = {
  [ToolName.Circle]: {
    code: ToolName.Circle,
    name: 'Circle',
  },
  [ToolName.Delete]: {
    code: ToolName.Delete,
    name: 'Delete',
  },
  [ToolName.Move]: {
    code: ToolName.Move,
    name: 'Move',
  },
  [ToolName.Pen]: {
    code: ToolName.Pen,
    name: 'Pen',
  },
  [ToolName.Rectangle]: {
    code: ToolName.Rectangle,
    name: 'Rectangle',
  },
  [ToolName.Select]: {
    code: ToolName.Select,
    name: 'Select',
  },
  [ToolName.Polygon]: {
    code: ToolName.Polygon,
    name: 'Polygon',
  },
  [ToolName.Line]: {
    code: ToolName.Line,
    name: 'Line',
  },
  [ToolName.Point]: {
    code: ToolName.Point,
    name: 'Point',
  },
};

export const TOOL_TYPE_ARR: IToolNameModel[] = _.values(TOOL_TYPE);

export type ToolType =
  | typeof Circle
  | typeof Delete
  | typeof Move
  | typeof Pen
  | typeof Select
  | typeof Rectangle
  | typeof Polygon
  | typeof Line
  | typeof Point;
