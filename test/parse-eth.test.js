import { test } from "node:test";
import assert from "node:assert/strict";
import { parseEth } from "../src/parse-eth.js";

test("turns whole ETH into wei", () => {
  assert.equal(parseEth("1"), 10n ** 18n);
});

test("turns a small decimal into wei", () => {
  assert.equal(parseEth("0.0005"), 500_000_000_000_000n);
});

test("keeps all 18 decimals", () => {
  assert.equal(parseEth("1.000000000000000001"), 1_000_000_000_000_000_001n);
});

test("turns zero into zero wei", () => {
  assert.equal(parseEth("0"), 0n);
  assert.equal(parseEth("0.0"), 0n);
});

test("rejects anything that is not a string", () => {
  for (const bad of [1, 1n, null, undefined, {}, ["1"]]) {
    assert.throws(() => parseEth(bad), TypeError);
  }
});

test("rejects an empty string", () => {
  assert.throws(() => parseEth(""), RangeError);
});

test("rejects a negative amount", () => {
  assert.throws(() => parseEth("-1"), RangeError);
  assert.throws(() => parseEth("-0.5"), RangeError);
});

test("rejects more than 18 decimals", () => {
  assert.throws(() => parseEth("1.0000000000000000001"), RangeError);
});

test("rejects exponents", () => {
  assert.throws(() => parseEth("1e-3"), RangeError);
  assert.throws(() => parseEth("1E3"), RangeError);
});

test("rejects spaces inside the number", () => {
  assert.throws(() => parseEth("1 000"), RangeError);
  assert.throws(() => parseEth(" 1"), RangeError);
  assert.throws(() => parseEth("1 "), RangeError);
});

test("rejects anything that is not a plain decimal", () => {
  for (const bad of ["abc", "1.2.3", ".5", "+1", "0x10"]) {
    assert.throws(() => parseEth(bad), RangeError);
  }
});
