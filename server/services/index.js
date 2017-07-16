const users = require('./users/users.service.js')
const timelines = require('./timelines/timelines.service.js')
const sources = require('./sources/sources.service.js')
const posts = require('./posts/posts.service.js')

module.exports = function() {
  const app = this
  app.configure(users)
  app.configure(timelines)
  app.configure(sources)
  app.configure(posts)
}
