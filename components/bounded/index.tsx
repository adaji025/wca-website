import React from 'react'

const Bounded = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='max-w-[1200px] mx-auto px-5'>
        {children}
    </div>
  )
}

export default Bounded