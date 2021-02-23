import { IFeature } from '@dapplets/dapplet-extension';
import { Button } from './button';
import { Result } from './result';

@Injectable
export default class TwitterAdapter {

    public exports = featureId => ({
        button: this.adapter.createWidgetFactory(Button),
        result: this.adapter.createWidgetFactory(Result),
    });

    // LP: 1. implement communication between dapplets and pages
    public config = [
    {
        containerSelector: '#cnt, .ndYZfc',
        contextSelector: '#top_nav, .jZWadf',
        insPoints: {
            MENU: {
                selector: '.MUFPAc, .T47uwc',
                insert: 'inside',
            },
        },
        contextBuilder: () => ({
            insertPoint: '#rcnt, .mJxzWe',
        }),
    },
    {
        containerSelector: '#search',
        contextSelector: '.tF2Cxc',
        insPoints: {
            SEARCH_RESULT: {
                selector: '.yuRUbf',
                insert: 'inside',
            },
        },
        contextBuilder: (searchNode: any) => ({
            title: searchNode.querySelector('h3 > span').textContent,
            link: searchNode.querySelector('.yuRUbf > a').href,
            description: searchNode.querySelector('.IsZvec').textContent,
        }),
    },
    // LP: 6. Add new insertion point WIDGETS on the top of Google widgets.
    {
        containerSelector: '#search',
        contextSelector: '#rso',
        insPoints: {
            WIDGETS: {
                selector: '.ULSxyf',
                insert: 'begin',
            },
        },
        contextBuilder: () => ({
            searchQuery: document.title.slice(0, -16),
        }),
    },
    // LP end
    ];
    // LP end

    constructor(
        @Inject('dynamic-adapter.dapplet-base.eth')
        readonly adapter: any
    ) {
        this.adapter.configure(this.config);
    }

    public attachConfig(feature: IFeature): void {
        this.adapter.attachConfig(feature);
    }

    public detachConfig(feature: IFeature): void {
        this.adapter.detachConfig(feature);
    }
}
