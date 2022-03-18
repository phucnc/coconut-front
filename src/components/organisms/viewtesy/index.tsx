import { RouteComponentProps } from '@reach/router';
import { Button } from 'components/atoms/button';
import { CheckInput } from 'components/atoms/checkInput';
import { Icon } from 'components/atoms/icon';
import { Icontext } from 'components/atoms/icontext';
import classNames from 'classnames/bind';
import { connectWallet } from 'lib/apiCommon';
import { Image, ImageProps } from 'components/atoms/image';
import { Link } from 'components/atoms/link';
import { Spinner } from 'components/atoms/spinner';
import { Tag } from 'components/atoms/tag';
import { Text } from 'components/atoms/text';
import Radio from '@material-ui/core/Radio';
import { Textfield } from 'components/atoms/textfield';
import { ButtonContainer } from 'components/molecules/buttonContainer';
import { Dropdown } from 'components/molecules/dropdown';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { DropdownItem, DropDownItemGroup, DropdownMenu } from 'components/molecules/dropdownMenu';
import Web3 from 'web3';
import { useWallet } from 'use-wallet';
import image from 'assets/images/DESIGN.png';
import image1 from 'assets/images/avatar-1.svg';
import image2 from 'assets/images/avatar-2.svg';
import image3 from 'assets/images/avatar-3.svg';
import { UserAvatar } from 'components/molecules/userAvatar';
import img from 'assets/images/DESIGN.png';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import moment from "moment";
import Typography from '@material-ui/core/Typography';
import { resetStore } from 'store/createNFT';
import { Modalshare } from 'components/organisms/modalshare';
import { Fieldrow } from 'components/molecules/fieldrow';
import { Heading } from 'components/molecules/heading';
import { ModalHeader } from 'components/molecules/modalHeader';
import { TabButton } from 'components/molecules/tabButton';
import { TabList } from 'components/molecules/tabList';
import { Toast } from 'components/molecules/toast';
import { Video } from 'components/molecules/video';
import { ViewTabItem } from 'components/molecules/viewTabItem';
import { Modal } from 'components/organisms/modal';
import Divider from '@material-ui/core/Divider';
import { Section } from 'components/organisms/section';
import { ViewTabs, ViewTabType } from 'components/pages/view/constants';
import FormLabel from '@material-ui/core/FormLabel';
import { Form, Formik } from 'formik';
import { navigate } from 'gatsby';
import { MiddlewareMethods } from 'lib/smartContract';
import React, { useEffect, useMemo, useState,useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { useDispatch, useSelector } from 'react-redux';
import { approveBUSD, approveCONT, closeModal, getBuyStore, getProduct, openModal, purchase,modalpurchase } from 'store/buyNFT';
import { commonStart } from 'store/common';
import { getBalanceStore } from 'store/getBalance';
import { amountDollarBNB,amountDollarBUSD, amountDollarCONT, amountDollarWithServiceFee } from 'util/amount';
import { CardType, formatBalance } from 'util/formatBalance';
import { getMediaType } from 'util/getMediaType';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive'
import { useEthers, useEtherBalance } from "@usedapp/core";
import Tooltip from '@mui/material/Tooltip';
import { UserType, VideoType, VideoTypes } from 'lib/constants';
import { useTranslation } from "react-i18next";

type Modifier = 'foo' | 'bar';
const useStyles1 = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
    fontSize:'18px',
  },
  formControl: {
    margin: theme.spacing(3),
    fontSize:'18px',
  },
  formControlLabel: {
    color:'#797979', 
    marginTop: '5px!important',
    fontSize: '18px', 
   '& label': { fontSize: '18px' } 
  },
  font: {
    fontSize:'18px',
  },
  checkout: {
    marginLeft: '20px',
    marginRight: 'auto',
  },
  checkboxStyle: {
    width: '10px',
    height: '10px',
    color: 'pink',
    borderRadius: '5px',
  },
  textFieldinput: {
    boxShadow: '0px 0px 30px 0px #F960C833',
    // box-shadow: 0px 0px 30px 0px #F960C833;

  },
  subtext: {
    display:'none!important',
  },
  notchedOutline: {
    borderWidth: '1px',
    borderRadius: '10px',
    borderColor: '#D565C3!important'
  },
  checkbox: {
    marginLeft: '10px',
    marginBottom: '30px',
  },
  saleprice: {
    paddingLeft: '10px!important',
  },
}),
);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,

      },
    },
    root1: {
      '& > *': {
        margin: theme.spacing(2),
        width: 400,
        marginBottom: 10,
      },
    },
    textField: {
      backgroundColor: '#E9E9E9',
    },
    font_basic: {
      '& > *': {
        fontFamily: 'Cabin',
        fontStyle: 'normal',
        fontWeight: 'bold',
      },
    },
    saleprice: {
      paddingLeft: '10px',
    },
    font: {
      '& > *': {
        fontFamily: 'Cabin',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: '#797979',
        marginBottom: 30,
      },
    },
    buttonUp: {
      '& > *': {
        backgroundColor: 'linear-gradient(100.93deg, #D565C3 -13.26%, #ABD3EA 101.12%)',


      },
    },
  }),
);
export type User = { src: string; alt: string; type: UserType; name: string };
export interface viewtesyProps extends Omit<ImageProps, 'modifiers'> {
  modifiers?: Modifier | Modifier[];
  title: string;
  price?: number;
  status?:any;
  categories?:any;
  creator_address?:string;
  instant_sale_price?:any;
  quote_token?:any;
  bidPrice?: string | number;
  userList?: User[];
  amount?: number;
  collection?: string;
  description?:any;
  isPreview?: boolean;
  src:any;
  id?: string | number;
  mediaType?: 'gif' | 'png' | 'image' | VideoType;
  unit?: string;
  address?: string;
  totallike?: any;
  token_id?:any;
  userid?: string;
  token_owner?:any;
  unlock_once_purchased?:any;
  view?: number;
  creator?: string;
  creator_acc?: string;
  liked?:boolean;
  owner:string;
  owneraddress:string;
  ownerAvatar: string | any;
  active?:boolean;
  userName?: any;
}

export const Viewtesy: React.FC<viewtesyProps> = props => {
  // const id = new URLSearchParams(props.location?.search).get('id');
  const isMobile = useMediaQuery({
    query: '(max-width: 840px)'
  })
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isloading, setisLoading] = useState(true);
  const [isloadingbalance, setisLoadingBalance] = useState(true);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const ref = useRef(null)
  const [reg, regSet] = useState(Array);
  const [res, resSet] = useState<any>(Array);
  const [bal, balSet] = useState(Array);
  const account = useEthers();

  useEffect(() => {
    props.id ? dispatch(getProduct.started({ id: props.id, address: account.account })) : typeof window !== 'undefined' && navigate('/');
  }, [dispatch, props.userid]);

  const wallet = useWallet();
  const [modalOpenConnect, setModalOpenConnect] = useState(false);
  const { isApproved,pricePur,tokenid,idCheck, isSuccess, product, isGetDone,quote_token,unlock_once_purchased,active,tokenOwner,isCancel } = useSelector(getBuyStore);
  const balanceStore = useSelector(getBalanceStore);
  const bnbBalance = Number(wallet.balance);
  const balance = props
    ? typeof balanceStore[quote_token] === 'number'
      ? balanceStore[quote_token]
      : bnbBalance
    : 0;
  const productPrice = pricePur;
  const fee = (Number(productPrice) * Number(process.env.SERVICE_FEE)) / 100;
  const totalPrice = Number(productPrice);
  // const totalPrice = Number((Number(productPrice) + Number(fee)).toFixed(5));
  const likestatus = props?.liked;
  const [selectedTab, setSelectedTab] = useState<ViewTabType>('Info');
  const [like, setLike] = useState({ isLike:props.liked ?true: false, amount: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  
 console.log("props.liked",props.liked)
  const { t } = useTranslation();
  const [modalmobile, setmodalmobile] = useState(false);
  const [reportModal, setreportModal] = useState(false);
  const classes1 = useStyles();
  const [modalOpenShare, setModalOpenShare] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ModalOpenreport, setModalOpenreport] = useState(false);
  const [datas, dataSet] = useState<any>(Array)
  const [compare, compareSet] = useState<any>(Array)
  const textInput = useRef<HTMLInputElement>(null);
  const classes = useStyles1();
  const web3 = new Web3(window.ethereum);
  const [state, setState] = React.useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { first, second, third, fourth, fifth, sixth } = state;
  const error = [ first, second, third, fourth, fifth, sixth].filter((v) => v).length > 1;
  const middlewareMethods = useMemo(
   
    (): MiddlewareMethods => ({
      sending: () => setIsProcessing(true),
      // sending: () => setIsProcessing(false),
      transactionHash: () => setIsProcessing(true),
      receipt: () => setIsProcessing(false),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product?.quote_token]
  );
  const deletecomment = async (param: string, value: string) => {
    try{
     const deletecomment = await axios.delete (`${process.env.ADDRESS_API}/comment?id=${param}&account_id=${props.userid}`)
     setisLoading(!isloading);
    }
    catch{
      console.log('Cannot delete comment');
    }
  }
  const postcomment =async ()=> {
    
    if (props.id){
      try{
    const commentpost = await axios.post(`${process.env.ADDRESS_API}/comment?collectible_id=${props.id}&account_id=${wallet.account}&content=${value.name}`)
    
    textInput.current.value = "";
    setLoading(!loading);
      }
      catch{
        console.log('Error loaidng rejected data');
      }
    }
  }
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  const onKeyDown = (event) => {
      if( event.code == 'Enter'){
        postcomment()
      } else {
        console.log("failll")
      }
  }
  const getcomment =async ()=> {
    const query = window.location.href
    const result = query?.substring(query.indexOf("="));
    try {
    const commentget = await axios.get(`${process.env.ADDRESS_API}/comment/paging?collectible_id=${props.id}&address=${props.userid}`)
    const viewer =     await axios.post(`${process.env.ADDRESS_API}/view?collectible_id=${props.id}`)
    
    const data = commentget.data.comments
    dataSet(data)
    
    }catch {
      console.log("can not get comment")
    }
    
  }
  console.log("comment data",datas)
  const gethistory = async () => {
    try {
    const historyget = await axios.get (`${process.env.ADDRESS_API}/history?collectible_id=${props.id}`)
    const data = historyget.data.history
    data.sort((d1, d2) => new Date(d2.created_at).getTime() - new Date(d1.created_at).getTime());
    resSet(data)
    }
    catch{
      console.log('Cannot get history');
    }
  }
  const reportitem = async() => {
    const query = window.location.href
    const result = query?.substring(query.indexOf("="));
    if(state.first == true){
    const reportItem1 = await axios.post(`${process.env.ADDRESS_API}/report?collectible_id=${props.id}&account_id=${wallet.account}&report_type_id=1`)
    }else if (state.second == true){
      const reportItem2 = await axios.post(`${process.env.ADDRESS_API}/report?collectible_id=${props.id}&account_id=${wallet.account}&report_type_id=2`)
    }else if (state.third == true){
      const reportItem3 = await axios.post(`${process.env.ADDRESS_API}/report?collectible_id=${props.id}&account_id=${wallet.account}&report_type_id=3`)
    }else if (state.fourth == true){
      const reportItem4 = await axios.post(`${process.env.ADDRESS_API}/report?collectible_id=${props.id}&account_id=${wallet.account}&report_type_id=4`)
    }else if (state.fifth == true){
      const reportItem5 = await axios.post(`${process.env.ADDRESS_API}/report?collectible_id=${props.id}&account_id=${wallet.account}&report_type_id=5`)
    }else if (state.sixth == true){
      const reportItem6 = await axios.post(`${process.env.ADDRESS_API}/report?collectible_id=${props.id}&account_id=${wallet.account}&report_type_id=6`)
    }else {
      console.log("Error Report Item")
    }
    setModalOpenreport(false)
    setreportModal(true)
  }

  const numberLike = async () => {
    if (!like.isLike) {
      const liked = await axios.post(`${process.env.ADDRESS_API}/nft/like?collectible_id=${props.id}&account_id=${wallet.account}&action=1`)
      setLike({
        isLike: !like.isLike,
        amount: !like.isLike && typeof like.amount === 'number' && props?.liked===false ? 1 : 0,
      })
    } else {
      const unliked = await axios.post(`${process.env.ADDRESS_API}/nft/like?collectible_id=${props.id}&account_id=${wallet.account}&action=0`)
      setLike({
        isLike: !like.isLike,
        amount: like.isLike && typeof like.amount === 'number' && props?.liked ?  -1 : 0,
      })
    }
  }
  
  useEffect(() => {
    if (!modalOpenConnect) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpenConnect]);

  const [stateB, setStateB] = React.useState({
    checkedB: false,
  });
  const handleChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateB({ ...stateB, [event.target.name]: event.target.checked });
  };
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setMessageForm] = useState("");
  const refs = useRef(null);
  const [value, setValues] = React.useState({
    name:'',

  });
  const handleChangeForm = name => event => {
    // const cursor = refs.current.selectionStart;
    // const text =
    // message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor);
    // console.log("text",text)
    setValues({ ...value, [name]: event.target.value });

  };

  
  useEffect(() => { 
    getcomment()
    gethistory()
  }, [loading,isloading,dataSet]);

  useEffect(() => {    
    if (!modalOpenShare) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }
  }, [dispatch, modalOpenShare]);

  useEffect(() => {    
    if (!modalOpen) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }
  }, [dispatch, modalOpen]);

  const productLink = `/view?id=${props?.id}`;
  return (
    <div className="p-view">
      {/* <Layout title="View NFT"> */}
        <Section className="p-view_main">
        {isGetDone ? (
            props ? (
              <>
                <div className="p-view_control">
                  <div className="p-view_numberView">
                    <Icon iconName='eye' />
                    <span>&nbsp;&nbsp;{props.view}</span>
                  </div>
                </div>
                <article className="p-view_product">
                  <div className="p-view_item">
                    <div className="p-view_media">
                      {getMediaType(props.src) === 'image' ? (
                        <Image src={props.src} alt="" modifiers="big" />
                      ) : (
                        <Video  censored={props.status} colID={props.id} view={true} src={props.src} />
                      )}
                    </div>
                    <div className="p-view_information">
                      <div className="p-view_numberView">
                        {/* <Icon iconName='eye' />
                        <span>&nbsp;&nbsp;{props.view}</span> */}
                      </div>
                      {(wallet?.status == "disconnected" || wallet?.status == "error" ) ? (
                      <button
                      onClick={() => setModalOpenConnect(true)
                        }
                        className="o-productcard_likeitem">{props.totallike + like.amount}&nbsp;&nbsp;
                        <Icon iconName={like.isLike ? 'heartred' : 'heartoutline'} />
                      </button>):(
                        <button
                          onClick={() => numberLike()
                        }
                        className="o-productcard_likeitem">{props.totallike + like.amount}&nbsp;&nbsp;
                        <Icon iconName={like.isLike ? 'heartred' : 'heartoutline'} />
                      </button>
                      )}
            
                     
                      <Button handleClick={() => setModalOpenShare(true)} modifiers={['iconshareitem']}><Icon modifiers={['tiny']} iconName='sharelink' /></Button>
                      <div className="p-view_sharemobile">
                    <button onClick={() => setModalOpenreport(true)} className="p-view_threedots" ><Icon modifiers={['large']} iconName="threedots" /></button>
                    </div>
                     
                    </div>
                    <div className="p-view_share">
                    <Button modifiers="reportExplore" handleClick={() => setModalOpenreport(true)}  >! {t("Myitem.Report")}</Button>
                    </div>
                  </div>
                  <div className="p-view_info">
                    <div className="p-view_detailheading">
                      <Heading type="h1" title={props.title}>
                        {props.title}
                      </Heading>
                      {/* <div className="p-view_price">
                        <Text size="18" modifiers="linear" inline unit={props.quote_token}>
                          {props.instant_sale_price}
                        </Text>
                        {(props.quote_token === 'CONT') && (
                          <Text size="18" modifiers={['linear']} inline>
                          （～${amountDollarCONT(Number(props.instant_sale_price))}）
                          </Text>)
                        }
                        { (props.quote_token === 'BNB') && (
                          <Text size="18" modifiers={['linear']} inline>
                          （～${amountDollarBNB(Number(props.instant_sale_price))}）
                          </Text>)
                        }
                         { (props.quote_token === 'BUSD') && (
                          <Text size="18" modifiers={['linear']} inline>
                          （～${amountDollarBUSD(Number(props.instant_sale_price))}）
                          </Text>)
                        }
                      </div> */}
                    </div>
                    <div className="p-view_detail">
                      <div className="p-view_lead">
                        <Text modifiers="gray">{props.description}</Text>
                      </div>
                      <div className="p-view_tags">
                        {props.categories.map((cate) => (
                          <Tag key={cate.id}>{cate.name.charAt(0).toUpperCase() + cate.name.slice(1)}</Tag>
                        ))}
                      </div>
                      <div className="p-view_tabs">
                        <TabList>
                          {ViewTabs.map(tab => (
                            <TabButton key={tab} active={selectedTab === tab} handleClick={() => setSelectedTab(tab)}>
                              {t(`View.${tab}`)}
                            </TabButton>
                          ))}
                        </TabList>
                        </div>
                        <div className="p-view_tabstest">
                        <div className="p-view_tabcontent">
                          <div className="p-view_wrapper">
                            <ul>
                            <Typography align="center" >
                            <>
                            {(selectedTab=="Info") && (
                              <div>
                                <li className="p-view_tabitem">                  
                            <div className="m-viewtabitem">
                              <div className="m-viewtabitem_tabss">
                                <UserAvatar userAddress={props.creator_address} src={props.creator_acc} alt="" hasTick={false} modifiers="mid" />
                                <div className="m-viewtabitem_info">
                                  <Text size="14" modifiers={['bold', 'gray','left']}>{t("View.Creator")} </Text>
                                  <Text size="14" modifiers={['comment','left']}>By
                                  { props.userName? (
                                    <Text inline size="14" modifiers="bold">
                                      <Link href={"/userpage?id="+props.creator_address}>
                                        &nbsp;&nbsp;{props.userName}
                                      </Link>
                                    </Text>
                                    ):(
                                     
                                    <Text inline size="14" modifiers="bold">
                                      <Link href={"/userpage?id="+props.creator_address}>
                                      &nbsp;&nbsp;{props.creator_address}
                                      </Link>
                                    </Text>
                                  )}
                                  </Text>
                                </div>
                              </div>
                            </div>
                                            </li>

                            {props.owner!=null && (<li className="p-view_tabitem">                  
                            <div className="m-viewtabitem">
                              <div className="m-viewtabitem_tabss">
                              <UserAvatar userAddress={props.owner.address} src={props.owner.avatar.String} alt="" hasTick={false} modifiers="mid" />
                              <div className="m-viewtabitem_info">
                              <Text size="14" modifiers={['bold', 'gray','left']}>{t("View.Owner")} </Text>
                            <Text size="14" modifiers={['comment','left']}>By
                            { props.owner.username.String? (
                              <Text inline size="14" modifiers="bold">
                                <Link href={"/userpage?id="+props.owner.address}>
                                  &nbsp;&nbsp;{props.owner.username.String}
                                </Link>
                              </Text>
                            ): (
                            <Text inline size="14" modifiers="bold">
                              <Link href={"/userpage?id="+props.owner.address}>
                            &nbsp;&nbsp;{props.owner.address}
                              </Link>
                            </Text>
                            )}
                            </Text>
                              </div>
                                            </div>
                                            </div>
                                            </li>)}
                            </div>
                                                    )}
                      </>
                      </Typography>
                      <Typography align="center" >
                            <>
                        {(selectedTab=="Comment") && (
                          <div >
                        <div className="p-view_postcontent">
                       <form  noValidate autoComplete="on">
                       {/* <Picker onEmojiClick={handleChangeForm("name")} /> */}
                          <TextField 
                          ref={refs}
                          className={classes.textFieldinput}
                          inputProps={{
                            min: 0, style: { textAlign: 'left',paddingTop: '15px', paddingBottom: '15px',width:'245px' }}}
                          InputProps={{
                            classes: {
                              notchedOutline: classes.notchedOutline,
                            },
                          }}
                          onKeyPress={onKeyDown}
                          inputRef={textInput}
                          onChange={handleChangeForm("name")} 
                          fullWidth
                          placeholder={t("View.Comments")}
                          id="fullWidth"
                          variant="outlined"
                          >  
                          </TextField>
                          <TextField 
                          className={classes.subtext}
                          >  
                          </TextField>
                           {(wallet?.status == "disconnected" || wallet?.status == "error" ) ? (
                          <Button modifiers="postcomment" handleClick={() => setModalOpenConnect(true)}> {t("View.Post")}</Button>
                           ):(
                            <Button modifiers="postcomment" handleClick={() => postcomment()}> {t("View.Post")}</Button>
                           )}
                          </form>
                          </div>
                        <div className="postcomment-button">
                          {isMobile && (
                          <Button  handleClick={() => setmodalmobile(true)}> {t("View.Post")}</Button>
                          // <Button modifiers={['postcomment']}  handleClick={() => setmodalmobile(true)}> Post</Button>
                          )}
                        </div>
                        {datas.map((i,idx) => (      
                          <li className="p-view_tabitem">
                            <div className="m-viewtabitem">
                              <div className="m-viewtabitem_tabss">
                              <UserAvatar key={i} src={i.account.avatar.String} alt="" hasTick={false} modifiers="mid" userAddress={i.account.address}/>
                                <div className="m-viewtabitem_info">
                                  <Link key={i.account.address}  modifiers={['font']} href={"/userpage?id="+i.account.address}>
                                  <Text  size="14" modifiers={['bold', 'gray','left']}>{i.account.username.String} </Text>
                                  </Link>
                                  <Text key={datas[idx].content} size="14" modifiers={['comment','left']}>{datas[idx].content}</Text>
                                </div>
                              </div>
                              <div>
                                <div ref={ref}>
                              {i.account.address == wallet.account && (
                              <button onClick ={()=>deletecomment(i.id,idx)}><Icon modifiers={['medium']} iconName="redelete" /></button>
                                    )}
                              </div>
                              </div>
                            </div>
                          </li>
                        ))}
                        </div>
                        )}
                  </>
                      </Typography>
              <Typography align="center" >
                            <>
              {(selectedTab=="History") && (
                <div >
                  {res.filter((e, i) => i !== res.length -1).map((items,ix) =>(
                  <li className="p-view_tabitem">
                   
                    <div className="m-viewtabitem-history">
                      <div className="m-viewtabitem_tabss">
                        <UserAvatar userAddress={items.account?.address} src={items.account?.avatar.String} alt="" hasTick={false} modifiers="mid" />
                        <div className= { classNames('m-viewtabitem_info', { active: ix === 0 }) }>
                          { items.Type == "0"? (
                            <Text size="14" modifiers={['bold', 'comment','left']}>
                            {t("View.Putonsale")}
                              <Tooltip key={items.account?.address} title={items.account?.address} placement="top">
                                <button>
                               
                                  <Text key={items.account} inline size="14" modifiers={['bold', 'gray','left']}>
                                    <a target="_blank" href={"https://bscscan.com/address/"+items.account.address}>&nbsp;{items.account?.address.replace(items.account?.address.substring(5, 40), "...")}</a>
                                  </Text>
                                  
                                </button>
                              </Tooltip>
                            </Text>
                          ) : (
                          <Text size="14" modifiers={['bold', 'comment','left']}>
                           Purchased by
                           <Tooltip key={items.account?.address} title={items.account?.address} placement="top">
                              <button>
                                <Text key={items.account} inline size="14" modifiers={['bold', 'gray','left']}>
                                  <a target="_blank" href={"https://bscscan.com/address/"+items.account.address}>
                                    &nbsp;{items.account?.address.replace(items.account?.address.substring(5, 40), "...")}
                                  </a>
                                </Text>
                              </button>
                            </Tooltip>
                          </Text>
                          )
                          }
                          <Text key={items.created_at} size="14" modifiers={['left','comment']}> {moment(items.created_at).fromNow()}
                          </Text>
                        </div>
                      </div>
                      <div>
                        <Text key={items.price} size="17" modifiers={['left','bold',]}>{Number(items.price).toFixed(3)}&nbsp;{items.quote_token.name}</Text>
                      </div>
                    </div>
                  </li>
                  ))}
                   {res.filter((e, i) => i === res.length -1).map((items,ix) =>(
                  <li className="p-view_tabitem">
                    <div className="m-viewtabitem-history">
                      <div className="m-viewtabitem_tabss">
                        <UserAvatar userAddress={items.account?.address} src={items.account?.avatar.String} alt="" hasTick={false} modifiers="mid" />
                        <div className= { classNames('m-viewtabitem_info', { active: ix === 0 }) }>
                        {/* <div className="m-viewtabitem_info"> */}
                       
                         
                            <Text size="14" modifiers={['bold', 'comment','left']}>
                            Mint and put on sale by 
                              <Tooltip key={items.account?.address} title={items.account?.address} placement="top">
                                <button>
                                  <Text key={items.account} inline size="14" modifiers={['bold', 'gray','left']}
                                  >
                                    <a target="_blank" href={"https://bscscan.com/address/"+items.account.address}>
                                    &nbsp;{items.account?.address.replace(items.account?.address.substring(5, 40), "...")}
                                    </a>
                                  </Text>
                                </button>
                              </Tooltip>
                            </Text>
                  <Text key={items.created_at} size="14" modifiers={['left','comment']}> {moment(items.created_at).fromNow()}</Text>
                        </div>
                      </div>
                      <div>
                        <Text key={items.price} size="17" modifiers={['left','bold',]}>{Number(items.price).toFixed(3)}&nbsp;{items.quote_token.name}</Text>
                      </div>
                    </div>
                  </li>
                  ))}
                </div>
              )}
                </>
              </Typography>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-view_buydialog">
                      <Grid
                        container
                        spacing={1}
                      >
                         <Grid item xs={6}>
                            <div className="p-view_buyfee">
                              <Grid
                              container
                              spacing={1}
                              justify="flex-start"
                              alignItems="center"
                              >
                                <Grid className={classes.saleprice} item xs={7}>
                                  <Text modifiers="saleprice">
                                  {props.instant_sale_price}{props.quote_token}
                                  </Text>
                                </Grid>
                               
                                <Grid item xs={5}>
                                {(props.quote_token === 'CONT') && (
                                  <Text modifiers={['servicefee']}>
                                  （～${amountDollarCONT(Number(props.instant_sale_price))}）
                                  </Text>)
                                }
                                { (props.quote_token === 'BNB') && (
                                  <Text modifiers={['servicefee']}>
                                  （～${amountDollarBNB(Number(props.instant_sale_price))}）
                                  </Text>)
                                }
                                { (props.quote_token === 'BUSD') && (
                                  <Text modifiers={['servicefee']}>
                                  （～${amountDollarBUSD(Number(props.instant_sale_price))}）
                                  </Text>)
                                }
                                </Grid>
                                <Grid item xs={7}>
                                  <Text modifiers={['servicefee','marginleft']}>&nbsp;+&nbsp;&nbsp;&nbsp;{t("create.Servicefee")} {process.env.SERVICE_FEE}%</Text>
                                
                                </Grid>
                                </Grid>
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                        <ButtonContainer>
                          <Button
                            modifiers="buycolor"
                            handleClick={() => {
                                dispatch(modalpurchase.started({
                                  price:props.instant_sale_price,
                                  tokenid:props.token_id,
                                  tokenOwner:props.token_owner,
                                  quote_token: props.quote_token,
                                  unlockOncePurchased : props.unlock_once_purchased,
                                  active: props.active,
                                  id: props.id
                                }));
                                // dispatch(commonStart({ nextAction: openModal() }));
                            }}
                            disabled={!props.token_id || isSuccess || props.unlock_once_purchased == true}
                          >          
                          {(isSuccess && props.id == idCheck ) ? 'Sold out' : `${t("View.Buynow")}`}
                          </Button>
                        </ButtonContainer>
                      </Grid>           
                      </Grid>           
                          {/* <Grid
                            container
                            spacing={1}
                          >
                          <Grid item xs={9}>
                            <div className="p-view_buyfee">
                              <Grid
                              container
                              spacing={1}
                              justify="flex-start"
                              alignItems="center"
                              >
                                <Grid className={classes.saleprice} item xs={4}>
                                  <Text modifiers="saleprice">
                                  {props.instant_sale_price}{props.quote_token}
                                  </Text>
                                </Grid>
                                <Grid item xs={5}>
                                  <Text modifiers="servicefee">+ Service fee {process.env.SERVICE_FEE}%</Text>
                                
                                </Grid>
                                <Grid item xs={3}>
                                {(props.quote_token === 'CONT') && (
                                  <Text modifiers={['servicefee']}>
                                  （～${amountDollarCONT(Number(props.instant_sale_price))}）
                                  </Text>)
                                }
                                { (props.quote_token === 'BNB') && (
                                  <Text modifiers={['servicefee']}>
                                  （～${amountDollarBNB(Number(props.instant_sale_price))}）
                                  </Text>)
                                }
                                { (props.quote_token === 'BUSD') && (
                                  <Text modifiers={['servicefee']}>
                                  （～${amountDollarBUSD(Number(props.instant_sale_price))}）
                                  </Text>)
                                }
                                </Grid>
                                </Grid>
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            {(isSuccess && props.id == idCheck ) ? 'Sold out' : 'Buy now'}
                          </Grid>
                          </Grid> */}
                       
                      {/* <span className="p-view_receipt">
                        <Text inline modifiers={['bold', 'footer']} size="14">
                          Service fee
                          <Text inline modifiers={['bold', 'footer']} size="14">
                            {process.env.SERVICE_FEE}%
                          </Text>
                        </Text>
                        <Text inline modifiers={['bold', 'footer']} size="14" unit={props.quote_token}>
                          {props.instant_sale_price}
                        </Text>
                        <Text inline modifiers={['bold', 'footer']} size="14">
                          （～${Number(amountDollarWithServiceFee(Number(props.instant_sale_price)))}）
                        </Text>
                      </span> */}
                    </div>
                  </div>
                </article>
                <Modal isOpen={ModalOpenreport} handleClose={() => setModalOpenreport(false)}>
                  <ModalHeader mod title={t("reportpopup.Title")} handleClose={() => setModalOpenreport(false)} />
                    <FormControl error={error} component="fieldset" className={classes.formControl}>
                      <FormGroup>
                        <FormControlLabel 
                          className={classes.font}
                          control={<Checkbox checked={first} onChange={handleChange} name="first" />}
                          label={<Typography className={classes.formControlLabel}>{t("reportpopup.Copyright")}</Typography>}
                        />
                        <FormControlLabel
                          control={<Checkbox checked={second} onChange={handleChange} name="second" />}
                          label={<Typography className={classes.formControlLabel}>{t("reportpopup.Sexual")}</Typography>}
                        />
                        <FormControlLabel
                          control={<Checkbox checked={third} onChange={handleChange} name="third" />}
                          label={<Typography className={classes.formControlLabel}>{t("reportpopup.Violent")}</Typography>}
                        />
                          <FormControlLabel
                          control={<Checkbox checked={fourth} onChange={handleChange} name="fourth" />}
                          label={<Typography className={classes.formControlLabel}>{t("reportpopup.Hateful")}</Typography>}
                        />
                          <FormControlLabel
                          control={<Checkbox checked={fifth} onChange={handleChange} name="fifth" />}
                          label={<Typography className={classes.formControlLabel}>{t("reportpopup.Harmful")}</Typography>}
                        />
                          <FormControlLabel
                          control={<Checkbox checked={sixth} onChange={handleChange} name="sixth" />}
                          label={<Typography className={classes.formControlLabel}>{t("reportpopup.Spam")}</Typography>}
                        />
                      </FormGroup>
                      {error &&( <FormLabel component="legend">Pick one *</FormLabel>
                    )}
                    </FormControl>
    {/* </div> */}
                    <div className="buttoncontainer_report">
                      <Button disabled={error} handleClick={() => reportitem()} type="submit" modifiers="createbig">
                      {t("Myitem.Report")}
                      </Button>
                    </div>
                </Modal>
                  <Modal isOpen={modalOpenShare} handleClose={() => setModalOpenShare(false)}>
                  <ModalHeader title={t("sharepopup.share")} handleClose={() => setModalOpenShare(false)} />
                  <Modalshare link={productLink} />
                </Modal>
                <Modal modifiers="error" isOpen={modalOpenConnect} handleClose={() => setModalOpenConnect(false)}>
          <Text modifiers={['bold', 'center']}>You need to connect to your wallet to do this</Text>
          <ButtonContainer>
            <Button modifiers="bid" handleClick={() => setModalOpenConnect(false)}>
              Cancel
          </Button>
            <Button modifiers="buy" handleClick={() => { connectWallet(wallet); setModalOpenConnect(false) }}>
              Connect wallet
          </Button>
          </ButtonContainer>
        </Modal>
            { props.id == idCheck ? (
                <Modal checkout={active} isOpen={active} handleClose={handleCloseModal} modifiers="overflowy">
                  {isSuccess  ? (
                    <Toast handleClose={handleCloseModal}>Success purchase!</Toast>
                  ) :  (
                    
                    <>
                    
                      <ModalHeader handleClose={handleCloseModal} title="CHECKOUT" />
                      <div className="p-view_modalbody">
                        <div className="p-view_balance">
                          <div className="p-view_accountinfo">
                            <Text size="18" modifiers="balance">
                            <Icon iconName="dollar" />Your balance :
                            </Text>
                            {/* <div className="p-view_availablepoint"> */}
                              <Text modifiers="bold" unit={quote_token}>
                              {formatBalance(quote_token as CardType, balance)}
                              </Text>
                            {/* </div> */}
                          </div>
                        </div>
                        <div className="p-view_modaldescription">
                          <Text modifiers="checkoutDes">
                            You are about to purchare{' '}
                            from:{' '}
                            <Text inline modifiers="bold">
                            &nbsp;&nbsp;{tokenOwner?.replace(tokenOwner?.substring(9, 37), "...")}
                            </Text>
                          </Text>
                        </div>
                        <div className="p-view_checkoutContent">
                          <Grid
                            className={classes.checkout}
                            container
                            spacing={1}
                            alignItems="center"
                            justify="center"
                          >
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="checkout">
                                Product:
                              </Text>
                            </Grid>
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="checkout">
                                {productPrice}
                              </Text>
                            </Grid>
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="checkout">
                                {quote_token}
                              </Text>
                            </Grid>
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="checkout">
                                Fee:
                              </Text>
                            </Grid>
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="checkout">
                            { Number(productPrice) > 50 ? (Number(totalPrice - productPrice ).toFixed(1)) : (
                             Number(totalPrice - productPrice ).toFixed(4)
                            )
                            }
                              </Text>
                            </Grid>
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="checkout">
                                {quote_token}
                              </Text>
                            </Grid>
                          </Grid>
                          <Grid spacing={2}item xs={12} >
                            <div >  <Divider style={{marginTop:'10px', marginBottom:'10px' }}/></div>
                          </Grid>
                          <Grid
                          className={classes.checkout}
                            container
                            spacing={1}
                            alignItems="center"
                            justify="center"
                          >
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="bold">
                                Total:
                              </Text>
                            </Grid>
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="bold">
                              {totalPrice}
                              </Text>
                            </Grid>
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="bold">
                                {quote_token}
                              </Text>
                            </Grid>
                          </Grid>
                        </div>
                        <div className="p-view_checkoutGasFee">
                          <Grid
                            className={classes.checkout}
                            container
                            spacing={1}
                            alignItems="center"
                            justify="center"
                          >
                            {/* <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="checkout">
                                Gas fee:
                              </Text>
                            </Grid>
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="checkout">
                                0.005
                              </Text>
                            </Grid>
                            <Grid className="checkoutContent" item xs={4} >
                              <Text inline modifiers="checkout">
                                BNB
                              </Text>
                            </Grid> */}
                          </Grid>
                        </div>
                        
                        <FormControlLabel
                        className={classes.checkbox}
                        control={
                          <Checkbox
                            className={classes.checkboxStyle}
                            checked={stateB.checkedB}
                            onChange={handleChangeConfirm}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={<Text inline modifiers="confirm">I have read understand and agree to the terms of service and privacy policy of conteNFT</Text>}
                        labelPlacement="end"
                      />
                        {product && totalPrice > balance && (
                          <span className="p-view_errormessage">You don't have enough money to buy it.</span>
                        )}
                        <ButtonContainer>
                          <Button modifiers="cancelpayment" handleClick={handleCloseModal}>
                            Cancel
                          </Button>
                          <Button
                            modifiers="payment"
                            disabled={product && totalPrice > balance || !stateB.checkedB}
                            handleClick={() => {
                              quote_token === 'BUSD'
                              ? dispatch(
                                  commonStart({
                                    nextAction: approveBUSD.started({
                                      price: pricePur,
                                      idNFT: tokenid,
                                      bnbPrice: undefined,
                                      middlewareMethods: middlewareMethods,
                                    }),
                                  })
                                )
                              : quote_token === 'CONT'
                              ? 
                              dispatch(
                                  commonStart({
                                    nextAction: approveCONT.started({
                                      price: pricePur,
                                      bnbPrice: undefined,
                                      idNFT: tokenid,
                                      middlewareMethods: middlewareMethods,
                                    }),
                                  })
                                )
                              :
                              dispatch(
                                commonStart({
                                  nextAction: purchase.started({
                                    idNFT: tokenid,
                                    bnbPrice: props.quote_token === 'BNB' ? pricePur : undefined,
                                    middlewareMethods: middlewareMethods,
                                  }),
                                })
                              );
                            }}
                          >
                            Payment
                          </Button>
                        </ButtonContainer>
                      </div>
                    </>
                  )}
                </Modal>
                
            ) : (
              <> </>
            )
          }
              </>
            ) : (
              <>
                <Text modifiers="center" size="24">
                  Product not found!
                </Text>
                <ButtonContainer>
                  <Button anchor={{ href: '/' }}>Back to explore</Button>
                </ButtonContainer>
              </>
            )
          ) : (
            <Spinner />
          )}
        </Section>
      {/* </Layout> */}
      {(isProcessing  && isCancel == false) &&  <Spinner modifiers="screen" label="Processing" />}
      <Modal modifiers="error" isOpen={modalmobile} handleClose={() => setmodalmobile(false)}>
        <ModalHeader title="Sorry for this inconvenience :(" handleClose={() => setmodalmobile(false)} />
        <Text modifiers={['bold', 'center']}>Currently, the mobile platform does not support connecting with Binance Smart wallet function. Please visit the desktop version on PC for a better experience.</Text>
        <ButtonContainer>
          <Button modifiers="buy" handleClick={() => { setmodalmobile(false) }}>
            OK
          </Button>
        </ButtonContainer>
      </Modal>
      <Modal modifiers="price" isOpen={reportModal} handleClose={() => setreportModal(false)}>
        <ModalHeader modifiers="report" title="Thank you for submitting your report to us." handleClose={() => setreportModal(false)} />
        <Text modifiers={['report']}>We will process the report you submitted as quickly as possible.</Text>
        <Text modifiers={['report','inline']}>Processing time for reports of piracy will typically be 5-7 business days. For more convenience in the settlement process, please send related documents to email:</Text>
        <Text modifiers={['report','inline']}><a href="mailto:support@contenft.com">support@contenft.com</a></Text>
        <Text modifiers={['report']}>We will process the report you submitted as quickly as possible.</Text>
        <Text modifiers={['report','inline']}>Contact us:</Text>
        <Text modifiers={['report','inline']}><a href="mailto:support@contenft.com">support@contenft.com</a></Text>
      </Modal>
    </div>
  );
};
export default hot(Viewtesy);
