/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { commonStartFailed } from 'store/common';
import { Action } from 'typescript-fsa';
import axios from 'axios';
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
    console.log("window",window.ethereum)
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
            // params: [{ chainId: '0x38' }], // Mainet chainId must be in hexadecimal numbers
            params: [{ chainId: '0x61' }], // Testnet chainId must be in hexadecimal numbers
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
                    chainId: '0x61',
                    // chainId: '0x38',
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
