import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex07.png'

@Injectable
export default class TwitterFeature {
  @Inject('social-virtual-config.dapplet-base.eth')
  public adapter

  activate() {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: () =>
        button({
          DEFAULT: {
            label: 'Injected Button',
            img: EXAMPLE_IMG,
            exec: () => Core.alert('Hello, World!'),
          },
        }),
    })
  }
}
