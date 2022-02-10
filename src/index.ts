import {} from '@dapplets/dapplet-extension'
import NEAR_ICON from './icons/near.svg'
import ETHEREUM_ICON from './icons/ethereum.svg'
import ABI from './abi'

@Injectable
export default class Dapplet {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter
  public $

  private overlay = Core.overlay({ name: 'main', title: 'Example 14' })

  async activate() {
    // LP: 1. Log out of all existing sessions
    // LP end

    const { button } = this.adapter.exports
    const { $ } = this.adapter.attachConfig({
      POST: () => [
        button({
          id: 'eth-btn',
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Ethereum',
            img: ETHEREUM_ICON,
            exec: this.ethereumButtonClickHandler,
          },
        }),
        button({
          id: 'near-btn',
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'NEAR',
            img: NEAR_ICON,
            exec: this.nearButtonClickHandler,
          },
        }),
      ],
    })
    this.$ = $
  }

  ethereumButtonClickHandler = async (ctx, me) => {
    me.loading = true
    me.disabled = true
    this.$(ctx, 'near-btn').disabled = true
    try {
      // LP: 2. Open overlay if you want to show login popup in it
      // LP end
      // LP: 3. Create new Ethereum session or reuse existing
      // LP end
      // LP: 4. Ethereum wallet interaction
      // LP end
      // LP: 5. Ethereum contract interaction
      // LP end
      Core.alert('Transaction sent')
    } catch (error) {
      console.error(error)
    }
    me.loading = false
    me.disabled = false
    this.$(ctx, 'near-btn').disabled = false
  }

  nearButtonClickHandler = async (ctx, me) => {
    me.loading = true
    me.disabled = true
    this.$(ctx, 'eth-btn').disabled = true
    try {
      // LP: 6. Open overlay if you want to show login popup in it
      // LP end
      // LP: 7. Create new NEAR session or reuse existing
      // LP end
      // LP: 8. NEAR wallet interaction
      // LP end
      // LP: 9. NEAR contract interaction
      // LP end
      Core.alert('Transaction sent')
    } catch (error) {
      console.error(error)
    }
    me.loading = false
    me.disabled = false
    this.$(ctx, 'eth-btn').disabled = false
  }
}
