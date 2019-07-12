import React from 'react'
import FeedsList from './FeedsList'
import AddFeed from './AddFeed'

const Feeds = ({reqCloseMobile, setView}) => {
  return (
    <React.Fragment>
      <FeedsList reqCloseMobile={reqCloseMobile} setView={setView} />
      <AddFeed />
    </React.Fragment>
  )
}

export default Feeds
