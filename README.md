# Example 04: Overlays

In this example we will add an overlay to a `POST`. This overlay will open with a button click.

Here are two examples of an overlay:

- [Pure HTML page](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/pure-html-page)
- [React.js based example](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/react-overlay)

First we implement an overlay written on HTML with pure JavaScript. Second - the React based component.

The initial code for this example, including both of the above overlays, is
here: [ex04-overlays-exercise.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-exercise)

Now let's create overlays.

### HTML with JavaScript overlay

1. In `pure-html-page/index.html` import Bridge class from `https://unpkg.com/@dapplets/dapplet-overlay-bridge` pachage.

```js
import Bridge from 'https://unpkg.com/@dapplets/dapplet-overlay-bridge';
```

2. Create Bridge class instance and subscribe for the `data` event.

```js
const bridge = new Bridge();

bridge.on('data', ({ message, counter }) => {
  document.querySelector('.dappletMessage').innerText = message;
  document.querySelector('.dappletCounter').innerText = counter ?? 0;
});
```

3. Add an event on the button click.

```js
let isTick = true;
const button = document.querySelector('.ch-state-btn');
button.addEventListener('click', async () => {
  const counter = await bridge.increaseCounterAndToggleLabel(isTick);
  document.querySelector('.dappletCounter').innerText = counter;
  isTick = !isTick;
});
```

### React.js based overlay

First install [Dapplet-Overlay Bridge:](https://github.com/dapplets/dapplet-overlay-bridge) in `/overlayWithReact` module.

```bash
cd overlayWithReact
npm i @dapplets/dapplet-overlay-bridge
cd ..
```

1. In `/overlayWithReact/src/App.tsx` import Bridge class from @dapplets/dapplet-overlay-bridge pachage.

```tsx
import Bridge from '@dapplets/dapplet-overlay-bridge';
```

2. Create `IDappletApi` interface and Bridge class instance typing with the inteface.

```tsx
interface IDappletApi {
  increaseCounterAndToggleLabel: (isTick: boolean) => Promise<number>,
}

const bridge = new Bridge<IDappletApi>();
```

3. Add a listener to the 'data' event.

```tsx
componentDidMount() {
  bridge.on('data', ({ message, counter }: { message: string, counter: number }) => this.setState({ message, counter }));
}
```

4. Add an event on the button click.

```tsx
handleClick = async () => {
  const counter = await bridge.increaseCounterAndToggleLabel(this.state.isTick);
  this.setState({ isTick: !this.state.isTick, counter });
};
```

### Change the dapplet

1. Implement the  IDappletApi interface, the same as in the React-based overlay.

```ts
interface IDappletApi {
  increaseCounterAndToggleLabel: (isTick: boolean) => Promise<number>,
}
```

2. Implement the overlay opening on the button click. To get the current overlay use `Core.overlay({ name: string, title: string })`.

```ts
const overlay = Core.overlay({ name: 'example-04-overlay', title: 'Example 4' });
```

3. Create an obgect that implements the interface. Write increaseCounterAndToggleLabel function. Declare the API in the overlay.

```ts
const dappletApi: IDappletApi = {
  increaseCounterAndToggleLabel: (isTick: boolean) => {
    ctx.counter = ctx.counter === undefined ? 1 : ctx.counter + 1;
    me.label = `${isTick ? 'tick' : 'tock'} ${ctx.counter}`;
    return ctx.counter;
  }
};
overlay.declare(dappletApi);
```

4. Send 'Hello, World!' message and ctx.counter to the overlay using 'data' event.

```ts
overlay.send('data', { message: 'Hello, World!', counter: ctx.counter });
```

There is also an `onClose` function. It allows to subscribe to the closing of the overlay.

```ts
overlay.onClose(() => console.log('The overlay closed!'));
```

5. Add to the `dapplet.json` manifest the following option:

```json
{
  ...
  "overlays": {
    "example-04-overlay": "http://localhost:3000"
  }
}
```

Before running install dependencies:

```bash
npm i
```

To run the dapplet with pure JS overlay, change `start` script in `package.json`:

```json
"start": "concurrently -c \"yellow,green\" -n \"dapplet,overlay\" \"rollup -w --config rollup.config.js\" \"cd pure-html-page && npx serve -l 3000\"",
```

To run the dapplet with ReactJS overlay, change `start` script to the following:

```json
"start": "concurrently -c \"yellow,blue\" -n \"dapplet,overlay\" \"rollup -w --config rollup.config.js\" \"cd overlayWithReact && npm start\"",
```

Run the dapplet

```bash
npm start
```

> **Note**
> To publish a dapplet with an overlay, you need `assets-manifest.json`. When an overlay is written in React, webpack or another module bundler builds it on its own. But when you write it in pure JS, you need to create the manifest yourself. As you can see, if you create a React based overlay from the example, the manifest will have the following structure:
> 
> ```json
> {
>   "index.html": "index.html",
>   "main.js": "main.js"
> }
> ```

Here is the result code of the example: [ex04-overlays-solution.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-solution)

This page in the docs is [here.](https://docs.dapplets.org/docs/overlays)
