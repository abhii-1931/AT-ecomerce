import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import Newsletterbox from '../components/Newsletterbox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae, molestiae! Sapiente neque amet iure autem fugit ullam? Repudiandae, magni quia?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae, molestiae! Sapiente neque amet iure autem fugit ullam? Repudiandae, magni quia?</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit aliquam, amet rerum alias ab quo repudiandae dolores placeat numquam voluptas!</p>
        </div>
      </div>
      <div className='text-2xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 '>
        <div className='border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nam necessitatibus fuga atque veniam excepturi.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem reiciendis molestias aperiam architecto et explicabo.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quasi quam laudantium veniam dolor earum!</p>
        </div>
      </div>
      <Newsletterbox/>
    </div>
  )
}

export default About
