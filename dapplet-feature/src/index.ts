import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex09.png'

@Injectable
export default class ViewportFeature {
  // LP: 5. Add a valid adapter
  @Inject('example-viewport-adapter.dapplet-base.eth')
  public adapter: any
  // LP end

  async activate(): Promise<void> {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      BODY: (ctx) => [
        button({
          // LP: 6. Add button
          initial: 'DEFAULT',
          id: 'button',
          DEFAULT: {
            label: 'GOOGLE_EXAMPLE',
            img: EXAMPLE_IMG,
            exec: () => Core.alert(ctx.websiteName),
          },
          // LP end
        }),
      ],
    })
  }
}
