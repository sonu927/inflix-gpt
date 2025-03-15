import React, { useState } from 'react'
import AiSearchBar from './AiSearchBar'
import AiResultContainer from './AiResultContainer'

const AiSearch = () => {
  const [loading,setLoading] = useState(false);
  return (
    <div className='bg-black relative h-[100vh] z-0'>
        <div className='image-bg'></div>
        <div className='pt-36'>
            <AiSearchBar setLoading={setLoading}/>
            <AiResultContainer loading={loading}/>
        </div>
    </div>
  )
}

export default AiSearch