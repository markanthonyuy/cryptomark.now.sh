import React, { Component } from 'react'

class CountDropdown extends Component {
  renderOption(value, key) {
    return (
      <option key={key} value={value}>
        {value}
      </option>
    )
  }

  render() {
    return (
      <div className="field has-addons has-addons-right">
        <p className="control">
          {this.props.showLabel && (
            <span className="currency-label is-inline-block">
              Select Currency{' '}
            </span>
          )}
          <span className="select">
            <select
              onChange={this.props.onChange}
              value={this.props.default}
              aria-label={this.props.ariaLabel}
            >
              {this.props.options.map((value, key) =>
                this.renderOption(value, key)
              )}
            </select>
          </span>
        </p>
      </div>
    )
  }
}

export default CountDropdown
