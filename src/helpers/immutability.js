import update from 'immutability-helper'

update.extend('$map', (f, original) => {
  return original.map(f)
})

update.extend('$filter', (f, original) => {
  return original.filter(f)
})

update.extend('$where', (arg, original) => {
  const [criteria, command] = arg
  return original.map(item =>
    criteria(item) ? update(item, command) : item
  )
})
