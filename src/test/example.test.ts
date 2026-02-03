import { describe, it, expect } from "vitest";

describe("example", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});
console.log("ENV KEY 👉", import.meta.env.VITE_FINNHUB_API_KEY)
