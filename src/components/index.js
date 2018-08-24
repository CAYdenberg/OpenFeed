import React from 'react'
import {connect} from 'react-redux'
import {actions} from '../store/fields'

const mapStateToProps = state => {
  return {
    value: state.fields.addFeed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => {
      e.preventDefault()
      dispatch(actions.update('addFeed', e.target.value))
    }
  }
}

const App = props => {
  return (
    <div className="field">
      <label className="label" htmlFor="addFeed">Add Feed</label>
      <p className="control has-icons-left has-icons-right">

        <input
          className="input"
          type="url"
          placeholder="http://example.com/atom.xml"
          value={props.value}
          onChange={props.handleChange}
        />

        <span className="icon is-left">
          <i className="fa fa-envelope"></i>
        </span>
        <span className="icon is-right">
          <i className="fa fa-check"></i>
        </span>
      </p>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
