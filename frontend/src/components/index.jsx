import React from 'react';
import './index.scss'

import search from '../assets/portfolio.svg';

export const Home = () => {
    return (
        <div className='home'>
            <img src={search} alt='search'></img>
            <h3> Empieza buscando algo ... </h3>
        </div>
    )
}
