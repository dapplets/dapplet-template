# Example 5: Wallet

In this exercise we connect **Ethereum** and **NEAR** wallets to a dapplet using **Core.wallet** interface.

The dapplet that we implement will send some amount of tokens from your wallet to itself.

Here is the initial code for this example: [ex05-wallet-exercise](https://github.com/dapplets/dapplet-template/tree/ex05-wallet-exercise).

### 1. Get the **wallet** object and common variables

The `Core.wallet()` method receives config with one parameter - `authMetods` and returns Promise.
**AuthMethods** is an array of strings that are combinations of chain and net names.
At the moment three combinations are available: `ethereum/goerli`, `near/testnet` and `near/mainnet`.
You can define one or more combinations if you want users to choose the chain and the net they want.
However, you have to understand that APIs of different chains are not equal. So when you provide a choice your code becomes more complex.
Let's consider this situation and get the `ethereum/goerli` or `near/testnet` wallet:

```typescript
const wallet = await Core.wallet({ authMethods: ['ethereum/goerli', 'near/testnet'] })
```

On this stage we are not connected to any wallet so our `wallet` is typed with `IEthWallet | INearWallet` interfaces.
Each of them consists of **chain-specific API** and `WalletConnection` interface.

**WalletConnection** contains `authMethod` parameter and three methods: `isConnected()`, `connect()` and `disconnect()`.
`wallet.authMethod` appears after connecting to a wallet and shows which one is connected.

We also have to set **transfer amounts of ETH and NEAR**. It's convenient to define appropriate values in the config and get them in the dapplet.
In this case the user would set any amounts they like.

`./config/default.json`:

```json
{
  "main": {
    "transferAmountEth": 0.001,
    "transferAmountNear": 0.5
  },
  "test": {
    "transferAmountEth": 0.001,
    "transferAmountNear": 0.5
  },
  "dev": {
    "transferAmountEth": 0.001,
    "transferAmountNear": 0.5
  }
}
```

`./config/schema.json`:

```json
{
  "type": "object",
  "required": ["transferAmountEth", "transferAmountNear"],
  "properties": {
    "transferAmountEth": {
      "type": "number",
      "title": "Transfer amount Ethereum"
    },
    "transferAmountNear": {
      "type": "number",
      "title": "Transfer amount NEAR"
    }
  }
}
```

```typescript
// ./src/index.ts
const transferAmountEth: number = await Core.storage.get('transferAmountEth')
const transferAmountNear: number = await Core.storage.get('transferAmountNear')
```

At last define the variable to save and reuse Ethereum addresses that we will get from the connected Ethereum wallet.

```typescript
let currentEthAddresses: string[]
```

### 2. Define the button states

There is a `button` in the `POST`. We want the wallet to connect when the button is clicked, to see the transfer amount and currency near the button, and on second click to send the tokens.
We consider a few states of the button besides the `DEFAULT` state. Look at the scheme that describes all the states.

<img width="2005" alt="Button states" src="https://user-images.githubusercontent.com/43613968/166938064-adfb4a6a-2f35-4da9-b55d-aad7e4fe513d.png">

Firstly, we need to describe button with a label. But we remember that wallets' APIs are different.
We have two ways: create a `CONNECTED` state and make several forks for Ethereum and NEAR wallets inside, or create two separate states.
Let's choose the second option and create `ETH_CONNECTED` and `NEAR_CONNECTED` states.

```typescript
ETH_CONNECTED: {
  label: `Send ${transferAmountEth} ETH`,
  img: EXAMPLE_IMG,
  loading: false,
  // LP: 4. Send the necessary data to Ethereum wallet and listen to the response
  exec: async (_, me) => {

  },
  //
},
NEAR_CONNECTED: {
  label: `Send ${transferAmountNear} NEAR`,
  img: EXAMPLE_IMG,
  loading: false,
  // LP: 5. Send the necessary data to NEAR wallet and listen to the response
  exec: async (_, me) => {

  },
  //
},
```

We implement the logic of sending transactions later, after creating all the states.

Next we want to see if the transaction succeeded or failed. Accordingly create `COMPLETED` and `FAILURE` states.

```typescript
COMPLETED: {
  label: 'Completed',
  img: EXAMPLE_IMG,
  loading: false,
  exec: (_, me) => {
    me.state = wallet.authMethod === 'ethereum/goerli'
    ? 'ETH_CONNECTED'
    : 'NEAR_CONNECTED';
  },
},
FAILURE: {
  label: 'Failure',
  img: EXAMPLE_IMG,
  loading: false,
  exec: (_, me) => {
    me.state = wallet.authMethod === 'ethereum/goerli'
    ? 'ETH_CONNECTED'
    : 'NEAR_CONNECTED';
  },
},
```

These states appear after successful wallet connections, so `wallet`s have `authMetod` value.

We can also reject any transaction. So we need the `REJECTED` state.

```typescript
REJECTED: {
  label: 'Rejected',
  img: EXAMPLE_IMG,
  loading: false,
  exec: async (_, me) => {
    me.state = await wallet.isConnected()
      ? wallet.authMethod === 'ethereum/goerli'
        ? 'ETH_CONNECTED'
        : 'NEAR_CONNECTED'
      : 'DEFAULT';
  },
},
```

The other two states `PENDING` and `MINING`, are for when the button is waiting for a transaction to be approved or mined.
These states are intermediate and the button has to be disabled,
thats why they have no `exec` functions and the `loading` perameter is `true`.
The last one disables the button and shows the loader instead of the picture on it.

```typescript
PENDING: {
  label: 'Pending',
  loading: true,
  exec: null,
},
MINING: {
  label: 'Mining',
  loading: true,
  exec: null,
},
```

### 3. Connect the wallet

We've defined all of the button's states and now we are going back to the `DEFAULT`.
Here we have to add the button click action that connects the wallet.

This is a **wallet.connect()** method. It returns `Promise<void>`.

```typescript
exec: async (_, me) => {
  me.state = 'PENDING';
  try {
    await wallet.connect();
  } catch (err) {
    console.log('Login ERROR:', err)
    me.state = 'REJECTED';
    return;
  }
  me.state = wallet.authMethod === 'ethereum/goerli' ? 'ETH_CONNECTED' : 'NEAR_CONNECTED';
},
```

After a successful connection the button switches the state to `ETH_CONNECTED'` or `NEAR_CONNECTED` depending on which wallet has been chosen.

If the connection was cancelled we switch the state to `REJECTED`.

### 4. Send the necessary data to Ethereum wallet and listen to the response

Firstly, add a check of the `wallet.authMethod`. If we implement the states' switching correctly it will always be `ethereum/goerli`.
But if we make a mistake the check will save us from an error. Also, after the check the typescript compiler will understand exactly the type of the wallet we use.

```typescript
exec: async (_, me) => {
  if (wallet.authMethod === 'ethereum/goerli') {
    /*
      ...
    */
  } else if (wallet.authMethod === 'near/testnet') {
    me.state = 'NEAR_CONNECTED';
  } else {
    me.state = 'DEFAULT';
  }
},
```

Switch the button's state to `PENDING`.

```typescript
me.state = 'PENDING'
```

If we haven't got the `currentEthAddresses` yet, we need to get it using the **wallet.request()** method.
This method is used for all requests to the Ethereum wallet. It recieves a config with two required parameters: **method** and **params**.
The `method` parameter of the `string` type is one of the [Ethereum JSON-RPC methods](https://eth.wiki/json-rpc/API).
`params` is an array of parameters that are passed to the method.

We use the `eth_accounts` JSON-RPC method with an empty array as the `params` value.

```typescript
if (!currentEthAddresses) {
  try {
    currentEthAddresses = await wallet.request({ method: 'eth_accounts', params: [] })
  } catch (err) {
    console.log('Get ETH accounts ERROR:', err)
    me.state = 'REJECTED'
    return
  }
}
```

The next step is to **send tokens**. We use the `eth_sendTransaction` method. It requires three parameters: `from`, `to` and `value`.
**From** and **to** are the same in our example. It is the current Ethereum address.
**Value** is a transfer amount in Wei with a string representation of a hexadecimal number.

```typescript
try {
  const transferAmount = BigInt(transferAmountEth * 1_000_000) * BigInt(1_000_000_000_000)
  const transactionHash = await wallet.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: currentEthAddresses[0],
        to: currentEthAddresses[0],
        value: transferAmount.toString(16),
      },
    ],
  })
  console.log('transactionHash', transactionHash)
  me.state = 'MINING'
  /*
    ...
  */
} catch (err) {
  console.log('Transaction ERROR:', err)
  me.state = 'REJECTED'
}
```

When the transaction is approved by the user we will get the transaction hash.
It's time to switch the button's state to `MINING`.

Now all we can do is wait for the the chain to confirm the transaction.
We have the **wallet.waitTransaction()** method.
It receives two parameters:

- `txHash`: string - (required) a transaction hash returned from `wallet.request()`;
- `confirmations`?: number - (optional, default === 1) the number of blocks confirming the transaction;

and returns `Promise<ITransactionReceipt>`. **ITransactionReceipt** has a `status` property
that can tell us if the transaction has been completed successfully (`"0x1"`) or failed (`"0x0"`).
We can set an appropriate state for the button.

```typescript
try {
  const transactionReceipt = await wallet.waitTransaction(transactionHash, 2)
  console.log('transactionReceipt', transactionReceipt)
  await wallet.disconnect()
  me.state = transactionReceipt.status === '0x1' ? 'COMPLETED' : 'FAILURE'
} catch (err) {
  console.log('Transaction waiting ERROR:', err)
  me.state = 'FAILURE'
}
```

After getting the `transactionReceipt` we **disconnect the wallet**.
It is **not required** but convenient for our example.
We can connect the wallet to another chain after sending the transaction.

The entire code for this step:

```typescript
exec: async (_, me) => {
  if (wallet.authMethod === 'ethereum/goerli') {
    me.state = 'PENDING';
    if (!currentEthAddresses) {
      try {
        currentEthAddresses = await wallet.request({ method: 'eth_accounts', params: [] });
      } catch (err) {
        console.log('Get ETH accounts ERROR:', err)
        me.state = 'REJECTED';
        return;
      }
    }
    try {
      const transferAmount = BigInt(transferAmountEth * 1_000_000) * BigInt(1_000_000_000_000);
      const transactionHash = await wallet.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentEthAddresses[0],
            to: currentEthAddresses[0],
            value: transferAmount.toString(16),
          },
        ],
      });
      console.log('transactionHash', transactionHash)
      me.state = 'MINING';
      try {
        const transactionReceipt = await wallet.waitTransaction(transactionHash, 2);
        console.log('transactionReceipt', transactionReceipt)
        await wallet.disconnect();
        me.state = transactionReceipt.status === "0x1" ? 'COMPLETED' : 'FAILURE';
      } catch (err) {
        console.log('Transaction waiting ERROR:', err)
        me.state = 'FAILURE';
      }
    } catch (err) {
      console.log('Transaction ERROR:', err)
      me.state = 'REJECTED';
    }
  } else if (wallet.authMethod === 'near/testnet') {
    me.state = 'NEAR_CONNECTED';
  } else {
    me.state = 'DEFAULT';
  }
},
```

### 5. Send the necessary data to a NEAR wallet and listen to the response

Start this step by checking `wallet.authMethod` and switching the button's state to `PENDING`.

```typescript
exec: async (_, me) => {
  if (wallet.authMethod === 'near/testnet') {
    me.state = 'PENDING';
    /*
      ...
    */
  } else if (wallet.authMethod === 'ethereum/goerli') {
    me.state = 'ETH_CONNECTED';
  } else {
    me.state = 'DEFAULT';
  }
},
```

We don't need to make a request to get an account ID when working with a NEAR wallet. It's already available in the connected wallet.

There are methods of [NEAR-API-JS](https://docs.near.org/docs/api/javascript-library) library in the **INearWallet**.

In the example we will use the [`wallet.sendMoney()`](https://docs.near.org/docs/api/naj-quick-reference#send-tokens) method. It receives two parameters:

- `receiverId` — NEAR account receiving Ⓝ;
- `amount` — Amount to send in yoctoⓃ;

and returns `Promise<FinalExecutionOutcome>`.

To convert the transfer amount to yoctoⓃ we use [bn.js](https://github.com/indutny/bn.js) library and the [parseNearAmount()](https://near.github.io/near-api-js/modules/utils_format.html#parsenearamount) method
from utils/format module of NEAR-API-JS library.

Let's add the library.

```bash
npm i bn.js
npm i -D @types/bn.js
```

Import it to the `./src/index.ts` module and get the `amount` value.

```typescript
// ./src/index.ts
import BN from 'bn.js'
const { parseNearAmount } = Core.near.utils.format
/*
  ...
*/
const amount = new BN(parseNearAmount(transferAmountNear.toString()))
```

Now we can call the `wallet.sendMoney()` method.

```typescript
try {
  const finalExecutionOutcome = await wallet.sendMoney(wallet.accountId, amount)
  console.log('finalExecutionOutcome', finalExecutionOutcome)
  await wallet.disconnect()
  /*
    ...
  */
} catch (err) {
  console.log('Transaction ERROR:', err)
  me.state = 'REJECTED'
}
```

`finalExecutionOutcome` also has a `status` property. It is an object with a single key-value property.
If the key is `'SuccessValue'` or `'SuccessReceiptId'`, we consider that the transaction was successful.

```typescript
const status = Object.keys(finalExecutionOutcome.status)[0]
me.state = status === 'SuccessValue' || status === 'SuccessReceiptId' ? 'COMPLETED' : 'FAILURE'
```

Result of this step:

```typescript
exec: async (_, me) => {
  if (wallet.authMethod === 'near/testnet') {
    me.state = 'PENDING';
    try {
      const amount = new BN(parseNearAmount(transferAmountNear.toString()));
      const finalExecutionOutcome = await wallet.sendMoney(
        wallet.accountId,
        amount
      );
      console.log('finalExecutionOutcome', finalExecutionOutcome);
      await wallet.disconnect();
      const status = Object.keys(finalExecutionOutcome.status)[0];
      me.state = status === 'SuccessValue' || status === 'SuccessReceiptId'
        ? 'COMPLETED'
        : 'FAILURE';
    } catch (err) {
      console.log('Transaction ERROR:', err)
      me.state = 'REJECTED';
    }
  } else if (wallet.authMethod === 'ethereum/goerli') {
    me.state = 'ETH_CONNECTED';
  } else {
    me.state = 'DEFAULT';
  }
},
```

The dapplet is finished. 🎉

Don't forget to install dependencies and run the dapplet:

```bash
npm i
npm start
```

![](https://github.com/dapplets/dapplet-docs/blob/master/static/video/ex_05.gif)

> Currently you need to reload the page to select a different wallet after disconnecting it. We will fix it soon.

Here is the result code of the example: [ex05-wallet-solution.](https://github.com/dapplets/dapplet-template/tree/ex05-wallet-solution)

> There is another way to get a **Wallet** connection by using `Core.login()`. It's described in [Ex14: Core Login](https://docs.dapplets.org/docs/core-login).

This page in the docs is [here.](https://docs.dapplets.org/docs/wallet)
