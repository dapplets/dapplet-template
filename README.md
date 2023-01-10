# Example 18: Dapplet Actions

**Dapplet Actions** widgets are used for quick user access to dapplet functions in a minimized Extension view.

The initial code for this example is in [master](https://github.com/dapplets/dapplet-template/tree/master).

1. Open `src/index.ts`. Add the Overlay adapter in addition to the context adapter.

```ts
@Inject('overlay-adapter.dapplet-base.eth') public adapterAction: any

```

2. Import widget **button** as `buttonAction` from Overlay adapter.

```ts
const { button: buttonAction } = this.adapterAction.exports
```

3. Pass the parameters of the widget described in the adapter to states, and then use it in the attachConfig() function:

```ts
const wallet = await Core.wallet({
  authMethods: ['ethereum/goerli', 'near/testnet'],
})
const ex18_button = buttonAction({
  initial: 'ex18',
  ex18: {
    icon: EXAMPLE_IMG,
    title: 'title',
    pinnedID: 'ex18-title',
    action: (_, me) => {
      me.title = 'ex18 new title'
    },
  },
})
this.adapterAction.attachConfig({
  MENU_ACTION: () => [
    ex18_button,
    buttonAction({
      initial: 'CONNECT',
      CONNECT: {
        icon: EXAMPLE_IMG_2,
        title: 'connect',
        pinnedID: 'ex18-connect',
        action: async () => {
          try {
            await wallet.connect()
          } catch (err) {
            console.log('Disconnect ERROR:', err)
          }
        },
      },
    }),
  ],
})
```

**parameters of the Dapplet Actions**

The widget button has options similar to the button widgets of other adapters. More about it is [here](https://docs.dapplets.org/docs/extra-button).

_icon_ - required parameter. We recommend to use images in SVG format.

_pinnedID_ - required parameter, for the user to pin the widget in the minimized extension. Must be unique for each widget.

_action_ - analogue of _exec_ .

_disabled_ - option parameter, default false.

_hidden_ - option parameter, default false, hiding a widget.

Here is the result code of the example: [ex18-dapplet-actions](https://github.com/dapplets/dapplet-template/tree/ex18-dapplet-actions).

Run the dapplet:

```bash
npm i
npm
```

![](https://github.com/dapplets/dapplet-docs/blob/master/static/video/ex_18.gif)
