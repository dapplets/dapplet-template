import { IDappStateProps } from '@dapplets/dapplet-overlay-bridge'
import React from 'react'

// LP:  8. Add and export IState interface. Type the class props with IDappStateProps typed with IState
export interface IState {
  counter: any
  text: string
}

export default class App extends React.Component<IDappStateProps<IState>> {
  // LP end
  render() {
    // LP:  9. Get props: sharedState, changeSharedState and id
    const { sharedState, changeSharedState, id } = this.props
    // LP end
    // LP:  10. If the ID exists, show the counter, an input with the text and a button that increments the counter.
    //          If there is no ID (click by the home button), show all the states: keys with counters' and texts' values.
    return (
      <>
        <h1>Shared State</h1>
        {id ? (
          <>
            <p>Counter: {sharedState[id]?.counter ?? 0}</p>
            <input
              value={sharedState[id].text}
              onChange={(e) => changeSharedState?.({ text: e.target.value }, id)}
            />
            <p></p>
            <button
              className="ch-state-btn"
              onClick={() => changeSharedState?.({ counter: sharedState[id].counter + 1 }, id)}
            >
              Counter +1
            </button>
          </>
        ) : (
          Object.entries(sharedState).map(([id, value]: [string, any]) => (
            <p key={id}>
              <b>{id}:</b> {value?.counter} / {value?.text}{' '}
            </p>
          ))
        )}
      </>
    )
    // LP end
  }
}
