import { test } from "node:test";
import assert from "node:assert/strict";
import { formatEth } from "../src/format-eth.js";

test("turns zero wei into zero ETH", () => {
  assert.equal(formatEth(0n), "0");
});

test("turns one wei into the smallest decimal", () => {
  assert.equal(formatEth(1n), "0.000000000000000001");
});

test("turns one whole ETH into a plain number", () => {
  assert.equal(formatEth(10n ** 18n), "1");
});

test("drops trailing zeros from the decimals", () => {
  assert.equal(formatEth(1_500_000_000_000_000n), "0.0015");
});

test("keeps all 18 decimals when nothing can be dropped", () => {
  assert.equal(formatEth(1_000_000_000_000_000_001n), "1.000000000000000001");
});

test("rejects anything that is not a bigint", () => {
  for (const bad of [1000, "1", 1.5, null, undefined, {}]) {
    assert.throws(() => formatEth(bad), TypeError);
  }
});

test("rejects a negative amount", () => {
  assert.throws(() => formatEth(-1n), RangeError);
});
