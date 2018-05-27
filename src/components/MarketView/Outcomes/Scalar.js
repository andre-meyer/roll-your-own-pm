import React from 'react'
import classnames from 'classnames/bind'
import Decimal from 'decimal.js'

import style from './Scalar.css'
import { Typography } from '@material-ui/core';

const cx = classnames.bind(style)

const Scalar = ({ market: { upperBound, lowerBound, decimals, unit, marginalPrices } }) => {

  const upper = Decimal(upperBound).div(10 ** decimals)
  const lower = Decimal(lowerBound).div(10 ** decimals)

  const marginalPriceLong = marginalPrices[1]
  const bounds = upper.sub(lower)
  let value = Decimal(marginalPriceLong.toString())
    .times(bounds)
    .add(lowerBound)

  return (
    <div className={cx('scalarOutcome')}>
      <div className={cx('lowerBound')}><Typography component="span">{lower.toString()}</Typography></div>
      <div className={cx('slider')}>
        <div className={cx('dot')} style={{left: `${marginalPriceLong * 100}%`}}>
          <div className={cx('label')}><Typography component="span">{value.toPrecision(4)} {unit}</Typography></div>
        </div>
      </div>
      <div className={cx('upperBound')}><Typography component="span">{upper.toString()}</Typography></div>
    </div>
  )
}

export default Scalar