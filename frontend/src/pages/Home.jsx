import React from 'react'
import Hero from '../components/Hero'
import Latestcolleciton from '../components/Latestcolleciton'
import Bestseller from '../components/Bestseller'
import Ourpolicy from '../components/Ourpolicy'
import Newsletterbox from '../components/Newsletterbox'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Latestcolleciton/>
        <Bestseller/>
        <Ourpolicy/>
        <Newsletterbox/>
    </div>
  )
}

export default Home
