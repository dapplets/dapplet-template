import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex09.png';

@Injectable
export default class ViewportFeature {
  // LP: 5. Add a valid adapter.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('example-viewport-adapter.dapplet-base.eth') public adapter: any; // LP end

  activate() {
    const { button, popup } = this.adapter.exports;
    const { $ } = this.adapter.attachConfig({
      BODY: (ctx) => [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Injected Button',
            img: EXAMPLE_IMG,
            // LP: 7. On button click show the popup
            exec: () => ($(ctx, 'popup').closed = false),
            // LP end
          },
        }),
        // LP: 6. Add popup with text, image and some link from the page
        popup({
          id: 'popup',
          initial: 'DEFAULT',
          DEFAULT: {
            text: 'The link opens this page in a new tab',
            img: EXAMPLE_IMG,
            init: (_, me) => (me.link = ctx.id),
          },
        }),
        // LP end
      ],
    });
  }
}
