import { } from '@dapplets/dapplet-extension'
//import { T_TwitterFeatureConfig, ITwitterAdapter } from '@dapplets/twitter-adapter'
import EXAMPLE_IMG from './icons/icon19.png'

@Injectable
export default class TwitterFeature {
    constructor(
        @Inject("twitter-adapter.dapplet-base.eth")
        public adapter: any //ITwitterAdapter;
    ) {
        const { button } = this.adapter.exports;

        this.adapter.attachConfig({
            POST_SOUTH: [
                button({
                    initial: "DEFAULT",
                    "DEFAULT": {
                        label: "Injected Button",
                        exec: (ctx, me) => alert('Hello, World!'),
                        img: EXAMPLE_IMG
                    }
                })
            ]
        });
    }

    public activate() {
        this.adapter.attachFeature(this);
    }

    public deactivate() {
        this.adapter.detachFeature(this);
    }
}