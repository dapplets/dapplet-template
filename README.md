# Example 7: Virtual adapter (interface)

It's often needed to run a dapplet on different websites but with the same functionality using the same widgets in similar contexts. We provide **Interfaces** or **Virtual Adapters** to make things easier and avoid boilerplate. They describe the interface that site-specific adapters must implement. Thus, if a dapplet uses a particular virtual adapter, it will work with all adapters that support that virtual adapter across many websites.

Task: change the Twitter Config to **Social Virtual Config** config and check it on Twitter and Github.

The initial code for this example is in [master.](https://github.com/dapplets/dapplet-template/tree/master)

Change "twitter-config.dapplet-base.eth" to **"social-virtual-config.dapplet-base.eth"** in `/dapplet.json` with the correct version:

```json
{
  ...
  "contextIds": ["social-virtual-config.dapplet-base.eth"],
  ...
  "dependencies": {
      "social-virtual-config.dapplet-base.eth": "0.1.0"
  }
}
```

In `src/index.ts` change the injected adapter:

```ts
@Inject('social-virtual-config.dapplet-base.eth')
public adapter: any
```

Here is the result code of the example: [ex07-virtual-adapter.](https://github.com/dapplets/dapplet-template/tree/ex07-virtual-adapter)

Run the dapplet:

```bash
npm i
npm start
```

![](https://github.com/dapplets/dapplet-docs/blob/master/static/video/ex_7.gif)

This page in the docs is [here.](https://docs.dapplets.org/docs/virtual-adapter-int)
