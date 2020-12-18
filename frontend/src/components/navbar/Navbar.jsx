import React, { useState } from 'react';
import './navbar.scss';

import logo from '../../assets/mercado-libre-logo-5.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Axios from 'axios';

const Navbar = ({ children }) => {

    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    let history = useHistory();
    let location = useLocation();

    console.log(location)
    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        var config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        await Axios.get(`http://localhost:4000/api/items?q=${inputValue}`, config)
            .then(res => {
                console.log(res.data);
                setData(res.data);
                setIsLoading(false)
            })
        history.push(`/items?search=${inputValue}`)
    };

    return (
        <div className='app'>
            <nav className="navbar">
                <Link to={'/'}>
                    <img src={logo} alt="Logo" className='logo' />
                </Link>

                <form className="search-bar" action="/items" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nunca dejes de buscar" name="search" value={inputValue} onChange={handleChange} />
                    <button type="submit" disabled={!inputValue}><i className="fa fa-search"></i></button>
                </form>

            </nav>
            {
                isLoading ?
                    <div className="loader-center">
                        <i className="fa fa-cog fa-spin fa-10x" />
                        <h2> Cargando ...</h2>
                    </div>
                    :
                    <div>
                        <div className="categories">
                            {
                                data && location.pathname !== '/' && data.categories.slice(0, 5).map((category, index) => {
                                    if (index === data.categories.slice(0, 5).length - 1) {
                                        return <p> {category} </p>
                                    } else {
                                        return <p>{category} {">"} {" "}</p>
                                    }
                                })
                            }
                        </div>
                        <div className="content">
                            {children(data)}
                        </div>
                    </div>
            }
        </div>
    )

}

export default Navbar