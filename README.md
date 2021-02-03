# Example 15: Server Connection

In this example we use `Core` methods for connecting to the server using WebSockets.

We implement a button with counters like in `ex01`. The difference is that the state of the counters is kept in the simple Node.js (Express) server.

The initial code for this example is here: [`ex15-server-connection-exercise`](https://github.com/dapplets/dapplet-template/tree/ex15-server-connection-exercise)

### Dapplet with a connection to the server

1.  We add the server's URL to `./config/default.json`

  ```json
  {
    "dev": {
      "serverUrl": "ws://localhost:8081/feature-1"
    }
  }
  ```

  It's possible to set different URLs for `test` and `main` networks.

  In `./src/index.ts` we get this URL from the config:

  ```typescript
  const serverUrl = await Core.storage.get('serverUrl');
  ```

2.  Then we have to create a connection with the server. `Core.connect` has its own state, so we have to provide the default state and its type or interface.

  ```typescript
  interface IDappState { amount: any }
  
  const defaultState: IDappState = { amount: 0 };
  const server = Core.connect<IDappState>({ url: serverUrl }, defaultState);
  ```

  > To understand how the dapplet's state works look at [example 13](https://docs.dapplets.org/docs/shared-state).

  In this simple example we can only use `connection`'s state. But in your dapplet you might want to use one complex state for the entire app.

  So let's create a common state.

  ```typescript
  const state = Core.state<IDappState>(defaultState);
  ```

  Here we use the same interface and default state, but in your dapplet you can use other ones.

3.  In the config we get `ctx`. We can use `ctx.id` as a key in our states. If we use the common state, we can pass observable value of the server's state to it.

  ```typescript
  state[ctx.id].amount.next(server.state[ctx.id].amount);
  ```

4.  In the `button`'s DEFAULT state we pass the observable counter to the label and in `exec` increase its value with a click.
We implement the function that increases the counters on the server side. In the dapplet we call this function by using the `send` method. The first parameter is the name of the function and the second is a parameter for the server's function. In our case it's context ID.

  ```typescript
  DEFAULT: {
    img: EXAMPLE_IMG,
    label: state[ctx.id].amount.value,
    // label: server.state[ctx.id].amount, // alternative usage
    exec: () => server.send('increment', ctx.id),
  },
  ```

> **Note**
> Note that we don't pass the entire observable state's `amount`, but instead it's **value** to the `label`. This is because this value is **observable server's amount**.
> When we directly use `server.state[ctx.id].amount` without the common state we don't have to get its value here.

  This is the entire `activate` method:

  ```typescript
  async activate() {
    const serverUrl = await Core.storage.get('serverUrl');
    const defaultState: IDappState = { amount: 0 };
    const server = Core.connect<IDappState>({ url: serverUrl }, defaultState);
    const state = Core.state<IDappState>(defaultState);

    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: (ctx: { id: string }) => {
        state[ctx.id].amount.next(server.state[ctx.id].amount);
        return button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            label: state[ctx.id].amount.value,
            // label: server.state[ctx.id].amount, // alternative usage
            exec: () => server.send('increment', ctx.id),
          },
        });
      },
    });
  }
  ```

### II. Implement a server counter storage

5.  Add a storage for the counters in `server/index.js`.

  ```js
  const counter = {};
  ```

6.  Initialize a counter for the current tweet.

  ```js
  if (!Object.prototype.hasOwnProperty.call(counter, tweetId)) {
    counter[tweetId] = {
      amount: 0,
    };
  }
  ```

7.  Send the counter in `params`.

  ```js
  ws.send(
    JSON.stringify({
      jsonrpc: '2.0',
      method: subscriptionId,
      params: [{ amount: counter[tweetId].amount }],
    }),
  );
  ```

8.  Send the counter in a callback.

  ```js
  ws.send(
    JSON.stringify({
      jsonrpc: '2.0',
      method: subscriptionId,
      id: currentId,
      params: [{ amount: counter[currentId].amount }],
    }),
  );
  ```

9.  Implement the counter increment.

  ```js
  const [currentId] = params;
  counter[currentId].amount += 1;
  emitter.emit('attached', currentId);
  ```

Here is the result code of the example: [`ex15-server-connection-solution`](https://github.com/dapplets/dapplet-template/tree/ex15-server-connection-solution)

Run the dapplet:

```bash
npm i
npm start
```

This page in the docs is [here.](https://docs.dapplets.org/docs/server-connection)
