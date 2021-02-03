import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex01.png'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  activate() {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: (ctx) =>
        button({
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 1. Add label with counter for it.

            // LP end
            // LP: 2. Listen for the button click - output into console.
            //     3: Make counter incrementing on button click.
            exec: () => Core.alert('Hello, World!'),
            // LP end
          },
        }),
    })
  }
}
