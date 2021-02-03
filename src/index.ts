import {} from '@dapplets/dapplet-extension';
import COOL_BADGE_IMG from './icons/smile19.png';
// import ANGRY_BADGE_IMG from './icons/angry-smile19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Fake',
            img: COOL_BADGE_IMG,
            // LP: 2. Add function toggling the button state

            // LP end
          },
          // LP: 1. Add another state to the button

          // LP end
        }),
      ],
    });
  }
}
