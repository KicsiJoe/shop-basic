import React from 'react';

import style from "../../css/Card.module.css"

const Card = ({cardObj}) => {
 
        return ( 
        <div className={style.card_box}>
            <img src={cardObj.pic.picUrl} alt="picture" />
            <p>{cardObj.title}</p>
            <p>{cardObj.id}</p>
            <p>{cardObj.price} EUR</p>
        </div>
        )

};

export default Card;