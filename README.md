# Example 02: Button State Machine

Let's change button state on its click.

Here is `src/index.ts`:

```ts
import {} from '@dapplets/dapplet-extension';
import COOL_BADGE_IMG from './icons/smile19.png';
// import ANGRY_BADGE_IMG from './icons/angry-smile19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Fake',
            img: COOL_BADGE_IMG,
            // LP: 2. Add function toggling the button state

            // LP end
          },
          // LP: 1. Add another state to the button

          // LP end
        }),
      ],
    });
  }
}
```

Firstly add another state with a different badge to the button.

```ts
ANOTHER: {
  label: 'FAKE!!!',
  img: ANGRY_BADGE_IMG,
  exec: (ctx, me) => (me.state = 'DEFAULT'),
},
```

Secondary implement toggling states on button click.

```ts
exec: (ctx, me) => (me.state = 'ANOTHER'),
```

Result:

```ts
import {} from '@dapplets/dapplet-extension';
import COOL_BADGE_IMG from './icons/smile19.png';
import ANGRY_BADGE_IMG from './icons/angry-smile19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Fake',
            img: COOL_BADGE_IMG,
            // LP: 2. Add function toggling the button state
            exec: (ctx, me) => (me.state = 'ANOTHER'),
            // LP end
          },
          // LP: 1. Add another state to the button
          ANOTHER: {
            label: 'FAKE!!!',
            img: ANGRY_BADGE_IMG,
            exec: (ctx, me) => (me.state = 'DEFAULT'),
          },
          // LP end
        }),
      ],
    });
  }
}
```
This page in the docs is [here.](https://docs.dapplets.org/docs/state-machine)

Run the dapplet:

```bash
npm i
npm start
```

In the browser:

![ex02-state-machine](https://user-images.githubusercontent.com/43613968/118810099-23d94e00-b8b4-11eb-8c60-446a53372d68.gif)
