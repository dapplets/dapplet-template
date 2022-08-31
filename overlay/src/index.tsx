import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { dappletState } from '@dapplets/dapplet-overlay-bridge'
const DappletState = dappletState(App)

ReactDOM.render(<DappletState />, document.getElementById('root'))
