import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';
import GRAY_IMG from './icons/icon19gray.png';
import GOOGLE_IMG from './icons/icon19google.png';
import HI_GIF from './imgs/giphy.gif';

@Injectable
export default class GoogleFeature {
    private replacedEl: HTMLElement;
    constructor(
        // LP: insert the correct adapter
        @Inject('google-adapter.dapplet-base.eth')
        // LP end
        public adapter: any
    ) {
        const { button } = this.adapter.exports;
        this.adapter.attachConfig({
            MENU: [
                button({
                    initial: 'RESULTS',
                    // LP: 5. implement two states:
                    //          a. replace search results with HI_GIF
                    //          b. return to default results
                    RESULTS: {
                        label: 'Hi',
                        img: GRAY_IMG,
                        tooltip: 'Hi, friend!',
                        isActive: false,
                        exec: (ctx, me) => {
                            const el = document.querySelector(ctx.insertPoint);
                            el.style.display = 'none';
                            if (!this.replacedEl) {
                                this.replacedEl = document.createElement('div');
                                this.replacedEl.style.justifyContent = 'center';
                                const elImg = document.createElement('img');
                                elImg.src = `${HI_GIF}`;
                                this.replacedEl.appendChild(elImg);
                                el.parentElement.appendChild(this.replacedEl);
                            }
                            this.replacedEl.style.display = 'flex';
                            me.state = 'FRIENDS';
                        },
                    },
                    FRIENDS: {
                        label: 'Hi',
                        img: GOOGLE_IMG,
                        tooltip: 'Go to results',
                        isActive: true,
                        exec: (ctx, me) => {
                            const el = document.querySelector(ctx.insertPoint);
                            el.style.display = 'block';
                            this.replacedEl.style.display = 'none';
                            me.state = 'RESULTS';
                        },
                    },
                    // LP end
                }),
            ],
            SEARCH_RESULT: [
                button({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        label: 'Get data',
                        tooltip: 'Show in the alert',
                        img: EXAMPLE_IMG,
                        // LP: 4. add the execution - allert with search results: title, link, description
                        exec: (ctx) => {
                            const { title, link, description} = ctx;
                            alert(`  title: ${title}\n  link: ${link}\n  description: ${description}`);
                        },
                        // LP end
                    },
                }),
            ],
            // LP: 8. Add "result" to WIDGETS.

            // LP end
        });
    }
}
