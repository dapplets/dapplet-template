import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex06.png'

@Injectable
export default class TwitterFeature {
  @Inject('common-config.dapplet-base.eth')
  public adapter

  activate() {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      BODY: () =>
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
