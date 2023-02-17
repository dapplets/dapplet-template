import {} from '@dapplets/dapplet-extension'
import NOTIFICATION_IMG from './icons/ex_19.png'

@Injectable
export default class Notification {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  async activate() {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      PROFILE: () => [
        button({
          DEFAULT: {
            label: 'Notify',
            img: NOTIFICATION_IMG,
            exec: this.onNotification,
          },
        }),
        button({
          DEFAULT: {
            label: 'Alert',
            exec: this.onAlert,
          },
        }),
        button({
          DEFAULT: {
            label: 'Confirm',
            exec: this.onConfirm,
          },
        }),
      ],
    })
  }

  onNotification = () =>
    Core.notify({
      title: "Notification's title",
      message: 'This is a full notification message',
      teaser: 'This is a teaser message',
    })

  onAlert = () => Core.alert('This is an alert')

  onConfirm = async () => {
    const isConfirmed = await Core.confirm('This is a confirm')
    if (isConfirmed) {
      Core.notify('Confirmed!')
    } else {
      Core.notify('Rejected!')
    }
  }
}
