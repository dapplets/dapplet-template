# Example 01: Extra button

[![Open in Gitpod!](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/dapplets/dapplet-template/tree/ex01-add-button-exercise)

The **basic template** for `your_dapplet/src/index.ts` looks like this:

```typescript
import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex01.png'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  activate() {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: (ctx) =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 1. Add label with counter for it.

            // LP end
            // LP: 2. Listen for the button click - output into console.
            //     3: Make counter incrementing on button click.
            exec: () => Core.alert('Hello, World!'),
            // LP end
          },
        }),
    })
  }
}
```

The dapplet injects a **button** to every Tweet on a Twitter page. This button is displayed below the main content, near the buttons _Like_, _Retweet_ etc. The function passed to `POST` takes `ctx` and returns the **widget**, the **array of widgets** or **null**.

`ctx` - is an _object_ that contains parameters of the current **context** where the dapplet widgets were injected. Parameters are defined by the adapter.

```typescript
POST:  (ctx) => [ button({ ... }) ]
```

or

```typescript
POST: (ctx) => button({})
```

Before using the `button` or/and other widgets in `this.adapter.attachConfig()` it has to be received
from `this.adapter.exports`.

This button has only one state - `DEFAULT`. In this case you can choose not to set the initial state and delete this field.

```typescript
button({
  DEFAULT: {
    img: EXAMPLE_IMG,
    exec: () => Core.alert('Hello, World!'),
  },
})
```

When you don’t have the `DEFAULT` state you have to set the `initial` state as above.

```typescript
button({
  initial: 'FIRST_STATE', // or SECOND_STATE

  // First state button
  FIRST_STATE: {
    img: LIKE_IMG,
    exec: () => Core.alert('Hello, World!'),
  },

  // Second state button
  SECOND_STATE: {
    img: DISLIKE_IMG,
    exec: () => Core.alert('Hello, World!'),
  },
})
```

The `label`, `img` and `exec` are defined in the state. In this case `exec` takes the function that will be executed with a
button click.

The whole list of **widgets** and **contexts** is defined in the adapter. The **twitter-config** API can be found [here](https://docs.dapplets.org/docs/adapters-docs-list).

In the first exercise we will add a counter to the button label in `POST`.

Let's implement counters for the buttons.

Add a label with a counter.

```ts
label: 0
```

Listen for the button click - output into console.

```ts
exec: async (ctx, me) => {
  console.log(ctx)
  console.log(me)
}
```

The extension provides **exec** function with two parameters:

- **ctx** — the current parsed context;
- **me** — a _Proxy_ of the widget.

We got the `ctx` object earlier so in our example we don't need to get it here.

Using `me` we can change the widget's parameters and its state.

```ts
// Changing the state
exec: (ctx, me) => (me.state = 'SECOND')

// Changing the label
exec: (ctx, me) => (me.label = 'Hello')
```

Increase the counter value on the button click.

```ts
me.label += 1
```

Let's display a message in the browser alert by clicking on the widget. We will also give an opportunity to customize the message text in the extension’s dapplet settings.

The dapplet settings are as follows:

![Dapplet's User Settings](https://docs.dapplets.org/assets/images/ex01_1-5fc9283e496636576d4dfb734f440067.png)

To do this, add the following code to the dapplet's `exec`:

```ts
const message1 = await Core.storage.get('exampleString')
const message2 = await Core.storage.get('exampleHiddenString')
Core.alert(`I wrote: ${message1}. Then wrote: ${message2}.`)
```

Here is the complete `exec` code:

```ts
exec: async (_, me) => {
  console.log(ctx)
  console.log(me)
  me.label += 1
  const message1 = await Core.storage.get('exampleString')
  const message2 = await Core.storage.get('exampleHiddenString')
  Core.alert(`I wrote: ${message1}. Then wrote: ${message2}.`)
}
```

In the `config/default.json` define your own defaults.

```json
{
  "main": {
    "exampleString": "some string value",
    "exampleHiddenString": "some string value"
  },
  "test": {
    "exampleString": "TEST: shown",
    "exampleHiddenString": "TEST: hidden"
  },
  "dev": {
    "exampleString": "some string value",
    "exampleHiddenString": "some string value"
  }
}
```

Run the dapplet in your terminal

```bash
npm start
```

![](https://docs.dapplets.org/assets/images/ex_1_2-83f3c3c0a0a6cc2ca4052fbc30feee62.gif)

> If you don't know how to run the dapplet in a browser, see [Get Started](https://docs.dapplets.org/docs/get-started#10-connect-the-development-server-to-the-dapplets-extension).

Here is the result code of the example: [ex01-add-button-solution](https://github.com/dapplets/dapplet-template/tree/ex01-add-button-solution)

> If you want to save counters' values and get them from the server look at [example 15](https://docs.dapplets.org/docs/server-connection).
