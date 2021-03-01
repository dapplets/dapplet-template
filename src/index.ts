import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex03.png'
import BADGE_IMG from './icons/gold-eth.jpg'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  async activate() {
    // LP: 1. Get the widget "avatarBadge" from adapter
    const { button, avatarBadge } = this.adapter.exports
    // LP end
    // $ returns object "me". Use it to change state or params of the other widget
    // Example 1: exec: () => $(ctx, 'another_el_id').state = 'SECOND'
    // Example 2: exec: () => $(ctx, 'another_el_id').label = 'Hello'
    const { $ } = this.adapter.attachConfig({
      POST: (ctx) => [
        button({
          DEFAULT: {
            label: 'GOLD',
            img: EXAMPLE_IMG,
            // LP: 3. Toggle the state “hidden/shown” of the "avatarBadge" widget on button click
            exec: () => {
              $(ctx, 'badge').hidden = !$(ctx, 'badge').hidden
            },
            // LP end
          },
        }),
        // LP: 2. Add extra "avatarBadge" widget and make it hidden by default
        avatarBadge({
          id: 'badge',
          initial: 'DEFAULT',
          DEFAULT: {
            img: BADGE_IMG,
            vertical: 'bottom',
            horizontal: 'right',
            hidden: true,
            exec: () => console.log(ctx),
          },
        }),
        // LP end
      ],
    })
  }
}
