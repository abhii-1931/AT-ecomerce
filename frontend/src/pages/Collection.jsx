import React, { useContext, useState, useEffect } from 'react'
import {Shopcontext} from '../context/Shopcontext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import Productitem from '../components/Productitem'

const Collection = () => {
  const {products, search, showsearch} = useContext(Shopcontext)
  const [showfilter, setShowfilter] = useState(false)
  const [filterproducts, setFilterproducts] = useState([])
  const [category, setCategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [sortType, setSortType] = useState('relavent')



  const toggleCategory = (e)=>{
    console.log(category.includes(e.target.value))
    if (category.includes(e.target.value)) {
      setCategory(category.filter(item=>item !== e.target.value))
      // setCategory(prev=>prev.filter(item=>item !== e.target.value ))
    }
    else{
      setCategory([...category, e.target.value])
    }
  }


  const toggleSubcategory = (e)=>{
    if (subcategory.includes(e.target.value)) {
      setSubcategory(subcategory.filter(item=>item !== e.target.value))
      // setSubcategory(prev=>prev.filter(item=>item !== e.target.value ))
    }
    else{
      setSubcategory([...subcategory, e.target.value])
    }
  }

  useEffect(() => {
    setFilterproducts(products)
  }, [])


  useEffect(() => {
    sortProducts()
  }, [sortType])
  

  const applyFilters = () => {
    let productCopy = products.slice()

    if(showsearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item=>(category.includes(item.category)))
    }
    if (subcategory.length > 0) {
      productCopy = productCopy.filter(item=>(subcategory.includes(item.subCategory)))
    }
    setFilterproducts(productCopy)
  }

  
  const sortProducts = () => {
    let fpCopy = filterproducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterproducts(fpCopy.sort((a, b)=>(a.price - b.price)))
        break
      case 'high-low':
        setFilterproducts(fpCopy.sort((a, b)=>(b.price - a.price)))
        break
      default:
        applyFilters()
        break
    }
  }
  


  useEffect (() => {
    applyFilters()
  }, [category, subcategory, search, showsearch, products])
  


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={()=>{setShowfilter(!showfilter)}} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showfilter?"rotate-90":''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter?"":"hidden"} sm:block`}>
          <p className='mb-3  text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2  text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter?"":"hidden"} sm:block`}>
          <p className='mb-3  text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2  text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubcategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubcategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubcategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={"ALL"} text2={"COLLECTIONS"}/>
            <select onChange={(e)=>(setSortType(e.target.value))} className='boder-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterproducts.map((item, index)=>(
                < Productitem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
              ))
            }
          </div>
      </div>
    </div>
  )
}

export default Collection
