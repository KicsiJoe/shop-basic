import React from "react";
import Card from "./Card.js";
import { useEffect } from "react";
import { useState } from "react";
import { getProduct } from "../../services/user-services";

const Cards = () => {
  const [productsList, setProductsList] = useState([])
  
  useEffect(()=>{
    getProduct("all").then(res=> setProductsList(Object.entries(res)))
  }, [])
  
  console.log(productsList);

  return (
    <>
      { productsList?.length > 0 ? (productsList?.map( cardObj =>  <Card key={cardObj[1].id} cardObj={cardObj[1]} />
      )) : ""
      }
    </>
  );
};

export default Cards;
