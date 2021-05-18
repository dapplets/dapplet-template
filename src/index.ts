import {} from '@dapplets/dapplet-extension'
import LIGHT_IMG from './icons/ex12.png'
import DARK_IMG from './icons/ex12_inverted.png'

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
            label: 'Injected Button',
            img: {
              LIGHT: LIGHT_IMG,
              DARK: DARK_IMG,
            },
            exec: () => Core.alert('Hello, Themes!'),
          },
        }),
    })
  }
}
