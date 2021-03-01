# Example 03: Insertion points

In this example we add two elements at different insertion points that interact.

The initial code for this example is here: [ex03-insertion-points-exercise](https://github.com/dapplets/dapplet-template/tree/ex03-insertion-points-exercise).

Here is `src/index.ts`:

```ts
import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    // LP: 1. Get the element 'picture' from adapter
    const { button } = this.adapter.exports;
    // LP end
    const { $ } = this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          id: 'button',
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Injected Button',
            img: EXAMPLE_IMG,
            // LP: 2. Toggle the state “hidden/shown” of the picture on button click

            // LP end
          },
        }),
      ],
      // LP: 1. Add extra picture to POST_PICTURE and make it hidden by default

      // LP end
    });
  }
}
```
`$(ctx, 'element_id')` returns object "me". Use it to change state or params of the other element by it's **id**.
- *Example 1:* `exec: (ctx) => $(ctx, 'another_el_id').state = 'SECOND'`
- *Example 2:* `exec: (ctx) => $(ctx, 'another_el_id').label = 'Hello'`

Get the element 'picture' from the adapter

```ts
const { button, picture } = this.adapter.exports;
```

Add an extra picture to POST_PICTURE and make it hidden by default.

```ts
POST_PICTURE: [
  picture({
    id: 'pic',
    initial: 'DEFAULT',
    DEFAULT: {
      img: STAMP_IMG,
      hidden: true,
    },
  }),
],
```

Toggle the state "hidden/shown" of the picture on button click.

```ts
exec: (ctx) => {
  $(ctx, 'pic').hidden = !$(ctx, 'pic').hidden;
},
```

Result:

```ts
import {} from '@dapplets/dapplet-extension';
import STAMP_IMG from './icons/fakeStamp.png';
import BADGE_IMG from './icons/angry-smile19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    // LP: 1. Get the element 'picture' from adapter
    const { button, picture } = this.adapter.exports;
    // LP end
    const { $ } = this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          id: 'button',
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'FAKE',
            img: BADGE_IMG,
            // LP: 2. Toggle the state “hidden/shown” of the picture on button click
            exec: (ctx) => {
              $(ctx, 'pic').hidden = !$(ctx, 'pic').hidden;
            },
            // LP end
          },
        }),
      ],
      // LP: 1. Add extra picture to POST_PICTURE
      POST_PICTURE: [
        picture({
          id: 'pic',
          initial: 'DEFAULT',
          DEFAULT: {
            img: STAMP_IMG,
            hidden: true,
          },
        }),
      ],
      // LP end
    });
  }
}
```

Here is the result code of the example: [ex03-insertion-points-solution](https://github.com/dapplets/dapplet-template/tree/ex03-insertion-points-solution).

Run the dapplet:

```bash
npm i
npm start
```

In the browser:

![video](https://user-images.githubusercontent.com/43613968/118822366-c5669c80-b8c0-11eb-89e6-da0fcef6ea69.gif)
