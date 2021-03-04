import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';

@Injectable
export default class ViewportFeature {
  constructor(
    // LP: 5. Add a valid adapter.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
    @Inject('') public adapter: any, // LP end
  ) {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      BODY: [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Injected Button',
            img: EXAMPLE_IMG,
            // LP: 7. On button click show the popup

            // LP end
          },
        }),
        // LP: 6. Add popup with text, image and some link from the page

        // LP end
      ],
    });
  }
}
