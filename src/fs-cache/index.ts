import * as fs from "fs";
import { MemoryCache } from "../memory-cache/memory-cache";

export class SharedFileSystem {
  cache: MemoryCache;

  static instance: SharedFileSystem;
  static getInstance(buffer?: SharedArrayBuffer): SharedFileSystem {
    if (!SharedFileSystem.instance) {
      SharedFileSystem.instance = new SharedFileSystem(buffer);
    }
    return SharedFileSystem.instance;
  }

  get buffer(): SharedArrayBuffer {
    return this.cache.buffer;
  }

  constructor(buffer?: SharedArrayBuffer) {
    this.cache = new MemoryCache(buffer);
  }
  readFileSync(path: string, encoding?: string) {
    const content = fs.readFileSync(path, encoding);
    this.cache.set(path, content);
  }
  readFile(
    path: fs.PathLike | number,
    options:
      | { encoding?: string | null; flag?: string }
      | string
      | undefined
      | null,
    callback: (err: NodeJS.ErrnoException | null, data: string | Buffer) => void
  ) {
    const content = fs.readFile(
      path,
      options,
      (err: NodeJS.ErrnoException | null, data: string | Buffer) => {
        if (callback) callback(err, data);
      }
    );
    this.cache.set(path, content);
  }
}

export default new SharedFileSystem();
