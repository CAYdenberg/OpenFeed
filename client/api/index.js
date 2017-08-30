const feathers = require('feathers/client')
const axios = require('axios')

const client = feathers().configure(feathers.rest().axios(axios))
client.configure(feathers.hooks())
client.configure(feathers.authentication({storage: window.localStorage}))

const timelines = client.service('/timelines')
const sources = client.service('/sources')
const users = client.service('/users')

export function getCurrentUser() {
  // get information about current user
  client.passport.verifyJWT(localStorage['feathers-jwt']).then(payload => {
    return users.get(payload.userId)
  })
}

export function login(email, password) {
  client.authenticate({
    strategy: 'local',
    email,
    password
  }).then(res =>
    client.passport.verifyJWT(res.accessToken)
  ).then(payload =>
    users.get(payload.userId)
  ).then(user => {
    client.set('user', user)
    return user
  })
}

export function createUser(email, password) {
  users.create({
    email,
    password
  })
}

export function logout() {
  client.logout()
  return Promise.resolve()
}

export function addSource(url) {
  return sources.create({endpoint: url})
}
