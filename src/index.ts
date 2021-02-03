import {} from '@dapplets/dapplet-extension';
import STAMP_IMG from './icons/fakeStamp.png';
import BADGE_IMG from './icons/angry-smile19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    // LP: 1. Get the element 'picture' from adapter
    const { button, picture } = this.adapter.exports;
    // LP end
    // $ returns object "me". Use it to change state or params of the other element
    // Example 1: exec: (ctx) => $(ctx, 'another_el_id').state = 'SECOND'
    // Example 2: exec: (ctx) => $(ctx, 'another_el_id').label = 'Hello'
    const { $ } = this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          id: 'button',
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'FAKE',
            img: BADGE_IMG,
            // LP: 2. Toggle the state “hidden/shown” of the picture on button click
            exec: (ctx) => {
              $(ctx, 'pic').hidden = !$(ctx, 'pic').hidden;
            },
            // LP end
          },
        }),
      ],
      // LP: 1. Add extra picture to POST_PICTURE
      POST_PICTURE: [
        picture({
          id: 'pic',
          initial: 'DEFAULT',
          DEFAULT: {
            img: STAMP_IMG,
            hidden: true,
          },
        }),
      ],
      // LP end
    });
  }
}
