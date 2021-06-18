import { IFeature } from '@dapplets/dapplet-extension';
import { Button } from './button';
import { Result } from './result';

type ContextBuilder = {
  [propName: string]: string;
};
type Exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
};

@Injectable
export default class YahooAdapter {
  public exports = (): Exports => ({
    button: this.adapter.createWidgetFactory(Button),
    result: this.adapter.createWidgetFactory(Result),
  });

  // LP: 1. implement communication between dapplets and pages
  public config = {
    MENU: {
      containerSelector: '#doc',
      contextSelector: '#ys',
      insPoints: {
        MENU: {
          selector: '.compList > ul',
          insert: 'inside',
        },
      },
      contextBuilder: (): ContextBuilder => ({
        id: '',
        insertPoint: '#bd',
      }),
    },
    SEARCH_RESULT: {
      containerSelector: '#left',
      contextSelector: '.relsrch',
      insPoints: {
        SEARCH_RESULT: {
          selector: '.relsrch h3',
          insert: 'inside',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextBuilder: (searchNode: any): ContextBuilder => ({
        id: searchNode.querySelector('a').href,
        title: searchNode.querySelector('a').textContent,
        link: searchNode.querySelector('a').href,
        description: searchNode.querySelector('.compText, .compList').textContent,
      }),
    },
    DAPPLET_SEARCH_RESULT: {
      containerSelector: '#dapplet-search-widget',
      contextSelector: '.relsrch-dapp',
      insPoints: {
        DAPPLET_SEARCH_RESULT: {
          selector: '.relsrch-dapp h3',
          insert: 'inside',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextBuilder: (searchNode: any): ContextBuilder => ({
        id: searchNode.querySelector('a').href,
        title: searchNode.querySelector('a').textContent,
        link: searchNode.querySelector('a').href,
        description: searchNode.querySelector('.compText, .compList').textContent,
      }),
    },
    // LP: 6. Add new insertion point WIDGETS on the top of Google widgets.
    WIDGETS: {
      containerSelector: '#left',
      contextSelector: '#main',
      insPoints: {
        WIDGETS: {
          selector: 'div',
          insert: 'begin',
        },
      },
      contextBuilder: (): ContextBuilder => ({
        id: '',
      }),
    },
    // LP end
  };
  // LP end

  constructor(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Inject('dynamic-adapter.dapplet-base.eth') readonly adapter: any,
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
