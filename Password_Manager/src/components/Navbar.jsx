import React from 'react'
import Link from 'react'
const Navbar = () => {
  return (

    <nav className='bg-slate-800'>
        <div className="mycontainer flex flex-col gap-3 md:flex-row justify-around text-white p-4 py-5 font-bold text-center">
            <div className="log ">
                <span className='text-lime-500 text-xl'>&lt;%Pass</span><span className=''>wordM&gt;</span>
            </div>
            <ul className='flex justify-center items-center gap-7'>
                <a href="/"><li className='hover:text-red-400'>Home</li></a>
                <a href="/about"><li className='hover:text-red-400'>About</li></a>
                <a href="/contact"><li className='hover:text-red-400'>Contact</li></a>
            </ul>
            <button className='bg-green-600 flex justify-center gap-1 items-center text-center rounded-md px-3 hover:text-gray-800 ring-white ring-1'>GitHub
              <img className='intvert w-7 p-1 m-1' src="/icons/github.svg" alt="GitHub" />
            </button>
        </div>
    </nav>
    
  )
}

export default Navbar