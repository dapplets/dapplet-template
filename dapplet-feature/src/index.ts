import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';
import GRAY_IMG from './icons/icon19gray.png';
import GOOGLE_IMG from './icons/icon19google.png';
import HI_GIF from './imgs/giphy.gif';

@Injectable
export default class GoogleFeature {
    constructor(
        // LP: insert the correct adapter
        @Inject('')
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

                        // LP end
                    },
                }),
            ],
            // LP: 8. Add "result" to WIDGETS.

            // LP end
        });
    }
}
