import * as fs from "fs";
import { KeyStore } from "./key-store";
import { ValueStore } from "./value-store";
// Buffer [length, num_items, item#1[key, value], item#2[key, value]]
/**
 *  Key store
 *     0 1 2 3 4 5 6 7 8
 * 0 [ length | num-items ]
 * 1 [ size|utf-8 string, size|address ]
 * 2 [                   ]
 *
 *  Value store
 *     0 1 2 3 4 5 6 7 8
 * 0 [ length | num-items ]
 * 1 [ data, data, data   ]
 * 2 [ data, data, data   ]
 *
 */

export class MemoryCache {
  keyStore: KeyStore;
  valueStore: ValueStore;

  constructor([
    keyBuffer = undefined,
    valueBuffer = undefined
  ]: SharedArrayBuffer[]) {
    this.keyStore = new KeyStore(keyBuffer);
    this.valueStore = new ValueStore(valueBuffer);
  }

  has(key: fs.PathLike | number): boolean {
    // atomic.get
    return false;
  }
  get(key: fs.PathLike | number): any {
    // atomic.get
    if (this.has(key)) {
      const offset = this.keyStore.get(key);
      const data = this.valueStore.get(offset);
      return data;
    }
  }
  set(key: fs.PathLike | number, data: Buffer | string) {
    // atomic.set
    const _data = typeof data === "string" ? Buffer.from(data) : data;
    const offset = this.valueStore.set(_data);
    this.keyStore.set(key, offset);
  }
}
