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
            label: 0,
            // LP end
            // LP: 2. Listen for the button click - output into console.
            //     3: Make counter incrementing on button click.
            exec: async (_, me) => {
              console.log(ctx)
              console.log(me)
              me.label += 1
              const message1 = await Core.storage.get('exampleString')
              const message2 = await Core.storage.get('exampleHiddenString')
              Core.alert(`I wrote: ${message1}. Then wrote: ${message2}.`)
            },
          },
        }),
    })
  }
}
