import { all, call } from 'redux-saga/effects'

import sendBitcoin from './sendBitcoin/sagas'
import sendEther from './sendEther/sagas'
import settings from './settings/sagas'
import transferEther from './transferEther/sagas'

export default function * () {
  yield all([
    call(sendBitcoin),
    call(sendEther),
    call(settings),
    call(transferEther)
  ])
}