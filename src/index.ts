import { IFeature } from '@dapplets/dapplet-extension'
import { sayHello } from './helper';
//import { T_TwitterFeatureConfig, ITwitterAdapter } from '@dapplets/twitter-adapter'
import FAKESTAMP_PIC from './fakeStamp.png'

@Injectable
export default class TwitterFeature implements IFeature {

    @Inject("twitter-adapter.dapplet-base.eth")
    public adapter: any; //ITwitterAdapter;
    public config: any; //T_TwitterFeatureConfig;

    constructor() {
        const { button } = this.adapter.widgets;
        this.config = {
            TWEET_SOUTH: [
                button({
                    initial: "DEFAULT",
                    "DEFAULT": {
                        label: "Template",
                        exec: (ctx, me) => {
                            sayHello();
                        },
                        image: FAKESTAMP_PIC
                    }
                })
            ]
        };
    }

    public activate() {
        this.adapter.attachFeature(this);
    }

    public deactivate() {
        this.adapter.detachFeature(this);
    }
}