import React from 'react'

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered no-margin">
          <p>
            &lt;/&gt; with &lt;3 by{' '}
            <a href="http://markanthonyuy.com">Mark Anthony Uy</a>
          </p>
          <p>
            Powered by <a href="https://facebook.github.io/react/">Reactjs</a>.
            API by <a href="https://www.coingecko.com/en/api">CoinGecko</a>.
            Fork me on{' '}
            <a href="https://github.com/markanthonyuy/cryptomark.now.sh">
              Github
            </a>
            .
          </p>
        </div>
        {props.visibility && (
          <a
            className={`button is-outlined back-to-top ${
              props.count >= 50 ? '' : 'hide'
            }`}
            href="#main"
          >
            Back to Table View
          </a>
        )}
      </div>
    </footer>
  )
}

export default Footer
