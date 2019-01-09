import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Icon, {twitter} from './Icons'

const mapStateToProps = (state) => {
  const username = state.status.username
  const [provider, name] = username.split('-')
  return {
    authenticated: !!username,
    provider,
    name,
  }
}

const Account = ({authenticated, provider, name}) => {
  if (authenticated) {
    return (
      <section className="content">
        <h3>Account Information</h3>
        <h4>Authentication provider</h4>
        <p>{provider}</p>
        <h4>Username</h4>
        <p>{name}</p>
        <h4>
          <a href={`${process.env.KOALA_URI}/auth/logout`}>
            Logout
          </a>
        </h4>
      </section>
    )
  } else {
    return (
      <section className="content">
        <h3>To sign up for an account, choose one of the providers below:</h3>
        <p className="buttons">
          <a
            href={`${process.env.KOALA_URI}/auth/twitter`}
            className="button is-large is-info"
          >
            <span className="icon is-large">
              <span className="is-sr-only">Signup using Twitter</span>
              <Icon icon={twitter} size={36} />
            </span>
          </a>
        </p>
      </section>
    )
  }
}

export default connect(mapStateToProps)(Account)
