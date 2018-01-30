import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from 'scenes/app.js'
import configureStore from 'store'
import configureLocales from 'services/LocalesService'
import {startSocket} from '../../blockchain-wallet-v4/src/ln/tcprelay/actions'
import {startUp} from '../../blockchain-wallet-v4/src/ln/root/actions'
import {open} from '../../blockchain-wallet-v4/src/ln/channel/actions'
import Long from 'long'
import { createPaymentRequest } from '../../blockchain-wallet-v4/src/ln/payment/actions'

const { store, history } = configureStore()

const { messages } = configureLocales(store)

const render = Component => {
  ReactDOM.render(
    <AppContainer key={Math.random()} warnings={false}>
      <Component store={store} history={history} messages={messages} />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('scenes/app.js', () => render(require('scenes/app.js').default))
}

store.dispatch(startUp())

//const peer = '02c39955c1579afe4824dc0ef4493fdf7f3660b158cf6d367d8570b9f19683afb5'
setTimeout(() => {
// TODO move to bootstrap section
  store.dispatch(startSocket())
  //store.dispatch(createPaymentRequest(0.001, "This is for test", 60, {type: 0, address:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,0, 1, 2, 3, 4, 5, 6, 7, 8, 9,]}))
  store.dispatch({type: 'LOGIN', payload: {guid: '2d2e974b-c148-404a-a704-99e51f0bf36d', password: '1234567890a'}})
}, 500)

// TODO this is simulating the user opening a payment channel
setTimeout(() => {
  store.dispatch(open(peer, Long.fromNumber(100000)))
}, 4000)


