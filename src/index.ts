import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';
// import ICON_LOADING from './icons/loading.svg';

@Injectable
export default class TwitterFeature {
  // LP: define variables `wallet`, `_currentAddress` and `_transferAmount`

  // LP end
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
            label: 'Connect',
            img: EXAMPLE_IMG,
            // LP: 1. Open wallet

            // LP end
          },
          // LP: 2. Add states CONNECTED, PENDING, REGECTED, COMPLETED and UNAVAILABLE.
          // LP: 3. Send the necessary data to wallet and listen for the answer.
          // LP: 4. Show the state of the transaction

          // LP end
        }),
      ],
    });
  }
}
