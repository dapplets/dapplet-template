import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex15-19px.png'

// LP: 2.1 Implement IDappState interface
interface IDappState {
  amount: any
}
// LP end

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-config.dapplet-base.eth') public adapter: any

  async activate() {
    // LP: 1. Get the URL from the config. Use Core.storage
    const serverUrl = await Core.storage.get('serverUrl')
    // LP end
    // LP: 2.2 Create a connection with the server. Use Core.connect. Also create a common state
    const defaultState: IDappState = { amount: 0 }
    const server = Core.connect<IDappState>({ url: serverUrl }, defaultState)
    const state = Core.state<IDappState>(defaultState)
    // LP end

    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: (ctx: { id: string }) => {
        // LP: 3. Pass observable value of server's state to common state
        state[ctx.id].amount.next(server.state[ctx.id].amount)
        // LP end
        return button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 4. Pass observable counter to the label and in `exec` increase its value
            label: state[ctx.id].amount.value,
            // label: server.state[ctx.id].amount, // alternative usage
            exec: () => server.send('increment', ctx.id),
            // LP end
          },
        })
      },
    })
  }
}
