import * as fs from "fs";
import { envInt } from "../common/env";
import { sizeOfString } from "../common/size";

const _10mb = 1024 * 1024 * 10;
const initialBufferSize = envInt("FS_CACHE_BUFFER_SIZE_INITIAL", _10mb);

export class KeyStore {
  private _position: number = 0;
  private _buffer: SharedArrayBuffer;
  get buffer(): SharedArrayBuffer {
    return this._buffer;
  }

  get bytesAvailable(): number {
    return this._buffer.byteLength - this._position;
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

  /**********************/
  /*  PRIVATE METHODS   */
  /**********************/
  private validateBuffer(size: number): void {
    if (this.bytesAvailable < size) {
      const tmp: Uint8Array = new Uint8Array(
        new SharedArrayBuffer(this._buffer.byteLength * 2)
      );
      tmp.set(new Uint8Array(this._buffer));
      this._buffer = tmp.buffer as SharedArrayBuffer;
    }
  }

  get(key: fs.PathLike | number) {
    return 0;
  }
  set(key: string, address: number) {
    const size = sizeOfString(key) + 4;
    this.validateBuffer(size);
  }
}
