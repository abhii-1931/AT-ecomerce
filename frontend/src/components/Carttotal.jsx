import React, { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title'

const Carttotal = () => {
    const {currency, delivery_fee, getcartamount} = useContext(Shopcontext)

  return (
    <div className='w-full'>
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTAL'}/>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency} {getcartamount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency} {getcartamount() === 0?0:delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <b>Total</b>
            <b>{currency} {getcartamount() === 0?0:getcartamount()+ delivery_fee}.00</b>
        </div>
      </div>
    </div>
  )
}

export default Carttotal
