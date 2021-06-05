import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    // LP: 11. Use async method `Core.storage.get(serverUrl: string)` to get server url.
    
    // LP End
    // LP: 12. Take a connection with server. Use `Core.connect<{ param }>({ url })`.

    // LP End
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: (ctx) => [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 1. Add label with counter for it.

            // LP end
            // LP: 2. Listen for the button click - output into console.
            //     3: Make counter incrementing on button click.
            exec: () => alert('Hello, World!'),
            // LP end
          },
        }),
      ],
    });
  }
}
