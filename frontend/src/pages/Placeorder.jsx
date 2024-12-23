import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { assets } from '../assets/frontend_assets/assets'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const [method, setMethod] = useState('cod')
  const {navigate, backendUrl, token, cartitems, setCartitems, getcartamount, delivery_fee, products} = useContext(Shopcontext)

  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })


  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({...data, [name]:value}))
  }
  

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      
      let orderItems = []
      for(const items in cartitems){
        for(const item in cartitems[items]){
          if (cartitems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartitems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address:formData,
        items:orderItems,
        amount:getcartamount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl+"/api/order/place", orderData, {headers:{token}})
          if (response.data.success) {
            setCartitems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl+"/api/order/stripe", orderData, {headers:{token}})
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
        break;
          default:
            break;
          }
          
        } catch (error) {
          console.log(error)
          toast.error(error.message)
    }
  }
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION '}/>
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' required value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
          <input onChange={onChangeHandler} name='lastName' required value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>
        </div>
          <input onChange={onChangeHandler} name='email' required value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address'/>
          <input onChange={onChangeHandler} name='street' required value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' required value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
          <input onChange={onChangeHandler} name='state' required value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' required value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
          <input onChange={onChangeHandler} name='country' required value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
        </div>
          <input onChange={onChangeHandler} name='phone' required value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone'/>
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <Carttotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('strip')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'strip'? 'bg-green-400':''}`}></p>
              <img src={assets.stripe_logo} alt="" className='h-5 mx-4'/>
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay'? 'bg-green-400':''}`}></p>
              <img src={assets.razorpay_logo} alt="" className='h-5 mx-4'/>
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'? 'bg-green-400':''}`}></p>
              <p className={` text-gray-500 text-sm font-medium mx-4`}>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
