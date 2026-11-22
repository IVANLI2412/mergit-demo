# Contributing

This repo pays for merged work through [Mergit](https://github.com/odiseo159-beep/mergit). Here is how to get paid, in order:

1. **Claim your GitHub login** at <https://www.mergit.xyz/claim>. It links your login to your wallet, so the agent knows where to pay you.
2. **Pick an issue that is already funded.** The list of funded issues is on the [Season 0 leaderboard](https://www.mergit.xyz/leaderboard). A merged pull request with no bounty pays nothing.
3. **Open one pull request per issue**, with `Closes #N` in the description (not only in the title). If more than one bounty points at the issue, also add `Bounty: #<id>`.
4. **The CI has to be green.** Run `npm test` locally first; the checks run again on the pull request.
5. **On merge, the agent pays and comments the receipt** on the pull request: the amount, the evidence hash, and the transaction on GIWA Sepolia.

Two things that are normal, not problems:

- A first pull request from a fork waits for a maintainer to approve the CI run. That approval has to happen once before the checks start.
- Only the maintainer can merge. A pull request that is open is not yet paid; the payment happens on merge, once, automatically.
