import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';

@Injectable
export default class TwitterFeature {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
    @Inject('twitter-adapter.dapplet-base.eth') public adapter: any,
  ) {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Open overlay',
            img: EXAMPLE_IMG,
            // LP:  1. Implement overlay opening on button click
            //      2. Send some data to overlay and get collback 'onClick'
            //      3. In callback increse current counter and add received message to label
            exec: (ctx, me) => {
              const overlay = Core.overlay({ name: 'exercise-12-overlay', title: 'Exercise 12' });
              overlay.sendAndListen('data', 'Hello, World!', {
                onClick: (op, { message }) => {
                  ctx.counter = ctx.counter === undefined ? 1 : ctx.counter + 1;
                  me.label = `${message} ${ctx.counter}`;
                },
              });
            },
            // LP end
          },
        }),
      ],
    });
  }
}
