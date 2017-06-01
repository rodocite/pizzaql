import React, { Component } from 'react';
import {map} from 'lodash'
import {connect} from 'react-redux'
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
      console.log(pizza)
      return (
        <div key={index}>
          <div>{pizza.name} pizza</div>
          <button onClick={this.handleRemovePizza(index)}>Remove</button>
          <CheckBoxGroup
            checkBoxLimit={pizza.maxToppings}
            pizzaIndex={index}
            checkBoxItems={['pepperoni', 'extra cheese', 'pineapple']}
            selected={pizza.toppings}
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
      <div className="App">
        <button onClick={this.handleAddPizza('small')}>Add Small Pizza</button>
        <button onClick={this.handleAddPizza('medium')}>Add Medium Pizza</button>
        <button onClick={this.handleAddPizza('large')}>Add Large Pizza</button>
        {this.renderPizzas()}
      </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    pizzas: state.pizzas
  }
}

export default connect(mapStateToProps, {userAddPizza, removePizza, addTopping, removeTopping})(PizzaCheckout)
