const popsicle = require('popsicle')

const doRequest = ticket => {
  return popsicle.request(ticket)
    .use(popsicle.plugins.parse('json'))
    .then(res => res.status < 400 ? res.body : Promise.reject(res.status))
}

export default store => next => action => {
  if (action.popsicle) {
    doRequest(action.popsicle).then(body => {
      next(action.response(body))
    }).catch(status => {
      next({type: action.error || '@@POPSICLE/ERROR', status})
    })
  }

  return next(action)
}
