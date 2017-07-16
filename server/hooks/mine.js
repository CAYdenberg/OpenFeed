
module.exports = function(hook) {
  if (!hook.params.user) {
    throw new Error('Must be authenticated')
  }
  const _id = hook.params.user._id
  if (!hook.params.query) hook.params.query = {}
  hook.params.query.user = _id

  if (!hook.data) hook.data = {}
  hook.data.user = _id
}
