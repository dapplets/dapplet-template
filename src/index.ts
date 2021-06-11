import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/smile19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  async activate() {
    // LP: 11. Use async method `Core.storage.get(serverUrl: string)` to get server url.
    const serverUrl = await Core.storage.get('serverUrl');
    // LP End
    // LP: 12. Take a connection with server. Use `Core.connect<{ param }>({ url })`.
    const server = Core.connect<{ amount: string }>({ url: serverUrl });
    // LP End
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: (ctx) =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 1. Add label with counter for it.
            label: server.amount,
            // LP end
            // LP: 2. Listen for the button click - output into console.
            //     3: Make counter incrementing on button click.
            exec: () => server.send('increment', ctx.id),
            // LP end
          },
        }),
    });
  }
}
