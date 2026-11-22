// Parses a decimal ETH amount into wei, the inverse of formatEth.

const WEI_PER_ETH = 10n ** 18n;

/**
 * Turns a decimal ETH amount written as a string into wei.
 * @param {string} text decimal ETH amount, e.g. "0.0005"
 */
export function parseEth(text) {
  if (typeof text !== "string") throw new TypeError("text must be a string");
  if (text === "") throw new RangeError("text cannot be empty");
  if (text.includes(" ")) throw new RangeError("text cannot contain spaces");
  if (/[eE]/.test(text)) throw new RangeError("exponents are not allowed");
  if (text.startsWith("-")) throw new RangeError("text cannot be negative");

  const match = /^(\d+)(?:\.(\d+))?$/.exec(text);
  if (!match) throw new RangeError("text must be a decimal number");
  const [, whole, frac = ""] = match;
  if (frac.length > 18) throw new RangeError("more than 18 decimals");

  return BigInt(whole) * WEI_PER_ETH + BigInt(frac.padEnd(18, "0"));
}
