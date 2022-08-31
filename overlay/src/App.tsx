import React from 'react'
import Bridge, { IDappStateProps } from '@dapplets/dapplet-overlay-bridge'

interface IStorage {
  userAccount: string
}

interface IBridge {
  // LP: 5. Add interface for Bridge
  // LP end
}

const App = (props: IDappStateProps<IStorage>) => {
  const { sharedState } = props
  const bridge = new Bridge<IBridge>()

  // LP: 6. Add functions to connect and disconnect the account

  // LP end

  return (
    sharedState && (
      <div className="wrapper">
        <div className="title">
          <h2>Exercise 17</h2>
          <h1>Overlay With Login</h1>
        </div>
        {sharedState.global?.userAccount === '' ? (
          <button
            className="login"
            // LP: 7.1 Add the Login function

            // LP end
          >
            Log in
          </button>
        ) : (
          <>
            <section style={{ marginBottom: '2rem' }}>
              <h4>Account name:</h4>
              <p>{sharedState.global?.userAccount}</p>
            </section>
            <button
              className="logout"
              // LP: 7.2 Add the Logout function

              // LP end
            >
              Log out
            </button>
          </>
        )}
      </div>
    )
  )
}

export default App