import React from 'react'
import { NavLink } from 'react-router-dom';
const Header = () => {
 
    return (
        <header>
            <div className='flex justify-between p-5 container mx-auto'>
                <NavLink to="/" className='text-xl font-bold '>ReactQuery</NavLink>
                <ul className='flex gap-[50px] '>
                    <li className='font-semibold'>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className='font-semibold'>
                        <NavLink to="/trad">FetchOld</NavLink>
                    </li>
                    <li className='font-semibold'>
                        <NavLink to="/rq"> FetchRQ </NavLink>
                    </li>
                    <li className='font-semibold'>
                        <NavLink to="/infinite"> InfiniteScrolling </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header