 import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";



import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import artgallery from  "./contract/artgallery.abi.json";
import IERC from "./contract/IERC.abi.json";
import Artworks from './components/Artworks';
import NewArtwork from './components/Newartwork';
 




const ERC20_DECIMALS = 18;


const contractAddress = "0x9F6C54C19F51c0aE08952d9235D30AEa3a8C01eB";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";




function App() {

  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [artworks, setArtworks] = useState([]);



  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Error Occurred");
    }
  };


  const getBalance = (async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const contract = new kit.web3.eth.Contract(artgallery, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  });



  const getArtwork = (async () => {
    const artworksLength = await contract.methods.getartworksLength().call();
    const _art = []
    for (let index = 0; index < artworksLength; index++) {
      console.log(artworksLength);
      let _artworks = new Promise(async (resolve, reject) => {
      let artwork = await contract.methods.getArtwork(index).call();

        resolve({
          index: index,
          owner: artwork[0],
          url: artwork[1],
          description: artwork[2],
         size: artwork[3],
          price: artwork[4],
          likes: artwork[5],
          disLikes: artwork[6]
             
        });
      });
      _art.push(_artworks);
    }

    const _artworks = await Promise.all(_art);
    setArtworks(_artworks);
    console.log(_artworks)
  });



  const addArtwork = async (
    _url,
    _description,
    _size,
    _price
  ) => {
    try {
      await contract.methods
        .addArtwork(_url, _description, _size, _price)
        .send({ from: address });
       getArtwork();
    } catch (error) {
      console.log(error);
    }
  };


  const buyArtwork = async (_index, _price) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
      const cost = new BigNumber(artworks[_index].price)
        .shiftedBy(ERC20_DECIMALS)
        .toString();
      await cUSDContract.methods
        .approve(contractAddress, cost)
        .send({ from: address });
      await contract.methods.buyArtwork(_index).send({ from: address });
      getArtwork();
      getBalance();
    } catch (error) {
      console.log(error)
    }};



  const Like = async (_index) => {
    try {
      await contract.methods.Like(_index).send({ from: address });
      getArtwork ();
      getBalance();
    } catch (error) {
      alert.log(error);
    }};

    const Dislike = async (_index) => {
      try {
        await contract.methods.Dislike(_index).send({ from: address });
        getArtwork();
        getBalance();
      } catch (error) {
        alert(error);
      }};


      useEffect(() => {
        connectToWallet();
      }, []);
    
      useEffect(() => {
        if (kit && address) {
          getBalance();
         
        }
      }, [kit, address]);
    
      useEffect(() => {
        if (contract) {
          getArtwork();
        }
      }, [contract]);  
    
      return (
        <div>
          <Navbar balance = {cUSDBalance} />
          <Artworks artworks ={artworks}
          buyArtwork = {buyArtwork}
          Like = {Like}
          Dislike = {Dislike}
          />
          <NewArtwork addArtwork = {addArtwork}
/>
        </div>
        )


    }
    
     

export default App;
