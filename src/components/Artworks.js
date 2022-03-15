import React from 'react';

const Artworks = (props) => {
  return (
    <div className="row">
  
      {props.artworks.map((artwork) => (
         <div className="col-3 cardyyy">
        <div className="card" key={artwork.index}>
               <img
                 className="card-img-top"
                 src={artwork.url}
                 alt="img top"
               />

               <div className="card-section">
               <h5 className="card-title">{artwork.description}</h5>
               <h6 className="card-subtitle ">{artwork.price} cUSD</h6>
                <h4 className="card-text"> {artwork.size} </h4>

                <div  class="btn-group btn-group-lg" role="group" aria-label="...">
                <button
                onClick={() => props.buyArtwork(artwork.index)}
                className="btn btn-primary btn-b">
                
                
                Buy Artwork
                
                </button> 
                

                <button
                onClick={ ()=> props.Like(artwork.index)} class="btn btn-success btn-b"
                >
                Like
                
                </button>
                
                <button
                onClick={ ()=> props.Dislike(artwork.index)} class="btn btn-dark btn-b"
                >
                Dislike
                </button>
                <small class="int">{artwork.likes} Likes  {artwork.disLikes} Dislikes </small>

                </div>

               </div>

        </div>



         </div>
        
        
        
        
       ) )}
        </div>

              
    
      
  )} 
  export default Artworks;