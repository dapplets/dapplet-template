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
    const sessions = await Core.sessions()
    sessions.forEach((x) => x.logout())
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
      this.overlay.open()
      // LP end
      // LP: 3. Create new Ethereum session or reuse existing
      const prevSessions = await Core.sessions()
      const prevSession = prevSessions.find((x) => x.authMethod === 'ethereum/goerli')
      const session =
        prevSession ??
        (await Core.login({ authMethods: ['ethereum/goerli'], target: this.overlay }))
      // LP end
      // LP: 4. Ethereum wallet interaction
      const wallet = await session.wallet()
      const accountIds = await wallet.request({ method: 'eth_accounts', params: [] })
      console.log('Your Ethereum addresses', accountIds)
      // LP end
      // LP: 5. Ethereum contract interaction
      const contract = await session.contract('0x7702aE3E1E0a96A428052BF3E4CB94965F5C0d7F', ABI)
      const posts = await contract.getTweets(accountIds[0]) // read
      console.log('Posts from Ethereum contract', posts)
      await contract.addTweet(JSON.stringify(ctx)) // write
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
      this.overlay.open()
      // LP end
      // LP: 7. Create new NEAR session or reuse existing
      const prevSessions = await Core.sessions()
      const prevSession = prevSessions.find((x) => x.authMethod === 'near/testnet')
      const session =
        prevSession ??
        (await Core.login({
          authMethods: ['near/testnet'],
          secureLogin: 'required',
          contractId: 'dev-1634890606019-41631155713650',
          target: this.overlay,
        }))
      // LP end
      // LP: 8. NEAR wallet interaction
      const wallet = await session.wallet()
      console.log('wallet', wallet)
      console.log('Your NEAR address', wallet.accountId)
      // LP end
      // LP: 9. NEAR contract interaction
      const contract = await session.contract('dev-1634890606019-41631155713650', {
        viewMethods: ['getTweets'],
        changeMethods: ['addTweet', 'removeTweet'],
      })
      const posts = await contract.getTweets({ nearId: wallet.accountId }) // read
      console.log('Posts from NEAR contract', posts)
      await contract.addTweet({ tweet: JSON.stringify(ctx) }) // write
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
