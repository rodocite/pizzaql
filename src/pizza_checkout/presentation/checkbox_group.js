import React, {Component} from 'react';
import {PropTypes} from 'prop-types'
import {map} from 'lodash'
import {formatMoney} from 'accounting'

class CheckBoxGroup extends Component {

  static proptypes = {
    checkBoxLimit: PropTypes.number,
    checkBoxItems: PropTypes.array,
    pizzaIndex: PropTypes.number
  }

  static defaultProps = {
    selected: []
  }

  handleInputChange = (event) => {

    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (value) {
      if (this.props.checkBoxLimit !== null && this.props.selected.length >= this.props.checkBoxLimit) {
        return null
      }
      this.props.handlers.addTopping(this.props.pizzaIndex, name)
    } else {
      this.props.handlers.removeTopping(this.props.pizzaIndex, name)
    }
  }

  renderCheckBoxes () {

    const {selected} = this.props

    return map(this.props.checkBoxItems, item => {

      return (
        <div key={item.name}>
          <input
            type="checkbox" 
            name={item.name} 
            value={item.name}
            checked={selected.indexOf(item.name) > -1}
            onChange={this.handleInputChange}
          />
          <label
            style={this.props.checkBoxLimit !== null && selected.length >= this.props.checkBoxLimit ? {color: 'gray'} : {color: 'black'}} 
          >
            {item.name} {formatMoney(item.price)}
          </label>
        </div>
      )
    })
  }

  render() {
    
    return (
      <div>
        {this.renderCheckBoxes()}
      </div>
    )
  }
}

export default CheckBoxGroup 
