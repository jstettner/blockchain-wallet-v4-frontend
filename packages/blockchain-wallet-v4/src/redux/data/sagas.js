import bitcoin from './bitcoin/sagas.js'
import ethereum from './ethereum/sagas.js'
import bch from './bch/sagas.js'
import shapeShift from './shapeShift/sagas.js'
import sfox from './sfox/sagas.js'
import coinify from './coinify/sagas.js'

export default ({ api, options }) => ({
  bitcoin: bitcoin({ api }),
  coinify: coinify({ api, options }),
  ethereum: ethereum({ api }),
  bch: bch({ api }),
  shapeShift: shapeShift({ api }),
  sfox: sfox({ api, options })
})
