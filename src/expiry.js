// The escrow's deadline rule, mirroring MergitEscrow.

/**
 * Says whether a bounty is past its deadline, with the same rule as the
 * escrow contract: a bounty can still be paid at its deadline, and can be
 * refunded only after it.
 * @param {bigint} deadline deadline in seconds, as stored on chain
 * @param {number} now current time in seconds
 */
export function isExpired(deadline, now) {
  if (typeof deadline !== "bigint") throw new TypeError("deadline must be a bigint");
  if (!Number.isInteger(now) || now < 0) throw new RangeError("now must be a non-negative integer");
  return BigInt(now) > deadline;
}
