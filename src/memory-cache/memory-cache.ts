import * as fs from "fs";
import { envInt } from "../common/env";

const _10mb = 1024 * 1024 * 10;
const initialBufferSize = envInt("FS_CACHE_BUFFER_SIZE_INITIAL", _10mb);
// Buffer [length, num_items, item#1[key, value], item#2[key, value]]

export class MemoryCache {
  private _buffer: SharedArrayBuffer;
  get buffer(): SharedArrayBuffer {
    return this._buffer;
  }

  private view: DataView;

  constructor(buffer?: SharedArrayBuffer) {
    if (buffer) {
      this._buffer = buffer;
    } else {
      this._buffer = new SharedArrayBuffer(initialBufferSize);
    }
    this.view = new DataView(this._buffer);
  }
  get(key: fs.PathLike | number): any {
    // atomic.get
  }
  set(key: fs.PathLike | number, data: any) {
    // atomic.set
  }
}
