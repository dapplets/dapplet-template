# Ex17: Overlay With Login

This example shows how to work with the overlay through the new Core Login API.

As an example let's connect and disconnect an Ethereum network account using a button in the overlay.

Here is the initial code for this example: [ex17-overlay-login-exercise](https://github.com/dapplets/dapplet-template/tree/ex17-overlay-login-exercise).

## Dapplet

More details about the **useState** and **onAction** methods can be found in [Shared State](https://docs.dapplets.org/docs/shared-state) section.

### LP: 1. Add the 'useState' method to the overlay

Add the method to overlay initialization. The state will transfer the account address from the dapplet to the overlay.

```typescript
private overlay = Core.overlay<IBridge>({ name: 'overlay', title: 'Exercise 17' })
  .useState(this.state)
```

### LP: 2. Declare the API in the overlay

`dapplet/src/api.ts` contains the functions that will be available in the overlay.

You can learn more about Core Login API [here](https://docs.dapplets.org/docs/core-login).

```typescript
.declare(this.api);
```

More details about the **declare** method can be found in [Overlays](https://docs.dapplets.org/docs/overlays) section.

### LP: 3. Use the API's function to get the account state

```typescript
await this.api.initializeCurrentAccount()
```

### LP: 4. Add the action for the home button

Add the `Core.onAction` method. The callback will open the overlay and update the data about the session when the home button is clicked.

```typescript
Core.onAction(() => {
  this.overlay.open()
  this.api.initializeCurrentAccount()
})
```

## Overlay

To implement the overlay part, we use React functional components.

### LP: 5. Add the interface for Bridge, with functions

The Dapplet and the overlay are connected using **Bridge** and **IDappStateProps** which are imported from `@dapplets/dapplet-overlay-bridge`.

```typescript
interface IBridge {
  login: () => Promise<void>
  logout: () => Promise<void>
}
```

### LP: 6. Add functions to connect and disconnect the account

Add functions to `App.tsx` .

```typescript
const handleLogIn = (e: any) => {
  e.preventDefault()
  bridge.login()
}

const handleLogOut = (e: any) => {
  e.preventDefault()
  bridge.logout()
}
```

### LP: 7 Add Login and Logout functions

Use **sharedState** to render the component and display the account address.

```typescript
return (
  sharedState && (
    <div className="wrapper">
      ...
      {sharedState.global?.userAccount === '' ? (
        <button className="login" onClick={handleLogIn}>
          Log in
        </button>
      ) : (
        <>
          ...
          <button className="logout" onClick={handleLogOut}>
            Log out
          </button>
        </>
      )}
    </div>
  )
)
```

Here is the result code of the example: [ex17-overlay-login-solution](https://github.com/dapplets/dapplet-template/tree/ex17-overlay-login-solution).

Run the dapplet:

```bash
npm i
npm start
```

![video](https://docs.dapplets.org/assets/images/ex_17-76471d3bb8be12a10b43531b9422ad55.gif)
