import React from 'react';

import style from "../../css/Card.module.css"
import { addToCart } from '../../icon/icons';

const Card = ({cardObj, setCart, cart}) => {
    
        return ( 
        <div className={style.card_box} >
            <img src={cardObj.pic.picUrl} alt="picture" />
            <p>{cardObj.title}</p>
            <p>{cardObj.id}</p>
            <p>{cardObj.price} EUR</p>
            <p className={style.addToCart} onClick={()=>addToCartfunc(cardObj)}>{addToCart}</p>
        </div>
        )
        function addToCartfunc(cardObj){



            if(!(Object.keys(cart).includes(cardObj.productId))){

                setCart({...cart, [cardObj["productId"]] : 1 })
            } else {
                
                let itemNumberInCart = Number(cart[cardObj.productId]) + 1
                console.log(itemNumberInCart);
                setCart({...cart, [cardObj["productId"]] : itemNumberInCart })
            }
            
        }

};

export default Card;