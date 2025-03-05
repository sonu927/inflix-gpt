import React from 'react'
import AiSearchBar from './AiSearchBar'
import AiResultContainer from './AiResultContainer'

const AiSearch = () => {
  return (
    <div className='bg-black relative h-[100vh] z-0'>
        <div className='image-bg'></div>
        <div className='pt-36'>
            <AiSearchBar />
            <AiResultContainer />
        </div>
    </div>
  )
}

export default AiSearch