import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex09.png'

@Injectable
export default class ViewportFeature {
  // LP: 5. Add a valid adapter
  @Inject('')
  public adapter: any
  // LP end

  async activate(): Promise<void> {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      BODY: (ctx) => [
        button({
          // LP: 6. Add button
          // LP end
        }),
      ],
    })
  }
}
