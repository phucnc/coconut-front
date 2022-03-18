import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import ReactModal from 'react-modal';
import Grid from '@material-ui/core/Grid';
import { Modal } from 'components/organisms/modal';
import { useClipboard } from "use-clipboard-hook";
import { Text } from 'components/atoms/text';
import { Icon } from 'components/atoms/icon';
import { useSnackbar } from 'notistack';
import { Link } from 'gatsby';
import {openModalIn, closeModalIn } from 'store/buyNFT';
import { useDispatch, useSelector } from 'react-redux';
import { commonStart } from 'store/common';
type Modifier = 'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';

interface Props {
  link?:string;
}


export const Modalinstalmetamsk: React.FC<Props> = props => {
  // const [modalOpenShare, setModalOpenShare] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  return (
    <>
        <Grid
          container
          spacing={1}
          // direction="column"
          alignItems="center"
          justify="center"
        >
          
          <Grid item xs={12} >
            <Text>You do not have the MetaMask Wallet Extension installed to use Digital Assets related functions on COCONUT.
            </Text>
          </Grid>
          <Grid item xs={12} >
          <Text> You can download and connect the MetaMask Wallet Extension to COCONUT using the instructions below or you can skip and visit our platform.</Text>
          </Grid>
        </Grid>
        <Grid
          className="containInt"
          container
         spacing={4}
        >
         
         <Grid item xs={6} >
         <button className="hoverButton">
           <a href="https://metamask.io/download.html">
          <div className="bg-yelow">
           
           <Text modifiers="flexstart">Download MetaMask Wallet Extension.
           </Text>
            <div className="bg-yelow_icon">
              <Icon modifiers="32px" iconName="metamaskfox"/>
              <Icon iconName="down"/>
            </div>
           
          </div>
          </a>
          </button>
         </Grid>
         <Grid item xs={6} >
         <button onClick={ () =>{dispatch(commonStart({ nextAction: closeModalIn() }));} }>
          <div className="bg-pink">
            <Text  modifiers="flexstart"> Skip and Visit our platform</Text>
            <div className="bg-yelow_icon">
              <Icon modifiers="60px" iconName="ccn_logo"/>
              <Icon iconName="arrowright"/>
            </div>
          </div>
          </button>
         </Grid>
       </Grid>
       <Grid
         container
         spacing={4}
        >
          <Grid item xs={1}>
          <Icon iconName="questionmark"/>
          </Grid>
          <Grid  item xs={7} >
          <Link onClick={ () =>{dispatch(commonStart({ nextAction: closeModalIn() }));} } to="/userguilde">
            <div className="howconnect">
              
          <Text>How to connect Metamask ?</Text>
          </div>
          </Link>
          </Grid>
        </Grid>
        </>
      // </Modal>
  
  ) 
};

export default hot(Modalinstalmetamsk);
