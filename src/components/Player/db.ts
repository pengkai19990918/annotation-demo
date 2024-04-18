// db.ts
import Dexie, { Table } from 'dexie';

export interface File {
  url: string;
  data: any;
}

export class CacheDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  file!: Table<File>;

  constructor() {
    super('annotation-db');
    this.version(1).stores({
      file: 'url, data' // Primary key and indexed props
    });
  }
}

export const db = new CacheDexie();