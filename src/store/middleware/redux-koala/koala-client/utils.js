import qs from 'query-string'

export const getCredentials = () => {
  return {
    username: localStorage.getItem('koala|username') || '',
    token: localStorage.getItem('koala|token') || ''
  }
}

export const setCredentials = ({username, token}) => {
  localStorage.setItem('koala|username', username)
  localStorage.setItem('koala|token', token)
  return {username, token}
}

export const parseUrlHash = () => {
  return qs.parse(window.location.hash)
}

export const clearUrlHash = () => {
  window.location.hash = ''
}
