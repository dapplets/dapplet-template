import { IFeature } from '@dapplets/dapplet-extension'
import { Button } from './button'
import { Result } from './result'

type ContextBuilder = {
  [propName: string]: string
}
type Exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any
}

@Injectable
export default class GoogleAdapter {
  public exports = (): Exports => ({
    button: this.adapter.createWidgetFactory(Button),
    result: this.adapter.createWidgetFactory(Result),
  })

  public config = {
    MENU: {
      containerSelector: '#cnt, .ndYZfc',
      contextSelector: '#top_nav, #topstuff .jZWadf #hdtb-msb',
      insPoints: {
        MENU: {
          selector: '.MUFPAc, .T47uwc #hdtb-msb',
          insert: 'inside',
        },
      },
      contextBuilder: (): ContextBuilder => ({
        id: 'menu',
        insertPoint: '#rcnt, .mJxzWe',
      }),
    },
    SEARCH_RESULT: {
      containerSelector: '#search',
      contextSelector:
        '#rso > .g .jtfYYd, #rso > div > .g .jtfYYd, #rso > div > div > .g .jtfYYd, .MjjYud',
      insPoints: {
        SEARCH_RESULT: {
          selector: '.yuRUbf',
          insert: 'inside',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextBuilder: (searchNode: any): ContextBuilder => ({
        id: searchNode.querySelector('.yuRUbf > a')?.href,
        title: searchNode.querySelector('h3')?.textContent,
        link: searchNode.querySelector('.yuRUbf > a')?.href,
        description:
          searchNode.querySelector('.uUuwM')?.textContent ||
          searchNode.querySelector('.IsZvec')?.textContent,
      }),
    },
    // LP: 6. Add new insertion point WIDGETS on the top of Google widgets.
    WIDGETS: {
      containerSelector: '#search',
      contextSelector: '#rso',
      insPoints: {
        WIDGETS: {
          selector: '.MjjYud',
          insert: 'begin',
        },
      },
      contextBuilder: (): ContextBuilder => ({
        id: 'widgets',
      }),
    },
    DAPPLET_SEARCH_RESULT: {
      containerSelector: '#search',
      contextSelector: '.hlcw0c-dapp .tF2Cxc',
      insPoints: {
        DAPPLET_SEARCH_RESULT: {
          selector: '.yuRUbf',
          insert: 'inside',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextBuilder: (searchNode: any): ContextBuilder => ({
        id: searchNode.querySelector('.yuRUbf > a').href,
        title: searchNode.querySelector('h3 > span').textContent,
        link: searchNode.querySelector('.yuRUbf > a').href,
        description: searchNode.querySelector('.IsZvec').textContent,
      }),
    },
  }

  constructor(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Inject('dynamic-adapter.dapplet-base.eth') readonly adapter: any
  ) {
    this.adapter.configure(this.config)
  }

  public attachConfig(feature: IFeature): void {
    this.adapter.attachConfig(feature)
  }

  public detachConfig(feature: IFeature): void {
    this.adapter.detachConfig(feature)
  }
}
