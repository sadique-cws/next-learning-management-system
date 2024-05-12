import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-100 w-full h-auto'>
        <div className="flex">
            <Image src="/cws.png" width={150} height={130}/>
        </div>
    </div>
  )
}

export default Footer