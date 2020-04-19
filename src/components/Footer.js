import React from 'react'

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            &lt;/&gt; with &lt;3 by{' '}
            <a href="http://markanthonyuy.com">Mark Anthony Uy</a>
          </p>
          <p>
            Powered by <a href="https://facebook.github.io/react/">Reactjs</a>.
            API by <a href="https://www.coingecko.com/en/api">CoinGecko</a>
          </p>
        </div>

        <a
          className={`button is-outlined back-to-top ${
            props.count >= 30 ? '' : 'hide'
          }`}
          href="#main"
        >
          Back to Table View
        </a>
      </div>
    </footer>
  )
}

export default Footer
