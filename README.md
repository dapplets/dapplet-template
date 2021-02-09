# Example 05: Wallet: Send transaction
1. Open wallet.
2. Add states `CONNECTED`, `PENDING`, `REGECTED`, `COMPLETED` and `UNAVAILABLE`.
3. Send the necessary data to the wallet and listen for the answer.
* in this example the sender and the recipient of the transaction are the same.
* method `sendAndListen` of `wallet` listens events: pending, result, rejected. Use them to change the button state.
4. Show the state of the transaction: pending, completed, rejected or unavailable.
