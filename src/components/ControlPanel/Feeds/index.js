import React from 'react'
import FeedsList from './FeedsList'
import AddFeed from './AddFeed'

const Feeds = ({reqCloseMobile}) => {
  return (
    <React.Fragment>
      <FeedsList reqCloseMobile={reqCloseMobile} />
      <AddFeed />
    </React.Fragment>
  )
}

export default Feeds
