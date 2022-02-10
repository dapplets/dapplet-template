# Example 14: Core Login

This example shows how to work with Ethereum/NEAR wallets and smart-contracts via new Core Login API.

The initial code for this example is here: [`ex14-core-login`](https://github.com/dapplets/dapplet-template/tree/ex14-core-login).

### Introduction to Core Login API

The Core Login API is developed as a replacement of `Core.wallet()` and `Core.contract()` functions. It provides two functions to manage Login Sessions:

* `Core.login()` - creates login sessions for a specified authorization method, during which wallet and contract interaction will take place. It shows a pop-up window for a user where he is able to select a suitable wallet. 
* `Core.sessions()` - returns existing sessions that are not expired, to reuse previous authorization and to not show a login pop-up again.

The `Core.login()` accepts one or more login requests as an input parameter. `LoginRequest` is an object with the following properties:

* `authMethods` (required, `string[]`) - authorization method that affects the list of wallets available for user selection. Depending on the specified authorization method, the functions will return different interfaces for interacting with wallets and contracts (`session.wallet()`, `session.contract()`). Possible values: `ethereum/goerli`, `near/testnet`, `near/mainnet`.
* `timeout` (optional, `number`, default: 7 days) - amount of time after which the session will become invalid in milliseconds.
* `role` (optional, `string`) - a name of the set of operations and the operation profile that the user intends to work in. It can be missing if the dapplet works with only one role. The role is displayed in the login pop-up and included in signing messages when the secure mode is enabled. It can be any string. For example: `admin`, `moderator`, `writer` etc.
* `help` (optional, `string`) - a link to dapplet documentation which is displayed at the message signing step when the secure mode is enabled.
* `target` (optional, `Overlay`) - an overlay where the login popup window will be displayed. The overlay will be blurry and blocked for user interaction while login process is going.
* `secureLogin` (optional, `string`, default: `disabled`) - a secure login mode which requires the user to sign a message to confirm wallet ownership. The valid values: `required`, `optional`, `disabled`.
* `from` (optinal, `string`, default: `any`) - a filter that defines which dapplets the login confirmation can be reused from.

The `Core.login()` is the asynchronous function which returns `LoginSession` object through which you can call a wallet, a contract, save session info or log out a user. It includes the following asynchronous functions:

* `wallet()` - returns an object for wallet communication.
* `contract(address, cfg)` - returns an object for contract communication.
* `isValid()` - checks the validity of the login session according to the set timeout.
* `getItem(key)` - gets data from the session storage.
* `setItem(key, value)` - saves a value to the session storage. The value must be of any serializable type.
* `removeItem(key)` - removes a value from the session storage by key.
* `clear()` - clears all session storage.


### LP: 1. Log out of all existing sessions

Get all existing login sessions and log out from every of them at the beginning of `activate()` function in the dapplet . In your projects you can reuse sessions using this method.

```typescript
const sessions = await Core.sessions();
sessions.forEach(x => x.logout());
```

### LP: 2. Open overlay if you want to show login pop-up in it

The `overlay.open()` method will open the overlay. An overlay must be opened before logging in if you want to show a pop-up over a blurry overlay.

```typescript
this.overlay.open();
```

### LP: 3. Create a new Ethereum session or reuse an existing one

If there is no valid session you should create a new one using `Core.login()` function with the `ethereum/goerli` authentication method.

The overlay object can be passed as `target` to open a pop-up over the overlay.

```typescript
const prevSessions = await Core.sessions();
const prevSession = prevSessions.find(x => x.authMethod === 'ethereum/goerli');
const session = prevSession ?? await Core.login({ authMethods: ['ethereum/goerli'], target: this.overlay });
```

### LP: 4. Ethereum wallet interaction

To interact with the wallet within the established session call the `session.wallet()` method which will return an object similar to the interface proposed in [EIP-1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md).

```typescript
const wallet = await session.wallet();
const accountIds = await wallet.request({ method: 'eth_accounts', params: [] });
console.log('Your Ethereum addresses', accountIds);
```

### LP: 5. Ethereum contract interaction

In this example we call the contract developed for [Dapplets x Ethereum tutorial](https://github.com/dapplets/dapplets-eth-example). You can find the source code of the contract there. The contract stores a user's tweets and returns them.

To interact with contracts you need to create wrapper object with `session.contract()` method. It is similar to the legacy `Core.contract()` interface.

```typescript
const contract = await session.contract('0x7702aE3E1E0a96A428052BF3E4CB94965F5C0d7F', ABI);
const tweets = await contract.getTweets(accountIds[0]); // read
console.log('Tweets from Ethereum contract', tweets);
await contract.addTweet(JSON.stringify(tweet)); // write
```

### LP: 6. Open the overlay if you want to show a login pop-up in it

The same like in the LP 2.

```typescript
this.overlay.open();
```

### LP: 7. Create a new NEAR session or reuse an existing one

As in the LP 3 we create a login session but using another authentication method: `near/testnet`.

```typescript
const prevSessions = await Core.sessions();
const prevSession = prevSessions.find(x => x.authMethod === 'near/testnet');
const session = prevSession ?? await Core.login({ authMethods: ['near/testnet'], target: this.overlay });
```

### LP: 8. NEAR wallet interaction

In this case the `session.wallet()` returns the object, wrapping NEAR wallet communication. It uses the `near-api-js` library under the hood and returns `Wallet` object as [described in their documentation](https://github.com/near/near-api-js).

```typescript
const wallet = await session.wallet();
console.log('Your NEAR address', wallet.accountId);
```

### LP: 9. NEAR contract interaction

The similar interface is returned here by `session.contract()`. But the contract methods should be called a little differently.

```typescript
const contract = await session.contract('dev-1634890606019-41631155713650', {
  viewMethods: ['getTweets'],
  changeMethods: ['addTweet', 'removeTweet'],
});

const tweets = await contract.getTweets({ nearId: wallet.accountId }); // read
console.log('Tweets from NEAR contract', tweets);
await contract.addTweet({ tweet: JSON.stringify(tweet) }); // write
```

Here is the result code of the example: [`ex14-core-login-solution`](https://github.com/dapplets/dapplet-template/tree/ex14-core-login-solution).

Run the dapplet:

```bash
npm i
npm start
```
