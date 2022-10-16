import React from 'react'
import Closeicon  from '../icons/close.png';
function Infobar({room}) {
  return (
    <div className='flex justify-between w-full h-14 bg-blue-600 items-center p-4'>
        <h3 className=' font-bold text-white ' > {room} </h3>
        <div >
            <a href='/'><img src={Closeicon}  /></a>
        </div>
    </div>
  )
}

export default Infobar