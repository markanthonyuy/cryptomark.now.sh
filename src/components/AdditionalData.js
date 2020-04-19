import React, { Component } from 'react';

class AdditionalData extends Component {

  constructor() {
    super();
    this.renderCheckbox = this.renderCheckbox.bind(this);
  }

  renderCheckbox(data, key) {
    return (
      <div className="column align-center" key={key}>
        <label className="checkbox">
          <input type="checkbox" checked={data.checked} onChange={(e) => { this.props.addOptionalData(data.name, e, key)}}/> 
          {` ${data.title}`}
        </label>
      </div>
    )
  }

  render() {
    return (
      <div className="settings">
        <p>Add/Remove Optional Data</p>
        <div className="notification">
          <div className="columns is-mobile">
            {
              this.props.optionalData.map((data, key) => this.renderCheckbox(data, key))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default AdditionalData;
