import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/dapplet-icon.png'

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-config.dapplet-base.eth')
  public adapter
  private _config: any
  private _adapterDescription: {
    contextsNames: string[]
    widgets?: any
  }
  private _$: any
  private _globalContext = {}
  async activate(): Promise<void> {
    console.log('this.adapter', this.adapter)
    if (this.adapter._attachedConfig) {
      const contextsNames = Object.keys(this.adapter._attachedConfig)
      console.log(contextsNames)

      this._adapterDescription = { contextsNames, widgets: {} }
    }

    const { button } = this.adapter.exports

    this._config = {
      GLOBAL: (global) => {
        Object.assign(this._globalContext, global)
      },
      POST: (ctx) => {
        return [
          button({
            DEFAULT: {
              id: 'button',
              label: 'Injected Button',
              img: EXAMPLE_IMG,
              exec: async () => await Core.alert('Hello Word!'),
            },
          }),
        ]
      },
    }
    const { $ } = this.adapter.attachConfig(this._config)
    this._$ = $
  }
}
