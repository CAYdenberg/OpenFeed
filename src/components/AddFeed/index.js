import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {actions} from '../../store/newFeed'
import Field from './Field'

const mapStateToProps = state => {
  return {
    value: state.newFeed.value,
    loadState: state.newFeed.loadState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: value => {
      dispatch(actions.updateValue(value))
    },

    reqNewFeed: () => dispatch(actions.newFeedReq())
  }
}

class AddFeed extends React.Component {
  constructor(props) {
    super(props)

    this._handleChange = this._handleChange.bind(this)
    this._maybeRequest = this._maybeRequest.bind(this)

    this.timer = setTimeout(Function, 0)
  }

  _handleChange(e) {
    e.preventDefault()
    const {value} = e.target
    this.props.onChange(value)
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this._maybeRequest(value), 1000)
  }

  _maybeRequest(initialValue) {
    // do not trigger if not a valid url
    if (!initialValue) return
    // do not trigger if the value has changed in the meantime
    if (this.props.value !== initialValue) return
    this.props.reqNewFeed()
  }

  render() {
    const {props} = this

    return (
      <form onSubmit={e => props.addFeed(e, props.value)} className="panel-block">
        <label className="label sr-only" htmlFor="addFeed">Add Feed</label>

        <div className="field has-addons is-full-width">
          <Field
            value={props.value}
            loadState={props.loadState}
            onChange={this._handleChange}
          />

          <div className="control">
            <button className="button is-success" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    )
  }
}

AddFeed.propTypes = {
  value: PropTypes.string.isRequired,
  reqNewFeed: PropTypes.func.isRequired,
  loadState: PropTypes.number.isRequired,

  onAddFeed: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFeed)
