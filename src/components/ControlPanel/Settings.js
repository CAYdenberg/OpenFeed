import React from 'react'

export const Settings = ({view, setView}) => {
  const isActive = view &&
    (view.type === 'page') &&
    (view.id === 'Account')

  return (
    <a
      className={`panel-block ${isActive ? 'is-active' : ''}`}
      onClick={() => setView('Account')}
    >
      Account
    </a>
  )
}

export default Settings
