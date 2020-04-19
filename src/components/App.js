import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import Loader from './Loader'
import AdditionalData from './AdditionalData'
import CountDropdown from './CountDropdown'
import Table from './Table'
import Footer from './Footer'

class App extends Component {
  constructor() {
    super()
    this.apiUrl = 'https://api.coingecko.com/api/v3/'
    this.displayCrypto = this.displayCrypto.bind(this)
    this.getData = this.getData.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)
    this.handldeCurrencyChange = this.handldeCurrencyChange.bind(this)
    this.addOptionalData = this.addOptionalData.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)

    this.state = {
      cryptocurrencies: [],
      count: 15,
      loader: false,
      options: [10, 15, 20, 30, 50, 100, 150, 200, 250],
      total: 7100,
      totalPage: 0,
      page: 1,
      currencyOptions: [
        'AUD',
        'BRL',
        'CAD',
        'CHF',
        'CLP',
        'CNY',
        'CZK',
        'DKK',
        'EUR',
        'GBP',
        'HKD',
        'HUF',
        'IDR',
        'ILS',
        'INR',
        'JPY',
        'KRW',
        'MXN',
        'MYR',
        'NOK',
        'NZD',
        'PHP',
        'PKR',
        'PLN',
        'RUB',
        'SEK',
        'SGD',
        'THB',
        'TRY',
        'TWD',
        'USD',
        'ZAR',
        'BTC',
        'ETH',
        'XRP',
        'LTC',
        'BCH',
      ],
      currency: 'USD',
      optionalData: [
        {
          name: 'total_volume',
          title: 'Total Volume',
          checked: false,
        },
        {
          name: 'market_cap',
          title: 'Market Cap',
          checked: false,
        },
        {
          name: 'circulating_supply',
          title: 'Circulating Supply',
          checked: false,
        },
        {
          name: 'total_supply',
          title: 'Total Supply',
          checked: false,
        },
      ],
    }

    this.time = ''
    this.reloadCount = 300
  }

  componentDidMount() {
    this.getData(true)
    this.interval = setInterval(this.getData, 300000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getTimeRemaining(time) {
    const t = time
    let seconds = Math.floor(t % 60)
    let minutes = Math.floor(t / 60)

    if (seconds <= 9) seconds = `0${seconds}`
    if (minutes <= 9) minutes = `0${minutes}`

    return `${minutes}:${seconds}`
  }

  timer() {
    let rCount = this.reloadCount
    this.time = setInterval(() => {
      if (rCount <= 0) {
        rCount = 300
      }
      document.querySelector('#timer').textContent = this.getTimeRemaining(
        --rCount
      )
    }, 1000)
  }

  getData(
    startTimer = false,
    clearTime = true,
    nextPage = false,
    prevPage = false
  ) {
    let page = this.state.page
    // let paging = `&start=${page * count + 1}`
    let currency = this.state.currency
    let count = this.state.count

    if (nextPage) {
      if (page + 1 >= 20) return
      if (page >= 0) {
        page = page + 1
        this.setState({ page: page, loader: true })
      }

      //paging = `&start=${page * count + 1}`
    }

    if (prevPage) {
      if (page <= 0) return
      if (page <= 20) {
        page = page - 1
        this.setState({ page: page, loader: true })
      }

      //paging = `&start=${page * count + 1}`
    }

    let url = `${this.apiUrl}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${count}&sparkline=false&page=${page}`

    axios
      .get(url)
      .then((res) => {
        if (startTimer) {
          this.timer()
        }
        this.displayCrypto(res.data, currency)
        // this.setState({
        //   total: 100,
        // })
        // this.setState({
        //   totalPage: 20,
        // })
        // Get total page
        const totalPage = this.state.total / count
        const cleanTotalPage =
          totalPage % 1 ? parseInt(totalPage + 1, 10) : totalPage
        this.setState({
          totalPage: cleanTotalPage,
        })
        // if (clearTime) {
        //   clearInterval(this.time)
        //   document.querySelector('#timer').textContent = this.getTimeRemaining(
        //     this.reloadCount
        //   )
        //   this.timer()
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  nextPage() {
    this.getData(false, false, true)
  }

  prevPage() {
    this.getData(false, false, false, true)
  }

  displayCrypto(data, currency) {
    this.setState({ cryptocurrencies: data, loader: false, currency })
  }

  handleCountChange(e) {
    this.setState({ count: e.target.value }, () => this.getData(false, false))
  }

  handldeCurrencyChange(e) {
    this.setState(
      {
        currency: e.target.value,
      },
      () => this.getData(false, false)
    )
  }

  addOptionalData(name, e, key) {
    const isChecked = e.target.checked
    let newOptionData = this.state.optionalData
    newOptionData[key].checked = isChecked

    this.setState({ optionalData: newOptionData })
  }

  render() {
    return (
      <main>
        <Header tagline="Compare Cryptocurrencies"></Header>
        <div className="section">
          <div className="container" id="main">
            <AdditionalData
              optionalData={this.state.optionalData}
              addOptionalData={this.addOptionalData}
              currency={this.state.currency}
            ></AdditionalData>
            <div className="is-clearfix table-setting">
              <div className="is-pulled-left is-clearfix">
                <div className="is-pulled-left">
                  {
                    <span
                      className={
                        !this.state.loader
                          ? 'reload-count'
                          : 'reload-count hide'
                      }
                    >
                      Reloading in <b id="timer"></b>
                    </span>
                  }
                </div>
                <div className="is-pulled-right">
                  <Loader visibility={this.state.loader}></Loader>
                </div>
              </div>
            </div>
            <div className="is-clearfix">
              <div className="is-pulled-left is-clearfix paging">
                <a
                  className="button is-outlined is-pulled-left"
                  onClick={this.prevPage}
                  disabled={this.state.page === 1 ? true : false}
                >
                  Prev
                </a>
                &nbsp;
                <a
                  className="button is-outlined is-pulled-left"
                  onClick={this.nextPage}
                  disabled={
                    this.state.page >= this.state.total / this.state.count
                      ? true
                      : false
                  }
                >
                  Next
                </a>
                <div className="tags has-addons is-pulled-left">
                  <span className="tag is-marginless">Page</span>
                  <span className="tag is-primary is-marginless">
                    {this.state.page} of {this.state.totalPage}
                  </span>
                </div>
              </div>
              <div className="is-pulled-right is-clearfix dropdown-settings">
                <div className="is-pulled-left">
                  <CountDropdown
                    options={this.state.currencyOptions}
                    onChange={this.handldeCurrencyChange}
                    default={this.state.currency}
                    ariaLabel="Select Currency"
                    showLabel
                  ></CountDropdown>
                </div>
                <div className="is-pulled-right">
                  <CountDropdown
                    options={this.state.options}
                    onChange={this.handleCountChange}
                    default={this.state.count}
                    ariaLabel="Select Table Items Count"
                  ></CountDropdown>
                </div>
              </div>
            </div>
            <Table
              cryptocurrencies={this.state.cryptocurrencies}
              optionalData={this.state.optionalData}
              currency={this.state.currency}
            ></Table>
            <p className="info">* Multi-currency support.</p>
            <p className="info">
              * Updates every 5 mins due to API limitation.
            </p>
            <p className="info">
              * Sortable base on the displayed Cryptocurrencies.
            </p>
          </div>
        </div>
        <Footer count={this.state.count}></Footer>
      </main>
    )
  }
}

export default App
