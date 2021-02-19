import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';

@Injectable
export default class TwitterFeature {
    constructor(
        @Inject('twitter-adapter.dapplet-base.eth')
        public adapter: any //ITwitterAdapter;
    ) {
        const { button } = this.adapter.exports;
        this.adapter.attachConfig({
            POST_SOUTH: [
                button({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        label: 'Injected Button',
                        img: EXAMPLE_IMG,
                        exec: (ctx, me) => alert('Hello, World!'),
                    },
                }),
            ],
        });
    }

    public activate() {
        this.adapter.attachFeature(this);
    }

    public deactivate() {
        this.adapter.detachFeature(this);
    }
}
