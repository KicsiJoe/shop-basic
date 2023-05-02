import React from 'react';

import style from "../../css/Card.module.css"

const Card = ({cardObj}) => {
 
        return ( 
        <div className={style.card_box}>
            <h1>{cardObj.title}</h1>
            <p>{cardObj.id}</p>
            <p>{cardObj.price}</p>
        </div>
        )

};

export default Card;