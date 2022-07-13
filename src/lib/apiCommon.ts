/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { commonStartFailed } from 'store/common';
import { Action } from 'typescript-fsa';
import axios from 'axios';
import Caver from 'caver-js'
import {storeAddress } from 'store/buyNFT';
import { commonStart } from 'store/common';
import { useEthers, useEtherBalance } from "@usedapp/core";
import { useDispatch, useSelector } from 'react-redux';
export const checkBinanceChain = (nextAction: Action<any>, account: string) => {
  // const {activateBrowserWallet, account } = useEthers();
  // const etherBalance = useEtherBalance(account);
  try {
    // if (account) {
    //   throw { error: 'You need to connect to your wallet to do thisss' };
    // }
    
    return nextAction;
  } catch (e) {
    return commonStartFailed({ error: e.error });
  }
};

export const connectWallet = (wallet: any) => {
  // if (window && typeof window.BinanceChain !== 'undefined') {
    // window.BinanceChain.requestAccounts().then(() => {
      // wallet.connect('injected').then(() => sessionStorage.setItem('isConnected', 'connected'));
    // });
    // window.ethereum.request({ method: 'eth_requestAccounts' });
    // window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => sessionStorage.setItem('isConnected', 'connected'));
    // console.log("walletapi",window.ethereum);
    // if (typeof window.ethereum !== 'undefined'|| (typeof window.web3 !== 'undefined')) 
    console.log("window1",window.ethereum.selectedAddress)
    if (window && typeof window.ethereum !== 'undefined') {
    try{
    (async function(){
      console.log("step1")
      try {
      const accounts  = await window.ethereum.request({ method: 'eth_requestAccounts' });
     
      console.log("step2")
      console.log("accounts",accounts)
       wallet.connect('injected').then(() => sessionStorage.setItem('isConnected', 'connected'));
      const account = accounts[0];
      const profile=    await axios.post(`${process.env.ADDRESS_API}/account?address=${account}`)
      if (window.ethereum) {
        try {
          // check if the chain to connect to is installed
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }], // Mainet chainId must be in hexadecimal numbers
            // params: [{ chainId: '0x61' }], // Testnet chainId must be in hexadecimal numbers
          });
        } catch (error) {
          // This error code indicates that the chain has not been added to MetaMask
          // if it is not, then install it into the user MetaMask
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    // chainId: '0x61',
                    chainId: '0x38',
                    rpcUrl: 'https://bsc-dataseed1.binance.org/',
                  },
                ],
              });
            } catch (addError) {
              console.error(addError);
            }
          }
          console.error(error);
        }
      } else {
        // if no window.ethereum then MetaMask is not installed
        alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
      } 
      } catch {
        alert ('MetaMask is not logged in. Please do it')
      }
      // window.location.reload();

      })();

    } catch (e) {
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
      // return commonStartFailed({ error: e.error });
    }
    } else {
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }

  
  
};

export const connectKlaytn = async () => {
  const { klaytn } = window
  console.log("testttt")
  const caver = new Caver(klaytn)
  // wallet.connect('klaytn')
  // klaytn.enable()
  console.log("window",window)
  // const account = klaytn.selectedAddress
  // const balance = await caver.klay.getBalance(account)
  // console.log("window_account",account)
  // console.log("window_balance",balance)
  if (window && typeof window.klaytn !== 'undefined') {
    if ( window.klaytn) {
      // console.log("pass 2")
      
      // (async function(){
      try {
          // const dispatch = useDispatch();
          const accounts = await  window.klaytn.enable()
          const account = window.klaytn.selectedAddress
          const balance = await caver.klay.getBalance(account)
          console.log("window_account",account)
          console.log("window_balance",balance)
          sessionStorage.setItem('klayisConnected',account);
          sessionStorage.setItem('klayBalance',balance);
          
          // dispatch(commonStart({ nextAction: storeAddress.started({store_address:account}) }))
      } catch (error) {
        console.log('User denied account access')
      }
    } else {
      console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
    }
    }

};
