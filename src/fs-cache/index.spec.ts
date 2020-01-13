import * as path from "path";
import * as fsNative from "fs";
import fs from "./index";

const file1 = "./__mocks__/file1.json";

describe("Shared File System Cache Test Suite", () => {
  test("Test #1", () => {
    const file = path.resolve(__dirname, file1);
    const expectedContent = fsNative.readFileSync(file);
    const content = fs.readFileSync(file);
    expect(content).toEqual(expectedContent);
  });
});
