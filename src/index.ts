import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex_18_1.svg'
import EXAMPLE_IMG_2 from './icons/ex_18_8.svg'
import EXAMPLE_IMG_3 from './icons/dapplet-icon.png'

@Injectable
export default class Exercise {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('overlay-adapter.dapplet-base.eth') public adapterAction: any

  async activate(): Promise<void> {
    const { button } = this.adapter.exports
    const { button: buttonAction } = this.adapterAction.exports

    const wallet = await Core.wallet({
      authMethods: ['ethereum/goerli', 'near/testnet'],
    })
    const ex18_button = buttonAction({
      initial: 'ex18',
      ex18: {
        icon: EXAMPLE_IMG,
        title: 'title',
        pinnedID: 'ex18-title',
        action: (_, me) => {
          me.title = 'ex18 new title'
        },
      },
    })
    this.adapterAction.attachConfig({
      MENU_ACTION: () => [
        ex18_button,
        buttonAction({
          initial: 'CONNECT',
          CONNECT: {
            icon: EXAMPLE_IMG_2,
            title: 'connect',
            pinnedID: 'ex18-connect',
            action: async () => {
              try {
                await wallet.connect()
              } catch (err) {
                console.log('Disconnect ERROR:', err)
              }
            },
          },
        }),
      ],
    })
    this.adapter.attachConfig({
      POST: () =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Injected Button',
            img: EXAMPLE_IMG_3,
            exec: () => alert('Hello, World!'),
          },
        }),
    })
  }
}
