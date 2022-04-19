import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex04.png';

interface IDappletApi {
  // LP:  1. Implement the  IDappletApi interface, the same as in the React-based overlay.
  increaseCounterAndToggleLabel: (isTick: boolean) => Promise<number>,
  // LP end
}

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;

  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: (ctx) =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Open overlay',
            img: EXAMPLE_IMG,
            exec: async (_, me) => {
              // LP:  2. Implement the overlay opening on the button click. To get the current overlay use `Core.overlay({ name: string, title: string })`.
              const overlay = Core.overlay({ name: 'example-04-overlay', title: 'Example 4' });
              // LP end

              // LP:  3. Create an obgect that implements the interface. Write increaseCounterAndToggleLabel function. Declare the API in the overlay.
              const dappletApi: IDappletApi = {
                increaseCounterAndToggleLabel: (isTick: boolean) => {
                  ctx.counter = ctx.counter === undefined ? 1 : ctx.counter + 1;
                  me.label = `${isTick ? 'tick' : 'tock'} ${ctx.counter}`;
                  return ctx.counter;
                }
              };

              overlay.declare(dappletApi);
              // LP end

              // LP:  4. Send 'Hello, World!' message and ctx.counter to the overlay using 'data' event.
              overlay.send('data', { message: 'Hello, World!', counter: ctx.counter });
              // LP end

              overlay.onClose(() => console.log('The overlay closed!'));
            },
          },
        }),
    });
  }
}
