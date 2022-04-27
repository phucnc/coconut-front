import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import ReactModal from 'react-modal';
import Grid from '@material-ui/core/Grid';
import { Modal } from 'components/organisms/modal';
import { useClipboard } from "use-clipboard-hook";
import { Text } from 'components/atoms/text';
import { Button } from 'components/atoms/button';
import { ModalHeader } from 'components/molecules/modalHeader';
import { resetStore } from 'store/createNFT';
import {openModalCreate,openModalCreateMulti } from 'store/buyNFT';
import { useSnackbar } from 'notistack';
import { Icon } from 'components/atoms/icon';
import { Link } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
type Modifier = 'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';

interface Props {
  link?:string;
}


export const Modalmulti: React.FC<Props> = props => {
  // const [modalOpenShare, setModalOpenShare] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
    <h2 className="modal_title_multi">Choose type</h2>
    <span className="modal_title_multi" > Choose “Single” for one of a kind or “Multiple” if you want to sell one collectible multiple times.
    </span>
      <Grid
        container
        spacing={3}
        // direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid className="buttonedit" item xs={5} >
          <ul>
            <button onClick= {() => dispatch(openModalCreate())}  className="multi-button" >
            <li><Icon modifiers="superlarge" iconName="single" /></li>
            <li className="span-header"><span > Single</span></li>
            <li className="span-icon">
              <p> If you want to highlight the uniqueness and individuelity of  your item
              </p>
            </li>
            </button>
            {/* <div className="span-commingsoon">
              <span>&nbsp;&#8212; Comming Soon &#8212;</span>
            </div> */}
          </ul>
        </Grid>
        <Grid className="buttonedit" item xs={5} >
          <ul>
            <button onClick= {() => dispatch(openModalCreateMulti())}
            className="multi-button">
            <li><Icon modifiers="superlarge" iconName="multi" /></li>
            <li className="span-header"><span > Multiple</span></li>
            <li className="span-icon">
              <p > If you want to share  your item with large number of community members
              </p>
            </li>
            </button>
          </ul>
        </Grid>
      </Grid>
   </>
  
  ) 
};

export default hot(Modalmulti);
