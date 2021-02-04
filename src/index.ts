import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';

@Injectable
export default class TwitterFeature {
    // LP: Add storage for counters
    private counters = {};
    // LP end
    constructor(
        @Inject('twitter-adapter.dapplet-base.eth')
        public adapter: any
    ) {
        const { button } = this.adapter.exports;
        this.adapter.attachConfig({
            POST_SOUTH: [
                button({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        label: 'Open overlay',
                        img: EXAMPLE_IMG,
                        // LP: Add counter initialisation
                        init: (ctx) => {
                            if (!this.counters.hasOwnProperty(ctx.id)) {
                                this.counters[ctx.id] = 0;
                            }
                        },
                        // LP end
                        // LP:  1. Implement overlay opening on button click
                        //      2. Send some data to overlay and get collback 'onClick'
                        //      3. In callback increse current counter and add received message to label
                        exec: async (ctx, me) => {
                            const overlayUrl = await Core.storage.get('overlayUrl');
                            const overlay = Core.overlay({ url: overlayUrl, title: 'Overlay' });
                            overlay.sendAndListen('data', 'Hello, World!', {
                                'onClick': (op, { type, message }) => {
                                    this.counters[ctx.id] += 1;
                                    me.label = `${message} ${this.counters[ctx.id]}`;
                                }
                            });
                        },
                        // LP end
                    },
                }),
            ],
        });
    }
}
