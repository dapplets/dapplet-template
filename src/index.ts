import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/dapplet-icon.png'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  activate() {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: () =>
        button({
          DEFAULT: {
            id: 'button',
            label: 'Injected Button',
            img: EXAMPLE_IMG,
            exec: () => Core.alert('Hello, World!'),
          },
        }),
    })
  }
}
