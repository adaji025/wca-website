import React from 'react'

const Bounded = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='max-w-[1400px] mx-auto'>
        {children}
    </div>
  )
}

export default Bounded