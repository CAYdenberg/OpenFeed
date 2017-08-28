const {parseString} = require('rss-parser')

module.exports = {
  rss: res => new Promise((resolve, reject) =>
    parseString(res, (err, parsed) => {
      if (err) return reject(err)
      console.log(parsed)
      return resolve(parsed)
    })
  )
}
