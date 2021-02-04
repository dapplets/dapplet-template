import React from 'react';
import { bridge } from './dappletBridge';

interface Props {

}

interface State {
  data: string | null;
  tickTack: boolean;
}

export default class App extends React.Component<Props, State> {

  state = {
    data: null,
    // LP: supplement the state
    tickTack: true,   
    // LP end
  };

  // LP: Add event on button click
  handleClick = () => {
    bridge.onClick(this.state.tickTack, (tickTack) => this.setState({ tickTack }));
  };
  // LP end

  componentDidMount() {
    bridge.onData((data) => this.setState({ data }));
  }

  render() {
    return (
      <div>
        <h1>
          Overlay with ReactJS
        </h1>
        <div>
          Message from a dapplet: {this.state.data}
        </div>
        <button className="ch-state-btn" onClick={this.handleClick}>Counter +1</button>
      </div>
    );
  }
}
