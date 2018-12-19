
export default (dispatch) => {
  return {
    onReady(tasks) {
      tasks.forEach(task => {
        dispatch(task())
      })
    },

    onChange(change) {
      console.log(change)
    }
  }
}
