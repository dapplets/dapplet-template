import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';
import DARK from './icons/icon19_dark.png';
import LIGHT from './icons/icon19_light.png';
import BIG_IMG from './icons/icon64.png';
import BOY from './icons/uzumaki.jpeg';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    const { avatar, avatarBadge, usernameBadge, label, button, picture, caption } = this.adapter.exports;
    const config = {
      /* This is also the correct way to use it:
      QUOTE_POST: (repostCtx) => [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'repost',
            img: EXAMPLE_IMG,
            exec: () => {
              console.log('repostCtx = ', repostCtx)
              console.log('parent ctx = ', repostCtx.parent)
            },
          },
        }),
      ],
      */
      POST: (ctx) => [
        {
          QUOTE_POST: (repostCtx) => [
            button({
              initial: 'DEFAULT',
              DEFAULT: {
                label: 'repost',
                img: EXAMPLE_IMG,
                exec: () => {
                  console.log('repostCtx = ', repostCtx)
                  console.log('parent ctx = ', repostCtx.parent)
                },
              },
            }),
          ],
        },
        // STARTER
        [
          {
            label: 'Add tweet to the Ethereum registry',
            exec: (ctx) => console.log('ctx1 = ', ctx),
          },
          {
            label: 'Add tweet to the NEAR registry',
            exec: (ctx) => console.log('ctx2 = ', ctx),
          },
          {
            label: 'Add tweet to the Swarm',
            exec: (ctx) => console.log('ctx3 = ', ctx),
          },
        ],
        avatar({
          initial: 'DEFAULT',
          DEFAULT: {
            img: BOY,
          },
        }),
        usernameBadge({
          initial: 'DEFAULT',
          DEFAULT: {
            img: { DARK, LIGHT },
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
        avatarBadge({
          initial: 'DEFAULT',
          DEFAULT: {
            vertical: 'bottom',
            horizontal: 'right',
            img: { DARK, LIGHT },
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'button',
            img: EXAMPLE_IMG,
            exec: () => {
              $(ctx, 'pic').hidden = !$(ctx, 'pic').hidden;
            },
          },
        }),
        label({
          initial: 'DEFAULT',
          DEFAULT: {
            basic: true,
            img: EXAMPLE_IMG,
            text: 'label',
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
        picture({
          id: 'pic',
          initial: 'DEFAULT',
          DEFAULT: {
            img: BIG_IMG,
          },
        }),
        caption({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            text: 'caption',
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
      ],
      PROFILE: async (ctx) => [
        avatar({
          initial: 'DEFAULT',
          DEFAULT: {
            img: BOY,
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
        usernameBadge({
          initial: 'DEFAULT',
          DEFAULT: {
            img: BIG_IMG,
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
        avatarBadge({
          initial: 'DEFAULT',
          DEFAULT: {
            vertical: 'bottom',
            horizontal: 'right',
            img: BIG_IMG,
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: BIG_IMG,
            label: 'button#1',
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: BIG_IMG,
            label: 'button#2',
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
      ],
      HEADING: (ctx) => [
        usernameBadge({
          initial: 'DEFAULT',
          DEFAULT: {
            img: BIG_IMG,
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
      ],
      SUSPENDED: (ctx) => [
        avatar({
          initial: 'DEFAULT',
          DEFAULT: {
            img: BOY,
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
        usernameBadge({
          initial: 'DEFAULT',
          DEFAULT: {
            img: BIG_IMG,
            exec: () => {
              console.log('ctx = ', ctx);
            },
          },
        }),
      ],
    };
    const { $ } = this.adapter.attachConfig(config);
  }
}
