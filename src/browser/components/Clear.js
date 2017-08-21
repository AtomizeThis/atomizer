import React, { Component } from 'react'
import { connect } from 'react-redux'

class Clear extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <button type="button">Click Me!</button>
      </div>
    )
  }
}

const mapState =
