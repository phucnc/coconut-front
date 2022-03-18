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
import { Link } from 'components/atoms/link';
type Modifier = 'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';

interface Props {
  link?:string;
}


export const Modalcensored: React.FC<Props> = props => {
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
            <Text modifiers="censored"> This Cryptoasset (NFT) has been reported by another user for suspected content standards violations, and is likely to be removed from the platform by conteNFT without prior notice. Therefore, Users should consider carefully before purchasing this Cryptoasset (NFT). Learn more about Being Censored Label <Link href="/termofservice"> here</Link>.
            </Text>
          </Grid>
        </Grid>
      // </Modal>
  
  ) 
};

export default hot(Modalcensored);
