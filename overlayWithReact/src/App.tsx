import React from 'react'
// LP:  1. Import Bridge class from @dapplets/dapplet-overlay-bridge pachage:
import Bridge from '@dapplets/dapplet-overlay-bridge'
// LP end

interface Props {}

interface State {
  message: string | null
  counter: number
  isTick: boolean
}

// LP:  2. Create `IDappletApi` interface and Bridge class instance typing with the inteface.
interface IDappletApi {
  increaseCounterAndToggleLabel: (isTick: boolean) => Promise<number>
}

const bridge = new Bridge<IDappletApi>()
// LP end

export default class App extends React.Component<Props, State> {
  state = {
    message: null,
    counter: 0,
    isTick: true,
  }

  componentDidMount() {
    // LP:  3. Add a listener to the 'data' event
    bridge.on('data', ({ message, counter }: { message: string; counter: number }) =>
      this.setState({ message, counter })
    )
    // LP end
  }

  handleClick = async () => {
    // LP:  4. Add an event on the button click
    const counter = await bridge.increaseCounterAndToggleLabel(this.state.isTick)
    this.setState({ isTick: !this.state.isTick, counter })
    // LP end
  }

  render() {
    return (
      <>
        <h1>Overlay with React</h1>
        <p>Message from the dapplet: {this.state.message}</p>
        <p>Counter: {this.state.counter ?? 0}</p>
        <button className="ch-state-btn" onClick={this.handleClick}>
          Counter +1
        </button>
      </>
    )
  }
}
