
module.exports = function() {
  return new Promise(resolve => {
    console.log('Running ...', Date.now())
    setTimeout(resolve(), 1000)
  })
}
