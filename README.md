# Example 19: Notifications

**Notifications** are useful for delivering messages from dapplets to users using the extension's sidebar and storing them in the extension's overlay section.

---

### Syntax

#### Core.notify():

- Parameters
  - `title` – a notification title
  - `teaser` – a short message for the popup
  - `message` – (optional) a message to a user
- Return value
  - `Promise<void>`

#### Core.alert():

- Parameters
  - `message` – a message to a user
- Return value
  - `Promise<void>`

#### Core.confirm():

- Parameters
  - `message` – a message to a user
- Return value
  - `Promise<boolean>`– the result of the user decision

---

The initial code for this example is in [master](https://github.com/dapplets/dapplet-template/tree/master).

1. Open `src/index.ts`. Implement methods `onNotification()`, `onConfirm()`, and `onAlert()`.
   Use `notify()`, `confirm()` and `alert()` functions from `Core`. The functions are asynchronous.

```ts
export default class Notification {
  //...
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
```

2. Add `onNotification()`, `onConfirm()`, and `onAlert()` functions to `exec` field in buttons.

```ts
//...
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
//...
```

Here is the result code of the example: [ex19-notifications](https://github.com/dapplets/dapplet-template/tree/ex19-notifications).

Run the dapplet:

```bash
npm i
npm start
```

![](https://github.com/dapplets/dapplet-docs/blob/dap-3130/static/video/ex_19.gif)
