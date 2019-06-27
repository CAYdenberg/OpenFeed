import { constants as postsConstants } from '../posts'

export default store => next => action => {
  next(action)

  if (action.type === postsConstants.OPEN_POST) {
    const item = document.getElementById(action._id)
    if (!item) return

    setTimeout(() => {
      item.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
}
