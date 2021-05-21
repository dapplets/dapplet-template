import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';
import BIG_IMG from './icons/icon64.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    const { badge, label, button, picture } = this.adapter.exports;
    const config = {
      // TIMELINE: async (timelineCtx, me) => {
        // ...userData = await Server.get();
        TWEET: (ctx, me) => [
          // ...tweetData = await Server.get(userData);
          badge({
            initial: 'DEFAULT',
            DEFAULT: {
              vertical: 'bottom',
              horizontal: 'right',
              img: EXAMPLE_IMG,
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
          button({
            initial: 'DEFAULT',
            DEFAULT: {
              label: 'new',
              img: EXAMPLE_IMG,
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
          label({
            initial: 'DEFAULT',
            DEFAULT: {
              basic: true,
              img: EXAMPLE_IMG,
              text: 'new label',
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
          picture({
            initial: 'DEFAULT',
            DEFAULT: {
              img: BIG_IMG,
            },
          }),
        ],
        PROFILE: async (ctx, me) => [
          badge({
            initial: 'DEFAULT',
            DEFAULT: {
              vertical: 'bottom',
              horizontal: 'right',
              img: BIG_IMG,
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
          button({
            initial: 'DEFAULT',
            DEFAULT: {
              img: BIG_IMG,
              label: 'new#1',
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
          button({
            initial: 'DEFAULT',
            DEFAULT: {
              img: BIG_IMG,
              label: 'new#2',
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
        ],

        // old design support
        PROFILE_AVATAR_BADGE: async (ctx, me) => [
          badge({
            initial: 'DEFAULT',
            DEFAULT: {
              vertical: 'bottom',
              horizontal: 'left',
              img: BIG_IMG,
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
        ],
        POST_SOUTH: async (ctx, me) => [
          button({
            initial: 'DEFAULT',
            DEFAULT: {
              label: 'old#1',
              img: EXAMPLE_IMG,
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
          button({
            initial: 'DEFAULT',
            DEFAULT: {
              label: 'old#2',
              img: EXAMPLE_IMG,
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
        ],
        PROFILE_BUTTON_GROUP: async (ctx, me) => [
          button({
            initial: 'DEFAULT',
            DEFAULT: {
              label: 'old',
              img: EXAMPLE_IMG,
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
        ],
        POST_USERNAME_LABEL: async (ctx, me) => 
          label({
            initial: 'DEFAULT',
            DEFAULT: {
              basic: true,
              img: EXAMPLE_IMG,
              text: 'old label',
              exec: () => {
                console.log('ctx = ', ctx);
                console.log('me = ', me);
              },
            },
          }),
      //}
    };
    this.adapter.attachConfig(config);
  }
}
