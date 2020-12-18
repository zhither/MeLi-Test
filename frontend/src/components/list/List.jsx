import React from 'react';
import './list.scss';

import { useHistory } from "react-router-dom";

import greenCheck from '../../assets/approval-16.png';
import back from '../../assets/back.svg';

const List = (props) => {
    
    let history = useHistory();

    const cardDetail = (id) => {
        history.push(`/item/${id}`);
    }
    
    return (
        <div className="list">
            <img src={back} alt="goBack" className='back' onClick={() => history.goBack()}></img>
            {props.data?.items?.map((item) => (
                <div key={item.id} className="card" onClick={() => cardDetail(item.id)}>
                    <div className='img-card'>
                        <img src={item.picture} />
                    </div>
                    <div className="container">
                        <h3 className='price'> {item.price.currency} {item.price.amount} {item.free_shipping && <img src={greenCheck}></img>}</h3>
                        <p className='description'> {item.title} </p>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default List