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

const AddFeedForm = props => {
  return (
    <form onSubmit={e => props.addFeed(e, props.value)} className="panel-block">
      <label className="label sr-only" htmlFor="addFeed">Add Feed</label>
      <div className="field has-addons is-full-width">

        <div className="control has-icons-right is-expanded">

          <input
            className="input"
            type="url"
            placeholder="http://example.com/atom.xml"
            value={props.value}
            onChange={props.handleChange}
          />

          <span className="icon is-right">
            <i className="fa fa-check"></i>
          </span>
        </div>

        <div className="control">
          <button className="button is-success" type="submit">
            Add
          </button>
        </div>

      </div>
    </form>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedForm)
