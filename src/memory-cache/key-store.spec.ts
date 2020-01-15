import { KeyStore } from "./key-store"

describe("Key store test suite", () => {
  describe("When instantiating KeyStore", () => {
    it("Should not throw", () => {
      expect(() => { new KeyStore() }).not.toThrowError()
    })
    it("Should create a SharedArrayBuffer as buffer", () => {
      let keyStore;
      expect(() => { keyStore = new KeyStore() }).not.toThrowError()
      expect(keyStore.buffer).toBeInstanceOf(SharedArrayBuffer)
    })
    it("Should accept a SharedArrayBuffer as first argument", () => {
      const buffer = new SharedArrayBuffer(1)
      let keyStore;
      expect(() => { keyStore = new KeyStore(buffer) }).not.toThrowError()
      expect(keyStore.buffer).toBe(buffer)
      expect(keyStore.bytesAvailable).toBe(1)
    })
  })
})
