import React from 'react';

import style from "../../css/Card.module.css"
import { addToCart } from '../../icon/icons';

const Card = ({cardObj}) => {
 
        return ( 
        <div className={style.card_box}>
            <img src={cardObj.pic.picUrl} alt="picture" />
            <p>{cardObj.title}</p>
            <p>{cardObj.id}</p>
            <p>{cardObj.price} EUR</p>
            <p className={style.addToCart} onClick={()=>addToCardfunc(cardObj)}>{addToCart}</p>
        </div>
        )
        function addToCardfunc(cardObj){
            
            console.log(cardObj);
        }

};

export default Card;