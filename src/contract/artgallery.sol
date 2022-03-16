// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract  ArtGallery {
    //Variable used as the index to store all artworks
    uint internal artworksLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Artwork {
        address payable owner;
        string image;
        string description;
        uint size;
        uint price;
        uint likes;
        uint disLikes;
         
    }

    mapping (uint =>  Artwork) internal artworks;

// this function is used to add an artwork
    function  addArtwork(
        string memory _image,
        string memory _description, 
        uint _size, 
        uint _price
    ) public {
        uint _likes =0;
        uint _disLikes =0;
         artworks [artworksLength] =  Artwork(
            payable(msg.sender),
            
            _image,
            _description,
            _size,
            _price,
            _likes,
            _disLikes
             
        );
        artworksLength++;
    }
//Returns all the artworks by index
    function getArtwork(uint _index) public view returns (
        address payable,
        string memory, 
        string memory, 
        uint, 
        uint,
        uint,
        uint
    ) {
        return (
            artworks[_index].owner,
            artworks[_index].image, 
            artworks[_index].description,  
            artworks[_index].size,
            artworks[_index].price,
            artworks[_index].likes,
            artworks[_index].disLikes
             
        );
    }
 //Function that is used to like the artwork
    function Like (uint _index)public{
        artworks[_index].likes ++;
    } 
     //Function that is used to dislike the artwork
    function Dislike(uint _index) public{
        artworks[_index].disLikes ++;
    }
//function use to delete artwork
    function Delete (uint _index)public{
        require(artworks[_index].owner==msg.sender, "Error");
        delete(artworks[_index]);
    }
//function is used to edit artwork
     function editArtwork(
        uint256 _index,
        string memory _image,
        string memory _description ,
        uint _size,
        uint _price
    ) public {
        require(msg.sender == artworks[_index].owner, "Error");// this is to ensure that only the owner of the artwork can edit the artwork
        uint _disLikes = artworks[_index].disLikes;
        uint _likes = artworks[_index].likes;
        artworks[_index] = Artwork(
            payable(msg.sender),
            _image,
            _description,
            _size,
            _price,
            _likes,
            _disLikes
        );
    }

//function is use to buy artwork
    function buyArtwork(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            artworks[_index].owner,
            artworks[_index].price
          ),
          "Transfer failed."
        );

        artworks[_index].owner = payable(msg.sender);
         
    }
    //Function that returns the total number of artworks 
    function getartworksLength() public view returns (uint) {
        return (artworksLength);
    }
}

