import { IContentAdapter } from '@dapplets/dapplet-extension';
import { Button } from './button';
import { Popup } from './popup';

interface ICommonAdapterConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events?: { [event: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BODY?: any[];
}
type ContextBuilder = {
  [propName: string]: string;
};
type Exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
};

@Injectable
export default class CommonAdapter implements IContentAdapter<ICommonAdapterConfig> {
  public exports = (): Exports => ({
    popup: this.dynamicAdapter.createWidgetFactory(Popup),
    button: this.dynamicAdapter.createWidgetFactory(Button),
  });

  public config = {
    // LP: 1. implement communication between dapplets and pages
    BODY: {
      containerSelector: 'html',
      contextSelector: 'body',
      insPoints: {
        BODY: {},
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      contextBuilder: (): ContextBuilder => ({
        id: document.location.href,
      }),
    },
    // LP end
  };

  constructor(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Inject('dynamic-adapter.dapplet-base.eth') readonly dynamicAdapter: any,
  ) {
    this.dynamicAdapter.configure(this.config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public attachConfig(config: ICommonAdapterConfig): { $: (ctx: any, id: string) => any } {
    return this.dynamicAdapter.attachConfig(config);
  }

  public detachConfig(config: ICommonAdapterConfig, featureId?: string): void {
    this.dynamicAdapter.detachConfig(config, featureId);
  }
}
