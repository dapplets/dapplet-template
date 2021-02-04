import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex04.png'

interface IDappletApi {
  // LP:  1. Implement the  IDappletApi interface, the same as in the React-based overlay.
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

    // LP end
    // LP:  3. Create an obgect that implements the interface. Write increaseCounterAndToggleLabel function. Declare the API in the overlay.

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
              // LP end
              // LP:  5. By click open the overlay using `send()` method. Send 'Hello, World!' message and ctx.counter to the overlay using 'data' event.
              // LP end
            },
          },
        }),
    })
  }
}
