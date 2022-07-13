import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import { Button } from 'components/atoms/button';
import { Card } from 'components/atoms/card';
import { TabList } from 'components/molecules/tabList';
import { TabButton } from 'components/molecules/tabButton';
import { CardType, CardWallet } from 'util/formatBalance';
import { useClipboard } from "use-clipboard-hook";
import { useSnackbar } from 'notistack';
import { useDispatch,useSelector } from 'react-redux';
import { commonStart } from 'store/common';
import { Text } from 'components/atoms/text';
import { getBuyStore,switchKR,switchEN,storeAddress } from 'store/buyNFT';
type Modifier = 'fullwidth';

interface Props {
  modifiers?: Modifier | Modifier[];
  open?: boolean;
  handleDisconnect?: () => void;
  walletAccount: string;
  walletAccountKaikas: string;
  balanceBNB: number;
  balanceBUSD: number;
  balanceCONT: number;
  balanceKai: number;
  hideDisconnect?: boolean;
}

export const Mywallet: React.FC<Props> = props => {
  const message = 'Copied';
  const dispatch = useDispatch();
  const { isTrigger,isRefresh,isKR} = useSelector(getBuyStore);
  const [selectedCard, setSelectedCard] = useState<CardWallet>('Metamask');
  const { ref, copy } = useClipboard({
    onSuccess: (text) => enqueueSnackbar(message, {
      variant: 'success',
    }),
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <div className={mapModifiers('m-mywallet', props.modifiers, props.open && 'open', selectedCard.toLowerCase())}>
      <div className="m-mywallet_title">
        <Text size="18" modifiers={["inline"]}> My Wallet</Text>
        <Button modifiers={["inline","disconnect"]} handleClick={props.handleDisconnect}>
          Disconnect All
        </Button>
      </div>
      <div className="m-mywallet_tablist">
      <TabList>
        {['Metamask', 'Kaikas'].map(card => (
          <TabButton modifiers="walletSwitch" wallet key={card} active={selectedCard === card} handleClick={() => {setSelectedCard(card as CardWallet);  
            dispatch(storeAddress.started({ store_address: card }))
          }}>
            {card}
          </TabButton>
        ))}
      </TabList>
      </div>
      <div className="m-mywallet_cards">
        <div className="m-mywallet_cardwrapper">
          <div className="m-mywallet_card">
            {selectedCard === "Metamask" && (
              <Card balance_BUSD={props.balanceBUSD} balance_BNB={props.balanceBNB} balance_CONUT={props.balanceCONT} id={props.walletAccount} cardType="Metamask" />)}
            {selectedCard === "Kaikas" && (
              <Card balanceKai={props.balanceKai} id={props.walletAccountKaikas} cardType="Kaikas" />)}
            {/* <Card balance={props.balanceCONT} id={props.walletAccount} cardType="CONUT" /> */}
          </div>
        </div>
      </div>
      {/* {!props.hideDisconnect && (
        <div className="m-mywallet_disconnect">
          <span ref={ref} className="hidden">{selectedCard === "Metamask"?props.walletAccount:props.walletAccountKaikas}</span>
           
          <Button modifiers={["bid", "inline"]} handleClick={() => copy()}>
            Copy
          </Button>
          <Button modifiers={["bid", "inline"]} handleClick={props.handleDisconnect}>
            Disconnect
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default hot(Mywallet);
