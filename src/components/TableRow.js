import React, { Component } from 'react'
import LazyLoad from 'react-lazy-load'
import TimeAgo from 'timeago-react'
import { TW } from '../images'

class TableRow extends Component {
  constructor(props) {
    super(props)
    this.toggleRowClass = this.toggleRowClass.bind(this)
    this.renderOptional = this.renderOptional.bind(this)
    this.checkKeyCurrency = this.checkKeyCurrency.bind(this)
    this.tweetMe = this.tweetMe.bind(this)
    this.encodeHashtag = this.encodeHashtag.bind(this)

    this.state = {
      activeRow: false,
      currency: props.currency,
      cryptocurrency: props.cyrptocurrency,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currency: nextProps.currency,
      cryptocurrency: nextProps.cyrptocurrency,
    })
  }

  encodeHashtag(str) {
    return str.replace(/#/g, '%23')
  }

  tweetMe(crypto = '') {
    let str = encodeURI(
      `https://twitter.com/intent/tweet?&text=${crypto} #cryptocurrency #crypto #cryptocurrencies #blockchain #money #investment #fintech #altcoin #altcoins #blockchaintechnology #cryptotrading #entrepreneur #investing #cryptonews via&url=https://cryptomark.now.sh`
    )

    return this.encodeHashtag(str)
  }

  formatDate(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(timestamp * 1000)

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    // Hours part from the timestamp
    let hours = date.getHours()
    // Minutes part from the timestamp
    const minutes = '0' + date.getMinutes()
    // Seconds part from the timestamp
    const seconds = '0' + date.getSeconds()
    let timePostFix = 'PM'
    if (hours > 12) {
      hours = hours - 12
    } else {
      timePostFix = 'AM'
    }
    // Will display time in 10:30:23 format
    return `${month} ${day}, ${year} | ${hours}:${minutes.substr(
      -2
    )}:${seconds.substr(-2)} ${timePostFix}`
  }

  formatCurrency(price) {
    // Format currency number 9,999,999.00
    if (!price) return
    const arrPrice = String(price).split('.')
    let wholeNum = arrPrice[0]
    let decimal = arrPrice[arrPrice.length - 1]

    if (wholeNum.length >= 4) {
      arrPrice[0] = wholeNum.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    }

    // Check if there is no decimal
    if (arrPrice.length !== 1) {
      arrPrice[arrPrice.length - 1] =
        String(decimal).length === 1 ? decimal + '0' : decimal // Add leading zero if 10.0 to become 10.00
    }

    const cleanPrice = arrPrice.join('.')
    return cleanPrice
  }

  checkChange(change) {
    // Add class .up (green color) if change is > 0
    // Add class .down (red color) if change is < 0
    const changePrice = parseFloat(change, 10)
    let className = ''

    if (changePrice < 0) {
      className = 'down'
    } else if (changePrice > 0) {
      className = 'up'
    }

    return className
  }

  toggleRowClass() {
    // Toggle table row background
    const currentState = this.state.activeRow
    this.setState({ activeRow: !currentState })
  }

  renderOptional(data, key, symbol = '') {
    // Render JSX <td> for optional data
    const optionalData = data
    return (
      <td key={key}>
        {this.formatCurrency(optionalData) || '------------------'}
        <sup>{symbol.length ? ' ' + symbol : ''}</sup>
      </td>
    )
  }

  checkKeyCurrency(str) {
    // Check the currency key for api key related issues
    // e.g. 'price_usd', 'price_cad', 'price_jpy'
    const cur = this.props.currency.toLowerCase()
    const arrStr = str.split('_')
    const arrLen = arrStr.length

    if (arrLen === 3) {
      arrStr[arrLen - 1] = cur
      return arrStr.join('_')
    }

    return str
  }

  renderIconUrl(imgUrl, name) {
    // Load icons from coinsmarketcap
    // Lazyload icons for perf

    return (
      <LazyLoad offset={400}>
        <img src={`${imgUrl}`} alt={name} width="20" />
      </LazyLoad>
    )
  }

  render() {
    const data = this.state.cryptocurrency,
      cur = this.state.currency

    // let sparkline = data.sparkline_in_7d.price.map((d) => ({
    //   name: 'amount',
    //   value: d,
    // }))

    const optionalData = this.props.optionalData
      .filter((oData) => oData.checked) // Filter checked optionaData
      .map((oData) => {
        const key = `${oData.name}-${data.rank}` // Generate unique key
        if (oData.name === 'circulating_supply') {
          // Pass symbole for available_supply and total_supply
          return this.renderOptional(data[oData.name], key, data.symbol)
        }

        if (oData.name === 'market_cap') {
          return this.renderOptional(data[oData.name], key, data.symbol)
        }

        return this.renderOptional(data[oData.name], key)
      })
    const formatedPriceToday = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.state.currency,
    }).format(data.current_price)

    // const change1H = data.quotes[cur].percent_change_1h ? `${data.quotes[cur].percent_change_1h} %` : '-----------';
    const change1D = data.price_change_percentage_24h
      ? `${data.price_change_percentage_24h} %`
      : '-----------'
    const change1DHigh = data.high_24h ? data.high_24h : '-----------'
    // const change1W = data.quotes[cur].percent_change_7d ? `${data.quotes[cur].percent_change_7d} %` : '-----------';

    const tweetText = `${
      data.name
    } is ${this.checkChange(
      data.price_change_percentage_24h
    )} by ${change1D.replace('-', '').replace(' ', '')} Price is ${formatedPriceToday} #${data.name.toUpperCase()} #${data.symbol.toUpperCase()}`

    return (
      <tr
        className={this.state.activeRow ? 'is-selected' : ''}
        onClick={this.toggleRowClass}
      >
        <td className="align-left">{data.market_cap_rank}</td>
        <td>
          {this.renderIconUrl(data.image, data.name)}
          {data.name}
        </td>
        <td>{data.symbol.toUpperCase()}</td>
        <td>{formatedPriceToday}</td>
        {/* <td className={this.checkChange(data.quotes[cur].percent_change_1h)}>{change1H}</td> */}
        <td className={this.checkChange(data.high_24h)}>{change1DHigh}</td>
        <td className={this.checkChange(data.price_change_percentage_24h)}>
          {change1D}
        </td>
        {/* <td className={this.checkChange(data.quotes[cur].percent_change_7d)}>{change1W}</td> */}
        {optionalData}
        <td className="align-right">
          <TimeAgo datetime={data.last_updated} live={false} />
        </td>
        <td className="align-right">
          <a href={this.tweetMe(tweetText)} target="blank">
            <img src={TW} alt="Twitter" width="20" />
          </a>
        </td>
      </tr>
    )
  }
}

export default TableRow
