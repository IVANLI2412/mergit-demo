// Turns a wei amount into a decimal ETH string, the inverse of parseEth.

const WEI_PER_ETH = 10n ** 18n;

/**
 * Turns a bigint amount in wei into a decimal ETH string, with no trailing
 * zeros and no trailing dot.
 * @param {bigint} wei amount in wei
 */
export function formatEth(wei) {
  if (typeof wei !== "bigint") throw new TypeError("wei must be a bigint");
  if (wei < 0n) throw new RangeError("wei cannot be negative");

  const whole = wei / WEI_PER_ETH;
  const frac = wei % WEI_PER_ETH;
  if (frac === 0n) return whole.toString();

  const fracStr = frac.toString().padStart(18, "0").replace(/0+$/, "");
  return `${whole}.${fracStr}`;
}
