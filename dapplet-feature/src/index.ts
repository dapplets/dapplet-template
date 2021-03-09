import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex10.png'

@Injectable
export default class GoogleFeature {
  // LP: 6. Change injecting of Google adapter to Virtual adapter
  @Inject('example-google-adapter.dapplet-base.eth')
  public adapter
  // LP end

  async activate(): Promise<void> {
    const { button, avatarBadge } = this.adapter.exports
    this.adapter.attachConfig({
      POST: (ctx) =>
        button({
          DEFAULT: {
            label: 'Hi',
            img: EXAMPLE_IMG,
            tooltip: 'Show alert',
            exec: () => {
              console.log('ctx:', ctx)
              Core.alert('Title: ' + ctx.title)
            },
          },
        }),
      PROFILE: (ctx) =>
        avatarBadge({
          DEFAULT: {
            vertical: 'bottom',
            horizontal: 'right',
            img: EXAMPLE_IMG,
            exec: () => console.log('ctx:', ctx),
          },
        }),
    })
  }
}
