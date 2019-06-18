import * as path from "path";
import fs from "./index";

const file1 = "./__mocks__/file1.json";

describe("Shared File System Cache Test Suite", () => {
  test("Test #1", () => {
    const data = fs.readFileSync(path.resolve(__dirname, file1));
  });
});
