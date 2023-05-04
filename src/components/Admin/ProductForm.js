import React from 'react';
import { useState } from 'react';
import { addNewProductService, editProducService } from '../../services/admin-service';



const ProductForm = ({btn, text}) => {
    const basicInputs = {title:"", price:"", "item-number": ""}
    const [inputs, setInputs]=useState(basicInputs)
    return (
        <form onSubmit={(e) => submit(e)}>
       
          <div>
            <p>
              <label htmlFor="title">Title: </label>
            </p>
            <input
              type="text"
              placeholder="Title"
              id="title"
              value={inputs.title}
              onChange={inputTitle}
            />
          </div>
        

        <p>
          <label htmlFor="item-number">Item number: </label>
        </p>
        <input
          type="text"
          placeholder="Item number"
          id="item-number"
          value={inputs["item-number"]}
          onChange={inputNumber}
        />
        <p>
          <label htmlFor="price">Price: </label>
        </p>
        <input
          type="number"
          placeholder="Price"
          id="price"
          value={inputs.price}
          onChange={inputPrice}
        />

        <p>
          <button>{btn}</button>
        </p>
      </form>
    );

    function submit(e){
        e.preventDefault()
        text == "new" ? addNewProductService(inputs) : editProducService(inputs)
  

    }

    function inputTitle(e){
        setInputs({...inputs, title: e.target.value})
    }
    function inputPrice(e){
        setInputs({...inputs, price: e.target.value})
        
    }
    function inputNumber(e){
        setInputs({...inputs, "item-number": e.target.value})

    }
};

export default ProductForm;