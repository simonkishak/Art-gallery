import React from 'react'

import { useState } from "react";

const NewArtwork = (props) => {


 const [url, setUrl] = useState('');
 const [description, setDescription] = useState('');
 const [size, setSize] = useState('');
 const [price, setPrice] = useState(0);
 
 const submitHandler = (e) => {
  e.preventDefault();

  if(!url || !description || !size || !price) {
    alert('Please fill in all the required fields')
    return
  }
  props.addArtwork(url, description, size, price);

  setUrl('')
  setDescription('')
  setSize('')
  setPrice('')
   
};

return (
    <>
    <div className="mb-3">
    <form onSubmit={submitHandler} >
      <div className="form-group">
        <input type="text"
               className="form-control"
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               placeholder="image url" />
      </div>
      <div className="form-group">
        <input type="text"
               className="form-control"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="description"/>
      </div>
    
    
      <div className="form-group">
      
        <input type="text" 
               className="form-control"
               value={size}
               onChange={(e) => setSize(e.target.value)}
               placeholder="size" />
      </div>
    
      <div className="form-group">
    
        <input type="text"
               className="form-control"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               placeholder="price"/>
      </div>
      <button type="submit" class="btn btn-primary">Add artwork</button>
    </form>
    </div>
      </>      
               
        )
    }
    export default NewArtwork;

  
 
