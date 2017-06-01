import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import * as reducers from './pizza_checkout/state/reducers'
import PizzaCheckout from './pizza_checkout'

const rootReducer = combineReducers(reducers)
let store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

ReactDOM.render((
    <Provider store={store}>
      <PizzaCheckout />
    </Provider>
  ),
  document.getElementById('root')
)
