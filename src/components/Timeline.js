import React from 'react'

const Timeline = props => {
  return (
    <div>
      <div className="card">
        <a href="#" className="card-header">
          <h3 className="card-header-title">Thinking in state: The tao of frontend development</h3>
        </a>
        <div className="card-content">
          <div className="columns" style={{fontWeight: 700, fontSize: '0.8rem'}}>
            <div className="column">@CAYdenberg</div>
            <div className="column"><time dateTime="2018-08-14T22:03:53.000Z">Aug 8</time></div>
            <div className="column">Casey A. Ydenbergs blog feed</div>
          </div>
          <p>One of the side effects of working with redux is that it forces you to think about your application in terms of state instead of thinking in terms of user workflow. While state might seem like an implementation detail, with experience it becomes more a part of the design process, allowing us to accurately predict &quot;sad path&quot; situations that may arise when the app is in a particular state.</p>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">Open</a>
          <a href="#" className="card-footer-item">Original</a>
          <a href="#" className="card-footer-item">Mark Read</a>
        </footer>
      </div>

      <div className="card">
        <header className="card-header">
          <h3 className="card-header-title">Thinking in state: The tao of frontend development</h3>
        </header>
        <div className="card-content">
          <p>One of the side effects of working with redux is that it forces you to think about your application in terms of state instead of thinking in terms of user workflow. While state might seem like an implementation detail, with experience it becomes more a part of the design process, allowing us to accurately predict &quot;sad path&quot; situations that may arise when the app is in a particular state.</p>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">Open</a>
          <a href="#" className="card-footer-item">Original</a>
          <a href="#" className="card-footer-item">Mark Read</a>
        </footer>
      </div>
    </div>
  )
}

export default Timeline
