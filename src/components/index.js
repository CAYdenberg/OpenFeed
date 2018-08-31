import React from 'react'
import {connect} from 'react-redux'
import {actions as fieldsActions} from '../store/fields'
import {actions as feedsActions} from '../store/feeds'

const mapStateToProps = state => {
  return {
    value: state.fields.addFeed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => {
      e.preventDefault()
      dispatch(fieldsActions.update('addFeed', e.target.value))
    },
    addFeed: (e, feed) => {
      e.preventDefault()
      dispatch(feedsActions.reqNewFeed(feed))
    }
  }
}

const App = props => {
  return (
    <form onSubmit={e => props.addFeed(e, props.value)}>
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
      <button type="submit">Submit</button>
    </form>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
