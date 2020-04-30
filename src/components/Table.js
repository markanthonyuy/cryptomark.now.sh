import React, { Component } from 'react'
import TableRow from './TableRow'

class Table extends Component {
  constructor(props) {
    super(props)
    this.sortPriceAsc = this.sortPriceAsc.bind(this)
    this.sortPriceDesc = this.sortPriceDesc.bind(this)
    this.sortClick = this.sortClick.bind(this)
    this.addSortClassName = this.addSortClassName.bind(this)
    this.sortPriceDesc = this.sortPriceDesc.bind(this)
    this.sortPriceAsc = this.sortPriceAsc.bind(this)
    //this.sortChange1HDesc = this.sortChange1HDesc.bind(this)
    //this.sortChange1HAsc = this.sortChange1HAsc.bind(this)
    this.sortChange1DDesc = this.sortChange1DDesc.bind(this)
    this.sortChange1DAsc = this.sortChange1DAsc.bind(this)
    //this.sortChange1WDesc = this.sortChange1WDesc.bind(this)
    //this.sortChange1WAsc = this.sortChange1WAsc.bind(this)

    this.state = {
      sort: {
        rank: 'asc',
      },
      cryptocurrencies: props.cryptocurrencies,
      currency: props.currency,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cryptocurrencies: nextProps.cryptocurrencies,
      currency: nextProps.currency,
    })
  }

  renderOptional(oData, key) {
    const cur = this.state.currency
    const arrStr = oData.name.split('_')
    const arrLen = arrStr.length
    let newStr = oData.title

    if (arrLen === 3) {
      newStr = oData.title + ` (${cur})`
    }

    return <th key={key}>{newStr}</th>
  }

  sortRankDesc(a, b) {
    if (parseInt(a['market_cap_rank'], 10) < parseInt(b['market_cap_rank'], 10))
      return -1
    if (parseInt(a['market_cap_rank'], 10) > parseInt(b['market_cap_rank'], 10))
      return 1
    return 0
  }

  sortRankAsc(a, b) {
    if (parseInt(a['market_cap_rank'], 10) > parseInt(b['market_cap_rank'], 10))
      return -1
    if (parseInt(a['market_cap_rank'], 10) < parseInt(b['market_cap_rank'], 10))
      return 1
    return 0
  }

  sortNameDesc(a, b) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  }

  sortNameAsc(a, b) {
    if (a.name > b.name) return -1
    if (a.name < b.name) return 1
    return 0
  }

  sortSymbolDesc(a, b) {
    if (a.symbol < b.symbol) return -1
    if (a.symbol > b.symbol) return 1
    return 0
  }

  sortSymbolAsc(a, b) {
    if (a.symbol > b.symbol) return -1
    if (a.symbol < b.symbol) return 1
    return 0
  }

  sortPriceDesc(a, b) {
    if (parseFloat(a.current_price) < parseFloat(b.current_price)) return -1
    if (parseFloat(a.current_price) > parseFloat(b.current_price)) return 1
    return 0
  }

  sortPriceAsc(a, b) {
    if (parseFloat(a.current_price) > parseFloat(b.current_price)) return -1
    if (parseFloat(a.current_price) < parseFloat(b.current_price)) return 1
    return 0
  }

  sortHigh1DDesc(a, b) {
    if (parseFloat(a.high_24h) < parseFloat(b.high_24h)) return -1
    if (parseFloat(a.high_24h) > parseFloat(b.high_24h)) return 1
    return 0
  }

  sortHigh1DAsc(a, b) {
    if (parseFloat(a.high_24h) > parseFloat(b.high_24h)) return -1
    if (parseFloat(a.high_24h) < parseFloat(b.high_24h)) return 1
    return 0
  }

  // sortChange1HDesc(a, b) {
  //   if (
  //     a.quotes[this.state.currency].percent_change_1h === null ||
  //     b.quotes[this.state.currency].percent_change_1h === null
  //   )
  //     return -1
  //   if (
  //     parseFloat(a.quotes[this.state.currency].percent_change_1h) <
  //     parseFloat(b.quotes[this.state.currency].percent_change_1h)
  //   )
  //     return -1
  //   if (
  //     parseFloat(a.quotes[this.state.currency].percent_change_1h) >
  //     parseFloat(b.quotes[this.state.currency].percent_change_1h)
  //   )
  //     return 1
  //   return 0
  // }

  // sortChange1HAsc(a, b) {
  //   if (
  //     a.quotes[this.state.currency].percent_change_1h === null ||
  //     b.quotes[this.state.currency].percent_change_1h === null
  //   )
  //     return -1
  //   if (
  //     parseFloat(a.quotes[this.state.currency].percent_change_1h) >
  //     parseFloat(b.quotes[this.state.currency].percent_change_1h)
  //   )
  //     return -1
  //   if (
  //     parseFloat(a.quotes[this.state.currency].percent_change_1h) <
  //     parseFloat(b.quotes[this.state.currency].percent_change_1h)
  //   )
  //     return 1
  //   return 0
  // }

  sortChange1DDesc(a, b) {
    if (
      a.price_change_percentage_24h === null ||
      b.price_change_percentage_24h === null
    )
      return -1
    if (
      parseFloat(a.price_change_percentage_24h) <
      parseFloat(b.price_change_percentage_24h)
    )
      return -1
    if (
      parseFloat(a.price_change_percentage_24h) >
      parseFloat(b.price_change_percentage_24h)
    )
      return 1
    return 0
  }

  sortChange1DAsc(a, b) {
    if (
      a.price_change_percentage_24h === null ||
      b.price_change_percentage_24h === null
    )
      return -1
    if (
      parseFloat(a.price_change_percentage_24h) >
      parseFloat(b.price_change_percentage_24h)
    )
      return -1
    if (
      parseFloat(a.price_change_percentage_24h) <
      parseFloat(b.price_change_percentage_24h)
    )
      return 1
    return 0
  }

  // sortChange1WDesc(a, b) {
  //   if (
  //     a.quotes[this.state.currency].percent_change_7d === null ||
  //     b.quotes[this.state.currency].percent_change_7d === null
  //   )
  //     return -1
  //   if (
  //     parseFloat(a.quotes[this.state.currency].percent_change_7d) <
  //     parseFloat(b.quotes[this.state.currency].percent_change_7d)
  //   )
  //     return -1
  //   if (
  //     parseFloat(a.quotes[this.state.currency].percent_change_7d) >
  //     parseFloat(b.quotes[this.state.currency].percent_change_7d)
  //   )
  //     return 1
  //   return 0
  // }

  // sortChange1WAsc(a, b) {
  //   if (
  //     a.quotes[this.state.currency].percent_change_7d === null ||
  //     b.quotes[this.state.currency].percent_change_7d === null
  //   )
  //     return -1
  //   if (
  //     parseFloat(a.quotes[this.state.currency].percent_change_7d) >
  //     parseFloat(b.quotes[this.state.currency].percent_change_7d)
  //   )
  //     return -1
  //   if (
  //     parseFloat(a.quotes[this.state.currency].percent_change_7d) <
  //     parseFloat(b.quotes[this.state.currency].percent_change_7d)
  //   )
  //     return 1
  //   return 0
  // }

  sortClick(type) {
    const cryptocurrencies = this.state.cryptocurrencies
    const sortType = this.state.sort[type]
    let sortTypeValue = 'asc'
    // Sort
    if (sortType === 'asc') {
      if (type === 'price') {
        cryptocurrencies.sort(this.sortPriceDesc)
      } else if (type === 'rank') {
        cryptocurrencies.sort(this.sortRankDesc)
      } else if (type === 'name') {
        cryptocurrencies.sort(this.sortNameDesc)
      } else if (type === 'symbol') {
        cryptocurrencies.sort(this.sortSymbolDesc)
      } else if (type === 'change_1h') {
        cryptocurrencies.sort(this.sortChange1HDesc)
      } else if (type === 'high_1d') {
        cryptocurrencies.sort(this.sortHigh1DDesc)
      } else if (type === 'change_1d') {
        cryptocurrencies.sort(this.sortChange1DDesc)
      } else if (type === 'change_1w') {
        cryptocurrencies.sort(this.sortChange1WDesc)
      }
      sortTypeValue = 'desc'
    } else {
      if (type === 'price') {
        cryptocurrencies.sort(this.sortPriceAsc)
      } else if (type === 'rank') {
        cryptocurrencies.sort(this.sortRankAsc)
      } else if (type === 'name') {
        cryptocurrencies.sort(this.sortNameAsc)
      } else if (type === 'symbol') {
        cryptocurrencies.sort(this.sortSymbolAsc)
      } else if (type === 'change_1h') {
        cryptocurrencies.sort(this.sortChange1HAsc)
      } else if (type === 'high_1d') {
        cryptocurrencies.sort(this.sortHigh1DAsc)
      } else if (type === 'change_1d') {
        cryptocurrencies.sort(this.sortChange1DAsc)
      } else if (type === 'change_1w') {
        cryptocurrencies.sort(this.sortChange1WAsc)
      }
      sortTypeValue = 'asc'
    }
    // Save new sort state
    this.setState({ sort: { [type]: sortTypeValue } })
  }

  addSortClassName(type) {
    const sortState = this.state.sort
    if (sortState[type]) {
      if (sortState[type] === 'asc') {
        return 'up-arrow'
      } else {
        return 'down-arrow'
      }
    }
    return ''
  }

  render() {
    let cryptocurrencies = this.state.cryptocurrencies

    const sortType = Object.keys(this.state.sort)
    // Sort
    if (this.state.sort[sortType] === 'asc') {
      if (sortType[0] === 'price') {
        cryptocurrencies.sort(this.sortPriceDesc)
      } else if (sortType[0] === 'rank') {
        cryptocurrencies.sort(this.sortRankDesc)
      } else if (sortType[0] === 'name') {
        cryptocurrencies.sort(this.sortNameDesc)
      } else if (sortType[0] === 'symbol') {
        cryptocurrencies.sort(this.sortSymbolDesc)
      } else if (sortType[0] === 'change_1h') {
        cryptocurrencies.sort(this.sortChange1HDesc)
      } else if (sortType[0] === 'change_1d') {
        cryptocurrencies.sort(this.sortChange1DDesc)
      } else if (sortType[0] === 'change_1w') {
        cryptocurrencies.sort(this.sortChange1WDesc)
      }
    } else {
      if (sortType[0] === 'price') {
        cryptocurrencies.sort(this.sortPriceAsc)
      } else if (sortType[0] === 'rank') {
        cryptocurrencies.sort(this.sortRankAsc)
      } else if (sortType[0] === 'name') {
        cryptocurrencies.sort(this.sortNameAsc)
      } else if (sortType[0] === 'symbol') {
        cryptocurrencies.sort(this.sortSymbolAsc)
      } else if (sortType[0] === 'change_1h') {
        cryptocurrencies.sort(this.sortChange1HAsc)
      } else if (sortType[0] === 'change_1d') {
        cryptocurrencies.sort(this.sortChange1DAsc)
      } else if (sortType[0] === 'change_1w') {
        cryptocurrencies.sort(this.sortChange1WAsc)
      }
    }

    const optionalData = this.props.optionalData
      .filter((oData) => oData.checked)
      .map((oData, key) => this.renderOptional(oData, key))
    const emptyState = (
      <tr>
        <td className="empty-td" colSpan="8">
          Fetching data...
        </td>
      </tr>
    )
    return (
      <div className="table-wrap">
        <table className="table is-fullwidth is-narrow">
          <thead>
            <tr>
              <th
                onClick={() => {
                  this.sortClick('rank')
                }}
                className="align-left sortable"
              >
                Rank <span className={this.addSortClassName('rank')}></span>
              </th>
              <th
                onClick={() => {
                  this.sortClick('name')
                }}
                className="sortable"
              >
                Name <span className={this.addSortClassName('name')}></span>
              </th>
              <th
                onClick={() => {
                  this.sortClick('symbol')
                }}
                className="sortable"
              >
                Symbol <span className={this.addSortClassName('symbol')}></span>
              </th>
              <th
                onClick={() => {
                  this.sortClick('price')
                }}
                className="sortable"
              >
                Price ({this.state.currency}){' '}
                <span className={this.addSortClassName('price')}></span>
              </th>
              {/* <th
                onClick={() => {
                  this.sortClick('change_1h')
                }}
                className="sortable"
              >
                Change 1h{' '}
                <span className={this.addSortClassName('change_1h')}></span>
              </th> */}
              <th
                onClick={() => {
                  this.sortClick('high_1d')
                }}
                className="sortable"
              >
                High 1d{' '}
                <span className={this.addSortClassName('high_1d')}></span>
              </th>
              <th
                onClick={() => {
                  this.sortClick('change_1d')
                }}
                className="sortable"
              >
                Change 1d{' '}
                <span className={this.addSortClassName('change_1d')}></span>
              </th>
              {/* <th
                onClick={() => {
                  this.sortClick('change_1w')
                }}
                className="sortable"
              >
                Change 1w{' '}
                <span className={this.addSortClassName('change_1w')}></span>
              </th> */}
              {optionalData}
              <th className="align-right">Last Updated</th>
              <th className="align-right">Share</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th
                onClick={() => {
                  this.sortClick('rank')
                }}
                className="align-left sortable"
              >
                Rank <span className={this.addSortClassName('rank')}></span>
              </th>
              <th
                onClick={() => {
                  this.sortClick('name')
                }}
                className="sortable"
              >
                Name <span className={this.addSortClassName('name')}></span>
              </th>
              <th
                onClick={() => {
                  this.sortClick('symbol')
                }}
                className="sortable"
              >
                Symbol <span className={this.addSortClassName('symbol')}></span>
              </th>
              <th
                onClick={() => {
                  this.sortClick('price')
                }}
                className="sortable"
              >
                Price ({this.state.currency}){' '}
                <span className={this.addSortClassName('price')}></span>
              </th>
              {/* <th
                onClick={() => {
                  this.sortClick('change_1h')
                }}
                className="sortable"
              >
                Change 1h{' '}
                <span className={this.addSortClassName('change_1h')}></span>
              </th> */}
              <th
                onClick={() => {
                  this.sortClick('high_1d')
                }}
                className="sortable"
              >
                High 1d{' '}
                <span className={this.addSortClassName('high_1d')}></span>
              </th>
              <th
                onClick={() => {
                  this.sortClick('change_1d')
                }}
                className="sortable"
              >
                Change 1d{' '}
                <span className={this.addSortClassName('change_1d')}></span>
              </th>
              {/* <th
                onClick={() => {
                  this.sortClick('change_1w')
                }}
                className="sortable"
              >
                Change 1w{' '}
                <span className={this.addSortClassName('change_1w')}></span>
              </th> */}
              {optionalData}
              <th className="align-right">Last Updated</th>
              <th className="align-right">Share</th>
            </tr>
          </tfoot>
          <tbody>
            {cryptocurrencies.length
              ? cryptocurrencies.map((data, key) => {
                  return (
                    <TableRow
                      cyrptocurrency={data}
                      index={data.rank}
                      key={key}
                      optionalData={this.props.optionalData}
                      currency={this.state.currency}
                    ></TableRow>
                  )
                })
              : emptyState}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
