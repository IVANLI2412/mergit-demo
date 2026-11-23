import { test } from "node:test";
import assert from "node:assert/strict";
import { isExpired } from "../src/expiry.js";

test("a bounty can still be paid at its deadline", () => {
  assert.equal(isExpired(100n, 100), false);
});

test("a bounty is expired one second after its deadline", () => {
  assert.equal(isExpired(100n, 101), true);
});

test("a bounty is not expired before its deadline", () => {
  assert.equal(isExpired(100n, 0), false);
  assert.equal(isExpired(100n, 99), false);
});

test("rejects a deadline that is not a bigint", () => {
  for (const bad of [100, "100", null, undefined]) {
    assert.throws(() => isExpired(bad, 100), TypeError);
  }
});

test("rejects a negative now", () => {
  assert.throws(() => isExpired(100n, -1), RangeError);
});

test("rejects a now that is not an integer", () => {
  for (const bad of [1.5, Number.NaN, "100", null]) {
    assert.throws(() => isExpired(100n, bad), RangeError);
  }
});
