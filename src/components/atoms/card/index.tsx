import React from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import { Text } from 'components/atoms/text';
import { CardType, formatBalance, CardWallet } from 'util/formatBalance';
import Grid from '@material-ui/core/Grid';
import { Button } from 'components/atoms/button';

import { connectWallet,connectKlaytn } from 'lib/apiCommon';
type Modifier = '';

interface Props {
  modifiers?: Modifier | Modifier[];
  balance_BUSD?: number | undefined;
  balance_BNB?: number;
  balance_CONUT?: number;
  balanceKai?: number;
  id: string;
  cardType: CardWallet;
}

export const Card: React.FC<Props> = props => {
  const { ref, copy } = useClipboard({
    onSuccess: (text) => enqueueSnackbar(message, {
      variant: 'success',
    }),
  });
  return (
    <div className={mapModifiers('a-card', props.modifiers, props.cardType.toLowerCase())}>
      
      <Text size="12">{props.id}</Text>
      {props.id && <Text size="28">My Balance</Text>}
      <Text size="24" modifiers="bold">
        {props.cardType === "Metamask" && (

          <>
            {props.id ? (
              <>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid xs={4}>
                    <Text size="24" modifiers="bold">BUSD</Text>
                  </Grid>
                  <Grid xs={4}>
                    <Text size="24" modifiers="bold">BNB</Text>
                  </Grid>
                  <Grid xs={4}>
                    <Text size="24" modifiers="bold">CONUT</Text>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid xs={4}>
                    <Text size="24" modifiers="bold">{formatBalance("BUSD", props?.balance_BUSD)}</Text>
                  </Grid>
                  <Grid xs={4}>
                    <Text size="24" modifiers="bold">{formatBalance("BNB", props?.balance_BNB)}</Text>
                  </Grid>
                  <Grid xs={4}>
                    <Text size="24" modifiers="bold">{formatBalance("CONUT", props?.balance_CONUT)}</Text>
                  </Grid>
                </Grid>
              </>
            ):(
              <div className="a-card-notConnectWrap">
              <h1 className="a-card-notConnectTitle">Sorry :'(</h1>
              <p>You are not connected to this wallet</p>
              <p>Please add to your wallet</p>
              <Button>Connect Wallet</Button>
            </div>
            )
          }
          </>


        )
        }
        {props.cardType === "Kaikas" && (
          <>
            {props.id ? (
              <>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid xs={4}>
                    <Text size="24" modifiers="bold">KLAY</Text>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid xs={4}>
                    <Text size="24" modifiers="bold">{formatBalance("KLAY", props?.balanceKai)}</Text>
                  </Grid>
                </Grid>
              </>
            ) : (
                <div className="a-card-notConnectWrap">
                  <h1 className="a-card-notConnectTitle">Sorry :'(</h1>
                  <p>You are not connected to this wallet</p>
                  <p>Please add to your wallet</p>
                  <Button handleClick={()=>connectKlaytn()}modifiers="walletSwitchConnect">Connect Wallet</Button>
                </div>
              )
            }
          </>
        )}

        {/* {
          // eslint-disable-next-line no-extra-boolean-cast
          !!props.balance ? formatBalance(props.cardType, props.balance) : 0
        } */}
      </Text>
      {/* <Text size="12">{props.id}</Text> */}
    </div>
  );
};

export default hot(Card);
