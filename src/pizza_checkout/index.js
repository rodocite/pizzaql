import React, { Component } from 'react'
import {map, compact, reduce} from 'lodash'
import {connect} from 'react-redux'
import {formatMoney} from 'accounting'

import {userAddPizza, removePizza, addTopping, removeTopping} from './state/actions'
import CheckBoxGroup from './presentation/checkbox_group'

class PizzaCheckout extends Component {

  handleAddPizza = (size) => {
    return () => this.props.userAddPizza(size)
  }

  handleRemovePizza = (index) => {
    return () => this.props.removePizza(index)
  }

  renderPizzas () {
    return map(this.props.pizzas, (pizza, index) => {
      const selected = compact(map(pizza.toppings, t => {
        if (t.selected) {
          return t.name
        }
      }))

      const pizzaFullPrice = reduce(pizza.toppings, (acc, topping) => {
        if (topping.selected) {
          acc = acc + topping.price
        }

        return acc
      }, pizza.price)

      return (
        <div key={index} style={{marginBottom: 20}}>
          <div>{pizza.name} pizza - {formatMoney(pizzaFullPrice)}</div>
          <button onClick={this.handleRemovePizza(index)}>Remove</button>
          <CheckBoxGroup
            checkBoxLimit={pizza.maxToppings}
            pizzaIndex={index}
            checkBoxItems={pizza.toppings}
            selected={selected}
            handlers={{
              addTopping: this.props.addTopping,
              removeTopping: this.props.removeTopping
            }}
          />
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div>Due at checkout - {formatMoney(this.props.statement)}</div>
        <button onClick={this.handleAddPizza('small')}>Add Small Pizza</button>
        <button onClick={this.handleAddPizza('medium')}>Add Medium Pizza</button>
        <button onClick={this.handleAddPizza('large')}>Add Large Pizza</button>
        {this.renderPizzas()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const statement = reduce(state.pizzas, (invoice, pizza) => {
    const pizzaPrice = reduce(pizza.toppings, (acc, topping) => {

      if (topping.selected) {
        acc = acc + topping.price
      }

      return acc
    }, pizza.price)
    
    invoice = invoice + pizzaPrice

    return invoice
  }, 0)

  return {
    pizzas: state.pizzas,
    statement
  }
}

export default connect(mapStateToProps, {userAddPizza, removePizza, addTopping, removeTopping})(PizzaCheckout)
