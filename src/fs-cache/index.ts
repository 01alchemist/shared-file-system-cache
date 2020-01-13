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
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }
    const content = fs.readFileSync(path, encoding);
    this.cache.set(path, content);
    return content;
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
    fs.readFile(
      path,
      options,
      (err: NodeJS.ErrnoException | null, data: string | Buffer) => {
        if (!err) {
          this.cache.set(path, data);
        }
        if (callback) callback(err, data);
      }
    );
  }
}

export default new SharedFileSystem();
