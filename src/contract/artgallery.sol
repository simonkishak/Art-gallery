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

    //Address of the cUSD erc-20 token
    address internal constant cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Artwork {
        address payable owner;
        string image;
        string description;
        uint size;
        uint price;
        uint likes;
        uint disLikes;
        mapping(address => bool) hasLiked;
        mapping(address => bool) hasDisliked;
        bool forSale;  
    }

    //Event that will emit when a new art is uploaded
    event newArt(address indexed owner, uint index);

    //Even that will emit when an art is bought
    event artBought(address indexed seller, uint index, uint price, address indexed buyer);

    //Mapping that assigns index to all artworks
    mapping (uint =>  Artwork) internal artworks;

    //Modifier that allows only the owner of the art to access the functions
    modifier onlyOwner(uint _index){
        require(msg.sender == artworks[_index].owner, "Only the owner can access this function");
        _;
    }

    //Function used to add an artwork 
    function  addArtwork(
        string memory _image,
        string memory _description, 
        uint _size, 
        uint _price
    ) public {
        Artwork storage art = artworks[artworksLength];

        art.owner = payable(msg.sender);
        art.image = _image;
        art.description = _description;
        art.size = _size;
        art.price = _price;
        art.forSale= true;

        emit newArt(msg.sender, artworksLength);
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
        uint,
        bool,
        bool,
        bool
    ) {
        return (
            artworks[_index].owner,
            artworks[_index].image, 
            artworks[_index].description,  
            artworks[_index].size,
            artworks[_index].price,
            artworks[_index].likes,
            artworks[_index].disLikes,
            artworks[_index].hasLiked[msg.sender],
            artworks[_index].hasDisliked[msg.sender],
            artworks[_index].forSale   
        );
    }

    //Function that is used to like the art ensuring that user has not already liked
    function Like(uint _index)public{
        require(artworks[_index].hasLiked[msg.sender] == false, "User an like the art only once");
        artworks[_index].likes++;
        artworks[_index].hasLiked[msg.sender] = true;
    } 
    
    //Function that is used to dislike the art ensuring that the  user has not  already disliked 
    function Dislike(uint _index) public{
        require(artworks[_index].hasDisliked[msg.sender] == false, "User an dislike the art only once");
        artworks[_index].disLikes++;
        artworks[_index].hasDisliked[msg.sender] = true;
    }

    //Function to Delete the art work
    function Delete(uint _index)public onlyOwner(_index){
        delete(artworks[_index]);
    }

    //Function using which the owner can change the price of the art making it viable for reselling
     function editArtwork(
        uint256 _index,
        uint _price
    ) public onlyOwner(_index){
        artworks[_index].price = _price;
    }


    //Function which a use can use to buy the art and be the owner of that art
    function buyArtwork(uint _index) public payable  {
        require(artworks[_index].forSale == true);
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

    //Function which the owner can use to stop people from buying the artwork
    function closeSale(uint _index) public onlyOwner(_index){
        artworks[_index].forSale = false;
    }
    

    //Function that returns the total number of art works 
    function getartworksLength() public view returns (uint) {
        return (artworksLength);
    }
}
