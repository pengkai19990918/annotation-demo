
export enum NODE_TYPE {
  ROOT = 'ROOT',
  LEAF = 'LEAF',
  MIDDLE = 'MIDDLE'
}

type NodeTypeMap = Record<NODE_TYPE, {
  code: number;
  name: string;
  className: string;
}>

export const NODE_TYPE_MAP: NodeTypeMap  = {
  [NODE_TYPE.ROOT]: {
    code: 0,
    name: 'ROOT',
    className: 'rootNode'
  },
  [NODE_TYPE.MIDDLE]: {
    code: 1,
    name: 'MIDDLE',
    className: 'middleNode'
  },
  [NODE_TYPE.LEAF]: {
    code: 2,
    name: 'LEAF',
    className: 'leafNode'
  }
}


