import {ADD_PIZZA, REMOVE_PIZZA, ADD_TOPPING, REMOVE_TOPPING} from './actions'

export function pizzas(state = [], action = {}) {

  const newState = [...state]

  switch (action.type) {
    case ADD_PIZZA:
      return newState.concat(action.payload)
    case REMOVE_PIZZA:
      newState.splice(action.payload, 1)
      return newState
    case ADD_TOPPING:
      newState[action.payload.pizzaIndex].toppings.push(action.payload.topping)
      return newState
    case REMOVE_TOPPING:
      const oldToppingIndex = newState[action.payload.pizzaIndex].toppings.indexOf(action.payload.topping)
      newState[action.payload.pizzaIndex].toppings.splice(oldToppingIndex, 1)
      return newState
    default: 
      return state
  }
}