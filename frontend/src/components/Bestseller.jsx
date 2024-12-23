import React, { useContext, useState, useEffect} from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title'
import Productitem from './Productitem'

const Bestseller = () => {
    const {products} = useContext(Shopcontext)
    const [bestseller, setBestseller] = useState([])

    useEffect(() => {
        const bestproducts = products.filter((item)=>(item.bestseller));
        setBestseller(bestproducts.slice(0, 5))
    }, [products])
    

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-3'>
            <Title text1={"BEST"} text2={"SELLERS"}/>
            <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam porro doloremque corrupti? Debitis, voluptatibus! Provident?
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {bestseller.map((item, index)=>(
                <Productitem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            )
        )}
        </div>
    </div>
  )
}

export default Bestseller
