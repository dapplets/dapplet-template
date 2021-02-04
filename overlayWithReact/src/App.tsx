import React from 'react';
import { bridge } from './dappletBridge';

interface Props {}

interface State {
  data: string | null;
}

export default class App extends React.Component<Props, State> {
  state = {
    data: null,
    // LP: supplement the state

    // LP end
  };

  // LP: Add event on button click

  // LP end

  componentDidMount() {
    bridge.onData((data) => this.setState({ data }));
  }

  render() {
    return (
      <div>
        <h1>Overlay with ReactJS</h1>
        <div>Message from a dapplet: {this.state.data}</div>
        <button className="ch-state-btn">Counter +1</button>
      </div>
    );
  }
}
