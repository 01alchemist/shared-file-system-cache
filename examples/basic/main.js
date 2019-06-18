const SharedFileSystem = require("../../dist/sfs");
const numCPU = 4;
function main() {
  const sfs = SharedFileSystem.getInstance();

  for (let i = 0; i < numCPU; i++) {
    const worker = new Worker();
    worker.postMessage({
      command: "INIT",
      buffer: sfs.buffer
    });
  }
}
