const popsicle = require('popsicle')

const resolveSource = (source, api = popsicle) =>
  popsicle.request({
    method: 'GET',
    url: source.endpoint
  })
  // insert pheeder and last status code
  // TODO: catch request errors here

const determinePheeder = () => 'rss'

const handleResponse = (res, pheeder, postsService) => {
  console.log(res)
  // extract processed posts from Pheeder
  // determine if unique
  // create or update
}

module.exports = function(sources, posts) {
  return sources.find().then(sources => Promise.all(sources.map(source => {
    const pheeder = determinePheeder(source)
    return resolveSource(source).then(res =>
      handleResponse(res.body, pheeder, posts)
    ) // handle processing errors
  })))
}
