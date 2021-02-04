import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex04.png'

interface IDappletApi {
  // LP:  1. Implement the  IDappletApi interface, the same as in the React-based overlay.
  increaseCounterAndToggleLabel: (isTick: boolean) => number
  // LP end
}

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-config.dapplet-base.eth') public adapter: any

  public currentContext: { counter: number }
  private _currentProxy: { label: string }

  activate() {
    const { button } = this.adapter.exports
    // LP:  2. Create an overlay object using Core API: `Core.overlay({ name: string, title: string })`.
    const overlay = Core.overlay({ name: 'example-04-overlay', title: 'Example 4' })
    // LP end
    // LP:  3. Create an obgect that implements the interface. Write increaseCounterAndToggleLabel function. Declare the API in the overlay.
    const dappletApi: IDappletApi = {
      increaseCounterAndToggleLabel: (isTick: boolean) => {
        this.currentContext.counter =
          this.currentContext.counter === undefined ? 1 : this.currentContext.counter + 1
        this._currentProxy.label = `${isTick ? 'tick' : 'tock'} ${this.currentContext.counter}`
        return this.currentContext.counter
      },
    }
    overlay.declare(dappletApi)
    // LP end
    this.adapter.attachConfig({
      POST: (ctx) =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Open overlay',
            img: EXAMPLE_IMG,
            exec: async (_, proxy) => {
              // LP:  4. Save current context and proxy to the global variables to use them in `increaseCounterAndToggleLabel` function.
              this.currentContext = ctx
              this._currentProxy = proxy
              // LP end
              // LP:  5. By click open the overlay using `send()` method. Send 'Hello, World!' message and ctx.counter to the overlay using 'data' event.
              overlay.send('data', { message: 'Hello, World!', counter: ctx.counter })
              // LP end
            },
          },
        }),
    })
  }
}
