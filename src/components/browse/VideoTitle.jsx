import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[18%] px-6 md:px-12 absolute w-full aspect-video bg-gradient-to-r from-black text-white'>
      <h1 className='text-xl md:text-6xl font-bold'>{title}</h1>
      <p className='w-4/12 my-3 text-lg font-semibold hidden md:inline-block'>{overview}</p>
      <div className='gap-2 hidden md:flex'>
        <button className='px-4 py-2 bg-white text-black rounded-sm font-medium text-xl text-align inline-flex hover:bg-white/90'>
          <span className='ri-play-fill text-2xl'></span>  Play
        </button>
        <button className='px-4 py-2 bg-gray-700/90 rounded-sm text-xl'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle