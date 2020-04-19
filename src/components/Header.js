import React from 'react'

const Header = (props) => {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title main-title">
            <a href="/">Cryptomark</a>
          </h1>
          <h2 className="subtitle is-6">{props.tagline}</h2>
        </div>
      </div>
    </section>
  )
}

export default Header
