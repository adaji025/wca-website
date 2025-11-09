import React from 'react'

const Bounded = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='max-w-[1280px] mx-auto w-full px-5'>
        {children}
    </div>
  )
}

export default Bounded