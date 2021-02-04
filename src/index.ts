import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex13-19px.png'

// LP:  1. Implement an interface of the state with a counter and a text

// LP end

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  activate() {
    // LP:  2. Create a shared state

    // LP end
    // LP:  3. Then create an overlay typing with `IState` interface

    // LP end
    // LP:  4. Add home button with the overlay opening

    // LP end

    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: (ctx) => [
        button({
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP:  5.  Pass state's counter to the label parameter

            // LP end
            exec: () => {
              // LP:  6. Increse the counter and open the overlay
              // LP end
            },
          },
        }),
      ],
    })
  }
}
