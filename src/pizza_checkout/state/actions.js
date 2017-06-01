import ApolloClient, {createNetworkInterface} from 'apollo-client'
import gql from 'graphql-tag'
import {find, map} from 'lodash'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://core-graphql.dev.waldo.photos/pizza',
  })
})

export const ADD_PIZZA = 'ADD_PIZZA'
export const REMOVE_PIZZA = 'REMOVE_PIZZA'
export const ADD_TOPPING = 'ADD_TOPPING'
export const REMOVE_TOPPING = 'REMOVE_TOPPING'

export function addPizza (attributes = {}) {

  return { 
    type: ADD_PIZZA,
    payload: attributes
  }
}

export function removePizza (index) {

  return { 
    type: REMOVE_PIZZA,
    payload: index
  }
}

export function addTopping (pizzaIndex, toppingIndex) {

  return {
    type: ADD_TOPPING,
    payload: {
      pizzaIndex,
      toppingIndex
    }
  }
}

export function removeTopping (pizzaIndex, toppingIndex) {

  return {
    type: REMOVE_TOPPING,
    payload: {
      pizzaIndex,
      toppingIndex
    }
  }
}

export function userAddPizza (type) {

  return dispatch => {

    client.query({
      query: gql`
        query {
          pizzaSizes {
            name
            maxToppings
            toppings {
              defaultSelected
              topping {
                name
                price
              }
            }
            basePrice
          }
        }
      `,
    })
    .then(data => {

      const pizza = find(data.data.pizzaSizes, pizzaSize => pizzaSize.name === type)
      
      dispatch(addPizza({
        name: pizza.name,
        maxToppings: pizza.maxToppings,
        price: pizza.basePrice,
        toppings: map(pizza.toppings, t => {
          
          return {
            selected: t.defaultSelected,
            name: t.topping.name,
            price: t.topping.price
          }
        })
      }))
    })
  }
}