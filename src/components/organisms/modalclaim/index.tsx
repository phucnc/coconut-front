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
import { useSnackbar } from 'notistack';
import { Link } from 'gatsby';
type Modifier = 'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';

interface Props {
  link?:string;
}


export const Modalclaim: React.FC<Props> = props => {
  // const [modalOpenShare, setModalOpenShare] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  return (
    
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
        >
          
          <Grid item xs={12} >
            <Text> Unfortunately, you are not eligible to receive CONT token.</Text>
            <Text> <Link to="/claim">Click here</Link> to learn about Mining Reward CONT tokens!</Text>
          </Grid>
          <Grid item xs={12} >
            <Button modifiers="getCoin" disabled> Get CONT</Button>
          </Grid>
        </Grid>
      // </Modal>
  
  ) 
};

export default hot(Modalclaim);
