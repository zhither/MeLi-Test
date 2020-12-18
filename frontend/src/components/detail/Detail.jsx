import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";

import './detail.scss';

import Axios from 'axios';
import Zoom from 'react-img-zoom'

import back from '../../assets/back.svg';

const Detail = () => {
    const [data, setData] = useState('');
    let history = useHistory();
    let { id } = useParams();

    useEffect(async () => {
        var config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        await Axios.get(`http://localhost:4000/api/items/${id}`, config)
            .then(res => {
                setData(res.data);
            })
    }, []);

    return (
        <div className="detail-card">
            <img src={back} alt="goBack" className='back' onClick={() => history.goBack()}></img>
            {
                data &&
                <div>
                    <div className="header-container">
                        <div className='tags'>
                            <p>{data.item.condition}</p>
                        </div>
                        <div className='detail-header'>
                            <h3> {data.item.title} </h3>
                            <h1 className='price'>{data.item.price.currency} {data.item.price.amount}<sup>{" "}00</sup></h1>
                            <button className="pay-btn"> Comprar </button>
                        </div>
                    </div>
                    <div className='detail-img-card'>
                        <Zoom
                            img={data.item.picture}
                            zoomScale={3}
                            width={600}
                            height={500}
                        />
                        <div className='detail-description'>
                            <h3 className='description-header'> Descripción del producto</h3>
                            <p> {data.item.description} </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Detail