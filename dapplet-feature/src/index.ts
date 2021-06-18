import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';
import GRAY_IMG from './icons/icon19gray.png';
import HI_GIF from './imgs/giphy.gif';

@Injectable
export default class GoogleFeature {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  @Inject('yahoo-adapter.dapplet-base.eth') public adapter: any;

  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      MENU: (ctx) =>
        button({
          initial: 'RESULTS',
          RESULTS: {
            label: 'Hi',
            img: GRAY_IMG,
            tooltip: 'Hi, friend!',
            isActive: false,
            exec: (_, me) => {
              const el = document.querySelector(ctx.insertPoint);
              el.style.display = 'none';
              if (!('replacedEl' in ctx)) {
                ctx.replacedEl = document.createElement('div');
                ctx.replacedEl.style.justifyContent = 'center';
                const elImg = document.createElement('img');
                elImg.src = `${HI_GIF}`;
                ctx.replacedEl.appendChild(elImg);
                el.parentElement.appendChild(ctx.replacedEl);
              }
              ctx.replacedEl.style.display = 'flex';
              me.state = 'FRIENDS';
            },
          },
          FRIENDS: {
            label: 'Hi',
            img: EXAMPLE_IMG,
            tooltip: 'Go to results',
            isActive: true,
            exec: (_, me) => {
              const el = document.querySelector(ctx.insertPoint);
              el.style.display = 'block';
              ctx.replacedEl.style.display = 'none';
              me.state = 'RESULTS';
            },
          },
        }),
      SEARCH_RESULT: (ctx) =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Get data',
            tooltip: 'Show in the alert',
            img: EXAMPLE_IMG,
            exec: () => {
              const { title, link, description } = ctx;
              alert(`  title: ${title}\n  link: ${link}\n  description: ${description}`);
            },
          },
        }),
    });
  }
}
