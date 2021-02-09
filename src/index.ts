import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex05.png'

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any

  async activate() {
    // LP: 1. Get the **wallet** object and common variables: `transferAmountEth`, `transferAmountNear` and `currentEthAddresses`

    // LP end

    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: () => {
        return button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Connect',
            img: EXAMPLE_IMG,
            // LP: 3. Connect the wallet

            // LP end
          },
          // LP: 2. Add states ETH_CONNECTED, NEAR_CONNECTED, COMPLETED, FAILURE, REJECTED, PENDING and MINING

          // LP end
        })
      },
    })
  }
}
