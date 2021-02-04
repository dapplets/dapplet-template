# Example 04: Overlays

In this example we will add an overlay to a `POST`. This overlay will be opened with a button click.

Here are two examples of an overlay:

- [Pure HTML page](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/pure-html-page)
- [React based example](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/react-overlay)

First we implement an overlay written on HTML with pure JavaScript. Second - the React based component.

> We recommend using an overlay written on the React based component. When implement an overlay written on HTML with pure JavaScript, some functions such as [Share State HOC](https://docs.dapplets.org/docs/shared-state) are not available.

Here is the initial code for this example, including both of the above overlays: [ex04-overlays-exercise.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-exercise)

Now let's create overlays.

### HTML with JavaScript overlay

1. In `pure-html-page/index.html` import Bridge class from `https://unpkg.com/@dapplets/dapplet-overlay-bridge@0.1.1` package.

```js
import Bridge from 'https://unpkg.com/@dapplets/dapplet-overlay-bridge@0.1.1'
```

2. Create Bridge class instance and subscribe it to the `data` event.

```js
const bridge = new Bridge()

bridge.on('data', ({ message, counter }) => {
  document.querySelector('.dappletMessage').innerText = message
  document.querySelector('.dappletCounter').innerText = counter ?? 0
})
```

3. Add an event handler to the button click.

```js
let isTick = true
const button = document.querySelector('.ch-state-btn')
button.addEventListener('click', async () => {
  const counter = await bridge.increaseCounterAndToggleLabel(isTick)
  document.querySelector('.dappletCounter').innerText = counter
  isTick = !isTick
})
```

> To publish a dapplet with an overlay, you need `assets-manifest.json`. When overlay is written in React, webpack or another module bundler builds it on its own.

### React based overlay

First install [Dapplet-Overlay Bridge:](https://github.com/dapplets/dapplet-overlay-bridge) in `/overlayWithReact` module.

```bash
cd overlayWithReact
npm i @dapplets/dapplet-overlay-bridge
cd ..
```

1. In `/overlayWithReact/src/App.tsx` import Bridge class from @dapplets/dapplet-overlay-bridge package.

```tsx
import Bridge from '@dapplets/dapplet-overlay-bridge'
```

2. Create `IDappletApi` interface and Bridge class instance typing with the inteface.

```tsx
interface IDappletApi {
  increaseCounterAndToggleLabel: (isTick: boolean) => Promise<number>
}

const bridge = new Bridge<IDappletApi>()
```

3. Add a listener to the 'data' event.

```tsx
componentDidMount() {
  bridge.on('data', ({ message, counter }: { message: string, counter: number }) => this.setState({ message, counter }));
}
```

4. Add an event handler to the button click.

```tsx
handleClick = async () => {
  const counter = await bridge.increaseCounterAndToggleLabel(this.state.isTick)
  this.setState({ isTick: !this.state.isTick, counter })
}
```

### Change the dapplet

1. Implement the IDappletApi interface, the same as in the React-based overlay.

```ts
interface IDappletApi {
  increaseCounterAndToggleLabel: (isTick: boolean) => number
}
```

2. Create an overlay object using Core API: `Core.overlay({ name: string, title: string })`.

```ts
const overlay = Core.overlay({ name: 'example-04-overlay', title: 'Example 4' })
```

3. Create an object that implements the interface. Write increaseCounterAndToggleLabel function. Declare the API in the overlay.

```ts
const dappletApi: IDappletApi = {
  increaseCounterAndToggleLabel: (isTick: boolean) => {
    this.currentContext.counter =
      this.currentContext.counter === undefined ? 1 : this.currentContext.counter + 1
    this._currentProxy.label = `${isTick ? 'tick' : 'tock'} ${this.currentContext.counter}`
    return this.currentContext.counter
  },
}
overlay.declare(dappletApi)
```

4. Save current context and proxy to the global variables to use them in `increaseCounterAndToggleLabel` function.

```ts
this.currentContext = ctx
this._currentProxy = proxy
```

5. By click open the overlay using `send()` method. Send 'Hello, World!' message and ctx.counter to the overlay using 'data' event.

```ts
overlay.send('data', { message: 'Hello, World!', counter: ctx.counter })
```

6. Add to the `dapplet.json` manifest the following option:

```json
{
  ...
  "overlays": {
    "example-04-overlay": "http://localhost:3000"
  }
}
```

Dependencies must be installed before running:

```bash
npm i
```

Run the dapplet

```bash
npm start
```

To run the dapplet with React overlay, change `start` script to the following:

```json
"start": "npm run start:react",
```

Here is the result code of the example: [ex04-overlays-solution.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-solution)

![video](https://docs.dapplets.org/assets/images/ex_4-e507030ebe1a7bc2e0f6234ff9dd41d5.gif)
