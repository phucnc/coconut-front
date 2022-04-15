import { Button } from 'components/atoms/button';
import { Icon } from 'components/atoms/icon';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'components/molecules/dropdown';
import { Mywallet } from 'components/molecules/mywallet';
import { connectWallet } from 'lib/apiCommon';
import { UserAvatar } from 'components/molecules/userAvatar';
import React, { useCallback, useEffect, useMemo, useState,useRef } from 'react';
import moment from "moment";
import Badge from '@material-ui/core/Badge';
import { Link } from 'components/atoms/link';
import { Text } from 'components/atoms/text';
import { resetStore } from 'store/createNFT';
import Grid from '@material-ui/core/Grid';
import { getBuyStore } from 'store/buyNFT';
import { connectMetaMask } from "metamask-connector";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { Modalwallet } from 'components/organisms/modalwallet';
import { ModalHeader } from 'components/molecules/modalHeader';
import axios from 'axios';
import { useWallet } from 'use-wallet';
import { Modal } from 'components/organisms/modal';
import { useEthers, useEtherBalance } from "@usedapp/core";
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { DropdownMenu, DropdownItem } from 'components/molecules/dropdownMenu';
import logo from 'assets/images/ccn_logoOF.png';
import { ButtonContainer } from 'components/molecules/buttonContainer';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props {
  wallet: any;
  balanceBUSD: number;
  balanceCONT: number;
}
const dropdownStyles = makeStyles({
  underline: {
    borderBottom: "0px solid red !important",
    "&:hover": {
      borderBottom: "0px solid rgba(0,0,0,0)"
    }
  }
});
export const MenuChunk: React.FC<Props> = ({  balanceBUSD, balanceCONT }) => {
  const [isOpenMywallet, setIsOpenMywallet] = useState(false);
  const { isTrigger,isRefresh} = useSelector(getBuyStore);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [modalOpenShare, setModalOpenShare] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(true);
  const [data, dataSet] = useState<any>(Array)
  const { t, i18n } = useTranslation();
  const [modalOpenConnect, setModalOpenConnect] = useState(false);
  const changeLanguage = lng => { i18n.changeLanguage(lng); };
  const wallet = useWallet();
  const {activateBrowserWallet,deactivate, account } = useEthers();
  const accountt = useEthers();
  const [isLoading, setIsLoading] = useState(false);
  const etherBalance = useEtherBalance(account);
  const [reg, regSet] = useState(Array);
  const connector = connectMetaMask();
  const [modalOpenNoticeCreate, setmodalOpenNoticeCreate] = useState(false);
  const ddnSt = dropdownStyles();
  
  const [item, setItem] = useState( localStorage.getItem('key') ||'en');
  const handleChange = (event) => {
    setItem(event.target.value);
    localStorage.setItem('key',event.target.value );
    const  data = sessionStorage.getItem('key');
    changeLanguage(event.target.value);
  };

  const getnoti = async () => {
    try {
      console.log("check noti",wallet.account)
      const noti = await axios.get (`${process.env.ADDRESS_API}/notice/paging?limit=999&offset&status&account_id=${wallet.account}`)
      
      const notidata = noti.data.notices
      const date = moment(noti.data.notices[0].created_at).isSame(new Date(), "day")
      const yesterday = moment(noti.data.notices[0].created_at).isSame(moment().subtract(1, "days"), "day")
      console.log ("noti",notidata)
      console.log ("yesterday",yesterday)
      console.log ("date",date)
      dataSet(notidata)
    }catch {
      console.log("fail noti")
    }
  }
  const checknoti = async () => {
    console.log("cố lên")
  }
  const updatenoti = async (cate) => {
    console.log ("updatenoti",data)
    console.log ("hello1",cate)
    try {
      const updatenoti = await axios.put (`${process.env.ADDRESS_API}/notice?id=${cate.id}`)
      setIsLoading(!isLoading)

    }catch {
      console.log("fail update status noti")
    }

    try {
        console.log ("updatenoti",data)
    } catch {
      console.log("fail update noti")
    }
  }

  useEffect(() => {
 
    changeLanguage(item)
    console.log("wallet test",wallet)
  }, []);
  useEffect(() => {
    getnoti()
    
  }, [isLoading,wallet.account,isRefresh]);

  useEffect(() => {
    if (!modalOpenShare) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpenShare]);

  useEffect(() => {
    if (!modalOpenConnect) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpenConnect]);


  useEffect(() => {
    if (!modalOpenNoticeCreate) {
      dispatch(resetStore());
      // currentSt.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpenNoticeCreate]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
 
  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  const claim = () => {
    console.log ("CLAIM")
  }
  const handleDisconnect = async () => {
      // deactivate()
      wallet.reset()
      // window.ethereum.disable()
      // setIsLoading(true)
  };
  // useEffect(()=> {
  //   // accounts();
  // },[wallet?.account,isLoading]);
  // useEffect(() => {
  //   // registerAccount();
  // }, [loading]);
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        display: 'flex',
      },
      paper: {
        marginRight: theme.spacing(2),
      },
    },
  }),
);
  const defaultProps = {
    color: 'secondary' as 'secondary',
    children: <Button handleClick={handleToggle}  ref={anchorRef} modifiers={['noti']}><Icon modifiers={['small']} iconName="bell"/></Button>,
  };
  const classes = useStyles();
  console.log("wallet",wallet)
  return (
    <div className="o-header_buttons">
      <a href={"https://conut.coconut.global"}>
        <Button modifiers={['CCNmember']}>CONUT member</Button>
      </a>
      {(wallet?.status == "disconnected" || wallet?.status == "error" ) ? ( <div><Button modifiers={['create']} handleClick={()=>setModalOpenConnect(true)}>{t("mainMenu.Create")}</Button></div>)
      : (
      <div><Button modifiers={['create','black']} handleClick={()=>setmodalOpenNoticeCreate(true)}>{t("mainMenu.Create")}</Button></div>
      )}
      {/* <div><Button modifiers={['create']} handleClick={()=>setmodalOpenNoticeCreate(true)}>{t('mainMenu.Create')}</Button></div> */}
     
      {(wallet?.status == "disconnected" || wallet?.status == "error" ) ? (
        <Button modifiers={['noBackground', 'connectwallet']} handleClick={() => setModalOpenShare(true)}>
          {t("mainMenu.Connect")}
        </Button>
        // <Button modifiers="noBackground" handleClick={() => {connectWallet(wallet);registerAccount()}}>
        //   Connect wallet
        // </Button>
      ) : (
        <>
          <Dropdown
            trigger={
              <Button
                modifiers={[ 'noPadding', 'marginRight']}
                // modifiers={['icon', 'noBackground', 'noPadding', 'marginRight']}
                handleClick={() => setIsOpenMywallet(!isOpenMywallet)}
              >
                {/* <Icon iconName="wallet" /> */}
                <Stack direction="row" spacing={1}>
                  <Chip avatar={<Avatar alt="logo" src={logo} />}
                  label={wallet.account?.replace(wallet.account.substring(5, 40), "...")} variant="outlined"
                  clickable />
                </Stack>
              </Button>
            }
            id="wallet"
            offset={{ left: 105 }}
          >
            {/* <div className="m-viewtabitem-contain">
            <li className="p-view_tabitem">
                    <div className="m-viewtabitem-balance">
                      <div className="m-viewtabitem_tabss">
                        <UserAvatar src={logo} alt="" hasTick={false} modifiers="mid" />
                        <div className="m-viewtabitem_info">
                          <Text size="14" modifiers={['bold', 'comment','left']}>
                            Cont balance
                          </Text>
                          <Text size="14" modifiers={['left','comment']}> May 6, 2021 at 12:31</Text>
                        </div>
                      </div>
                      <div>
                        <Text size="18" modifiers={['left','bold',]}>10 USD</Text>
                      </div>
                    </div>
            </li>
            </div> */}
            <Mywallet
              open={isOpenMywallet}
              walletAccount={wallet.account}
              balanceBNB={wallet.balance}
              balanceBUSD={Number(balanceBUSD)}
              balanceCONT={Number(balanceCONT)}
              handleDisconnect={handleDisconnect}
            />
          </Dropdown>
          <Button modifiers="noBackground" handleClick={handleDisconnect}>
          {/* <Button modifiers="noBackground" handleClick={handleDisconnect}> */}
            Disconnect
          </Button>
        </>
      )}
      {/* <Button modifiers={['create']} handleClick={()=>handleDisconnect()}>CLAIM</Button> */}
      <div >
      <Dropdown  handleClick={checknoti} trigger={
        
      <Button  modifiers="bell">
         <Badge
         anchorOrigin={{
             vertical: 'top',
             horizontal: 'right',}}
         variant="dot"
        //  color="primary"
         invisible={isTrigger}>
        <Icon modifiers="custom"  iconName="bellnoti"/>
        </Badge>
      </Button>
      }>
         <DropdownMenu modifiers="noti" groupName="Sort by">
          <DropdownItem>
            <div className="o-noti">
              <div className="o-noti_header">
                <Button modifiers={['asText', 'noPadding','bellcont']}>
                  <Text size="18">Notification</Text>
                
                </Button>
              </div>
              <div className="o-noti_containt">
                <Icon modifiers="dotgreen" iconName="dotgreen"/>
                <Text modifiers={["inline","titleNoti"]}>New</Text>
              </div>
              {/* ///////// */}
              <div>
              {/* moment(noti.data.notices[0].created_at).isSame(moment().subtract(1, "days"), "day") */}
             
                {data.filter((e, i) => moment(e.created_at).isSame(new Date(), "day") == true).map ( cate => (
                  <button className="p-view_toggle" onClick={()=>updatenoti(cate)}>
                <li className="p-view_tabitemNew">
                <Link href={"/view?id="+cate.collectibe?.id}>
                  <div className="m-viewtabitem-noti">
                    <div className="m-viewtabitem_tabss">
                      <UserAvatar src={cate.from_account?cate.from_account.avatar.String:logo} alt="" hasTick={false} modifiers="mid" />
                      <div className="m-viewtabitem-noti_info">
                        {/* <Text size="14" modifiers={['bold','left']}>Sontung
                        </Text> */}
                        {cate.status === 0 ? (<Text size="14" modifiers={['bold', 'comment','left','blackCor']}>{cate.content}
                        </Text>) : (
                        <Text size="14" modifiers={['bold', 'comment','left']}>{cate.content}
                        </Text>
                        )}
                        <ul>
                        <li><Text size="14" modifiers={['comment','left']}>{moment(cate.created_at).fromNow()}</Text></li>
                        </ul>
                      </div>
                      
                    </div>
                    {cate.status === 0 &&(<Icon modifiers="new" iconName="dotgreen"/>)}
                  </div>
                  </Link>
                </li>
                </button>
                ))}
     
              </div>
              {/* ///////// */}
              <div className="o-noti_containt">
                {/* <Icon modifiers="dotgreen" iconName="dotgreen"/> */}
                <Text modifiers={["inline","titleNoti"]}>Earlier</Text>
              </div>
              <div>
              
                {data.filter((e, i) => moment(e.created_at).isSame(new Date(), "day") == false).map ( cate => (
                
                <li className="p-view_tabitem">
                  <Link href={"/view?id="+cate.collectibe?.id}>
                   <button className="p-view_toggle" onClick={()=>updatenoti(cate)}>
                  <div className="m-viewtabitem-noti">
                    <div className="m-viewtabitem_tabss">
                      <UserAvatar src={cate.from_account?cate.from_account.avatar.String:logo} alt="" hasTick={false} modifiers="mid" />
                      <div className="m-viewtabitem-noti_info">
                        {/* <Text size="14" modifiers={['bold','left']}>Sontung
                        </Text> */}
                         {cate.status === 0 ? (<Text size="14" modifiers={['bold', 'comment','left','blackCor']}>{cate.content}
                        </Text>) : (
                        <Text size="14" modifiers={['bold', 'comment','left']}>{cate.content}
                        </Text>
                        )}
                        <ul>
                        <li><Text size="14" modifiers={['comment','left']}>{moment(cate.created_at).fromNow()}</Text></li>
                        </ul>
                      </div>
                      {/* <UserAvatar src={dotgreen} alt="" hasTick={false} modifiers="mid" /> */}
                     
                    </div>
                    {cate.status === 0 &&(<Icon modifiers="new" iconName="dotgreen"/>)
                    }
                  </div>
                  </button>
                  </Link>
                </li>
              
               
                ))}
              </div>
            </div>
          </DropdownItem>
         </DropdownMenu>

      </Dropdown>
     
</div>
      <FormControl
      style={{
        width: "66px",
        boxShadow: "none",
        left:"30px",
        fontSize:"10px",
      }}
    >
      <Select
        id="locationSelect"
        className={ddnSt.underline}
        value={item}
        onChange={handleChange}
        disableUnderline
      >
        <MenuItem  value={'en'}><Icon modifiers="flag" iconName="flagEN"/>&nbsp;En</MenuItem>
        <MenuItem  value={'kr'}><Icon modifiers="flag" iconName="flagKR"/>&nbsp;Kr</MenuItem>
        <MenuItem  value={'vi'}><Icon modifiers="flag" iconName="flagVN"/>&nbsp;Vi</MenuItem>
      </Select>
    </FormControl>
      <Modalwallet modifiers={['wallet']} isOpen={modalOpenShare} handleClose={() => setModalOpenShare(false)}>
      <h2 className="modal_title">Connect your wallet</h2>
      <span className="modal_title" > Connect with one of the wallets we support or Create a new wallet
      </span>
        <Grid
          container
          spacing={3}
          // direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid className="buttonedit" item xs={4} >
            <ul>
              <button onClick={() => {connectWallet(wallet);setModalOpenShare(false)}} className="share-button" >
              <li><Icon modifiers="superlarge" iconName="metamask" /></li>
              <li className="span-header"><span > Metamask Wallet</span></li>
              <li className="span-icon">
                <p> The most popular wallet right now in crypto-currency
                </p>
              </li>
              </button>
              {/* <div className="span-commingsoon">
                <span>&nbsp;&#8212; Comming Soon &#8212;</span>
              </div> */}
            </ul>
          </Grid>
          <Grid className="buttonedit" item xs={4} >
            <ul>
              {/* <button onClick={() => accounts()} */}
              <button disabled
              className="share-button">
              <li><Icon modifiers="superlarge" iconName="binance" /></li>
              <li className="span-header"><span > Binance Chain Wallet</span></li>
              <li className="span-icon">
                <p > Easy to create and use, Best wallet for new users
                </p>
              </li>
              </button>
              <div className="span-commingsoon">
                <span>&nbsp;&#8212; Comming Soon &#8212;</span>
              </div>
            </ul>
          </Grid>
          <Grid className="buttonedit" item xs={4} >
            <ul>
              <button disabled className="share-button">
              <li><Icon modifiers="superlarge" iconName="c98" /></li>
              <li className="span-header">
                <span > Coin98 Wallet
                </span>
              </li>
              <li className="span-icon">
                <p> Convenient wallet supports various blockchains
                </p>
              </li>
              </button>
              <div className="span-commingsoon">
                <span>&nbsp;&#8212; Comming Soon &#8212;</span>
              </div>
            </ul>
          </Grid>
          <div className="span-icon">
            <span>We do not own your private keys and cannot access your funds without your confirmation.</span>
          </div>
        </Grid>
      </Modalwallet>
      <Modal modifiers="noticeCreate" isOpen={modalOpenNoticeCreate} handleClose={() => setmodalOpenNoticeCreate(false)}>
        <ModalHeader icon={true} title={t("create.CreateNFT")} handleClose={() => setmodalOpenNoticeCreate(false)} />
        <Grid
          container
          spacing={0}
          // direction="column"
          alignItems="center"
          // justify="center"
        >
          <Text>{t("mainMenu.legal1")}</Text>
          <Text>{t("mainMenu.legal2")}</Text>
          <Grid item xs={7}>
            <Button modifiers="noticeCreate" anchor={{ href: '/create' }}> Agree</Button>
          </Grid>
          <Grid item xs={5}>
            <Button modifiers="noBackgroundBorder" handleClick={()=>setmodalOpenNoticeCreate(false)}> {t("mainMenu.Cancel")}</Button>
          </Grid>
        </Grid>
      </Modal>
      <Modal modifiers="error" isOpen={modalOpenConnect} handleClose={() => setModalOpenConnect(false)}>
          <Text modifiers={['bold', 'center']}>{t("mainMenu.ConnectD")}</Text>
          <ButtonContainer>
            <Button modifiers="bid" handleClick={() => setModalOpenConnect(false)}>
              Cancel
          </Button>
            <Button modifiers="buy" handleClick={() => { connectWallet(wallet); setModalOpenConnect(false) }}>
            {t("mainMenu.Connect")}
          </Button>
          </ButtonContainer>
        </Modal>
    </div>
  );
};
