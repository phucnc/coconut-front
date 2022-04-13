import { RouteComponentProps } from '@reach/router';
import { Button } from 'components/atoms/button';
import { CheckInputFormik } from 'components/atoms/checkInput';
import { Text } from 'components/atoms/text';
import { navigate } from 'gatsby-link';
import { Dropdown } from 'components/molecules/dropdown';
import { TextFieldFormik } from 'components/atoms/textfield';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import Banner2 from 'assets/images/Banner2.svg';
import { useTranslation } from "react-i18next";
import Banner3 from 'assets/images/Banner3.svg';
import avatar from 'assets/images/avatar-girl.png';
import { useWallet } from 'use-wallet';
import { Icon } from 'components/atoms/icon';
import { Modal } from 'components/organisms/modal';
import { Carouselt } from 'components/organisms/carouselt';
import { Textfieldsearch } from 'components/organisms/Textfieldsearch';
import { ModalHeader } from 'components/molecules/modalHeader';
import { Modalclaim } from 'components/organisms/modalclaim';
import { approveBUSD, approveCONT, closeModal, getBuyStore, getProduct, openModal, purchase, modalpurchase } from 'store/buyNFT';
import { Link } from 'gatsby';
import { Barmenu } from 'components/organisms/Barmenu';
import { DropdownItem, DropDownItemGroup, DropdownMenu } from 'components/molecules/dropdownMenu';
import { Container } from "@material-ui/core";
import { Heading } from 'components/molecules/heading';
import { TabButton } from 'components/molecules/tabButton';
import { TabList } from 'components/molecules/tabList';
import { ExploreMenu } from 'components/organisms/exploreMenu';
import { ItemList } from 'components/organisms/itemList';
import { Section } from 'components/organisms/section';
import { Unit } from 'components/pages/create/form';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Field } from 'formik';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
import { Sectionsub } from 'components/organisms/sectionsub';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { CardTypeNum, formatBalance } from 'util/formatBalance';
import { useEthers, useEtherBalance } from "@usedapp/core";
import { useMediaQuery } from 'react-responsive'
import {
  ExploreSchema,
  exploreSchema,
  ExtraProductCategories,
  ProductCategories,
  Sort,
  SortDefaultValue,
} from 'components/pages/explore/form';
import { resetStore } from 'store/createNFT';
import { Layout } from 'components/templates/layout';
import { users } from 'dummy/dummy';
import { Form, Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { useDispatch, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import { getExploreStore, getProductList, GetProductListReq, getTotalVolume } from 'store/explore';
import { withStyles } from '@material-ui/core/styles';
import { getMediaType } from 'util/getMediaType';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from 'store';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ScrollToTop from 'react-scroll-up'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  ListItemText: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "25px",
    paddingTop: "25px",
    backgroundColor: "transparent !important",
  },
  tabc: {
    marginTop: '2px',
    marginLeft: '10px'
  },
  list: {
    width: 250,
    textAlign: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: "50px",
  },
  fullList: {
    width: 'auto',
    height: '100%',
  },
  AccordionSummary: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: "0px",
    },
  },
  media: {
    height: 140,
    objectFit: 'cover'
  },
  card: {
    maxWidth: 345
  },
  Divider: {
    marginBottom: 40,
  },
  test: {
    position: 'relative',
    padding: 0,
    left: '2px'
    // marginLeft:'4px'
  },
  sticky: {
    position: "sticky",
    top: "100px!important",
  },
  paper: {
    padding: "16px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: "transparent !important",
    [theme.breakpoints.down('sm')]: {
      padding: "0px",
    },
  },
  details: {
    alignItems: 'top',
    // position:'absolute',
  },
  content: {
    '&$expanded': {
      margin: '12px 0',

    },
  },
  MuiAccordionroot: {
    // backgroundColor: "#F4F4F4",
    backgroundColor: "transparent !important",
    "&.MuiAccordion-root:before": {

    },
    "&$expanded": {
      backgroundColor: "rgba(97, 97, 97, 0.2)",
    },
    "&:hover": {
      backgroundColor: "transparent !important"
    }



  },


}));
const AccordionSummary = withStyles({

  content: {
    '&$expanded': {
      margin: '12px 0',
      flexDirection: 'column!important',
    },
  },
  expanded: {},
})(MuiAccordionSummary);
type Anchor = 'top' | 'left' | 'bottom' | 'right';
export const Home: React.FC<RouteComponentProps> = props => {
  console.log("propssindex", props)
  let listTotalVol = useRef(new Array());
  const ref = useRef(null);
  const params = new URLSearchParams(props.location?.search);
  const [modalOpenClaim, setModalOpenClaim] = useState(false);
  const [showExtraCategories, setShowExtraCategories] = useState(false);
  const [showFilterAndSort, setShowFilterAndSort] = useState(false);
  const [showmore, setshowmore] = useState(false);
  const { t } = useTranslation();
  const store = useSelector(getExploreStore);
  const { addressID, addressIDcheck } = useSelector(getExploreStore);
  const { isApproved, pricePur, tokenid, isSuccess, product, isGetDone, quote_token, unlock_once_purchased, active } = useSelector(getBuyStore);
  const classes = useStyles();
  const isMobile = useMediaQuery({
    query: '(max-width: 840px)'
  })
  const dispatch = useDispatch();
  const { activateBrowserWallet, account } = useEthers();
  const accountt = useEthers();
  const etherBalance = useEtherBalance(account)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const initialValue: ExploreSchema = useMemo(
    () => ({
      unit: Unit[0],
      productCategory: params.get('category') || 'All',
      productSort: params.get('sort') || SortDefaultValue,
      verify: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getProducts = (req: GetProductListReq) => {
    dispatch(
      getProductList.started({
        limit: req.limit,
        mode: req.mode,
        filterAndSort: params.get('sort'),
        category: params.get('category'),
        cursor: req.cursor,
        address: req.address,
      })
    );
  };
  const add = () => {
    const params = {
      chainId: '0x61', // Testnet A 0x-prefixed hexadecimal string
      // chainId: '0x38', // A 0x-prefixed hexadecimal string
      chainName: 'BSC Mainnet 1',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org'],
      blockExplorerUrls: ['https://bscscan.com'],
    }
    window.web3.eth.getAccounts((error, accounts) => {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [params, accounts[0]],
      })
        .then((result) => {
          console.log("Pass", result)
        })
        .catch((error) => {
          console.log(error)
        });
    })

  }
  const [data1, dataSet] = useState<any>(Array)
  const [totalmint, totalmintSet] = useState<any>(Array)
  const [totalvolume, totalvolumeSet] = useState<any>(Array)
  const [reg, regSet] = useState(Array);
  const [res, resSet] = useState<any>(Array);
  const [totalmint24h, totalmint24hSet] = useState<any>(Array)
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [getadress, setgetadress] = useState<any>(Array)
  if (wallet.status === 'connected') {
    // axios.post(`https://api.contenft.com/account?address=${wallet.account}`)
    // console.log("PASS")
  } else {
    // console.log("FAILL",wallet)
  }

  const GetTrend = async () => {
    const update = await axios.get(`${process.env.ADDRESS_API}/trend`);
    const GetTrend1 = update.data.trend;
    const sorted = GetTrend1.sort((a, b) => {
      return a.order - b.order;
    });
    regSet(sorted);
  }

  const [render, setRender] = useState(false)
  const getWalletAddress = async () => {
    if (wallet.status === 'connected') {
      const wallet = useWallet();
      setgetadress(wallet)
    } else {
      console.log("FAILL", wallet.status)
    }

    setIsLoading(false)
  }
  useEffect(() => {
    if (!modalOpenClaim) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpenClaim]);

  useEffect(() => {
    // setRender(true)

  }, []);

  const totalmint_volume = async () => {
    try {
      const total_mint = await axios.get(`${process.env.ADDRESS_API}/nft/total-mint?duration=`)
      const total_mint24h = await axios.get(`${process.env.ADDRESS_API}/nft/total-mint?duration=168h`)
      const rate_BNBBUSD = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDT`)
      const BNB_total = await axios.get(`${process.env.ADDRESS_API}/exchange/total-sold?duration=168h&quote_token=0`)
      const BUSD_total = await axios.get(`${process.env.ADDRESS_API}/exchange/total-sold?duration=168h&quote_token=1`)
      const CONT_total = await axios.get(`${process.env.ADDRESS_API}/exchange/total-sold?duration=168h&quote_token=2`)
      const data_mint = total_mint.data.total
      const data_mint24h = total_mint24h.data.total


      const total_volume_sold = Number((
        ((BNB_total.data.total_sold / Math.pow(10, 18)) * rate_BNBBUSD.data.price) +
        ((BUSD_total.data.total_sold / Math.pow(10, 18)) +
          ((CONT_total.data.total_sold / Math.pow(10, 18)) * 0.06)) / 1).toFixed(4));
      console.log("BNB", BNB_total.data.total_sold / Math.pow(10, 18))
      totalmintSet(data_mint)
      totalmint24hSet(data_mint24h)
      totalvolumeSet(total_volume_sold)
    }
    catch {
      console.log("fail total volume")
    }
  }

  const Get_categories = async () => {
    const categories = await axios.get(`${process.env.ADDRESS_API}/category`);
    // const data = total_mint.data.accounts[0];
    const listreg = categories.data.category;
    regSet(categories.data.category);
  };
  useEffect(() => {
    // getWalletAddress()
    // wallet.connect('injected')
    Get_categories()
    if (wallet?.status === 'connected') {
      totalmint_volume();
      dispatch(getTotalVolume.started({ unit: 0 }));
      getProducts({
        limit: 12,
        mode: 'refresh',
        address: wallet.account,
      });
      setIsLoading(true)
    } else {
      totalmint_volume();
      dispatch(getTotalVolume.started({ unit: 0 }));
      getProducts({
        limit: 12,
        mode: 'refresh',
        address: wallet.account,
      });
    }
  }, [wallet.status, isLoading]);
  const [counter, setCounter] = useState(0);

  const handleFilter = useCallback((param: string, value: string) => {
    params.get(param) ? params.set(param, value) : params.append(param, value);
    const newPath = `${props.path}?${params.toString()}`;
    console.log("first params", params)
    console.log("first value", value)
    window.history.pushState({ path: newPath }, '', newPath);
    getProducts({
      limit: 12,
      mode: 'refresh',
      address: wallet.account,
    });
    resSet(value)
    setIsLoading1(true)
  }, [isLoading1]);

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Heading type="h1">Category</Heading>
      <div onClick={toggleDrawer(anchor, false)}>
        <div className="subcategoryMobile">
          {ExtraProductCategories.map(cate => (
            <button className="p-explore_button-more" onClick={() => handleFilter('category', cate)}>{cate}</button>
          ))}
        </div>
      </div>

      {/* <div onClick={toggleDrawer(anchor, false)} className="o-header_connect-mobile">
        <Button handleClick={() => setmodalmobile(true)} modifiers="connectmobile"> Connect Wallet </Button>
      </div> */}
    </div>
  )
  console.log("store", store)
  console.log("addressIDcheck", addressIDcheck)
  console.log("addressIDd", addressID)
  console.log("wallet account", wallet.account)
  return (
    <div className="p-explore">
      <Layout main title="Best NFT Video market">
        <ScrollToTop style={{ right: "20px", zIndex: "1000" }} easing="linear" showUnder={160}>
          {/* <Icon modifiers="large32" iconName="backtotop"/> */}
          <span><big><big>&uarr;</big></big></span>
        </ScrollToTop>

        <Container className={classes.test}>
          <Grid
            className={classes.test}
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="stretch"
          >
            <Grid className="p-explore_totalvolumeMain" item xs={9}>
              {isMobile ? (
                // <Sectionsub className="p-explore_totalvolume">
                //   <Grid className="p-explore_heading-subsec" container >
                //     <Grid className="p-explore_heading-sub" item xs={12}>
                //       <Heading modifiers={['center']}>{t("mainMenu.TotalmintNFT")} &nbsp;<Heading modifiers={['center', 'pink']}>NFT</Heading></Heading>
                //     </Grid>
                //     <Grid item xs={12}>
                //       <Paper elevation={0} className={classes.paper}><span className="p-explore_Totalnumber">{totalmint}</span>
                //       </Paper>
                //     </Grid>
                //   </Grid>
                //   <Grid className="p-explore_heading-subsec" container>
                //     <Grid className="p-explore_heading-sub" item xs={12}>
                //       <Heading modifiers={['center']}>{t("mainMenu.TotalsoldNFT24h")} &nbsp;<Heading modifiers={['center', 'pink']}>7 days</Heading></Heading>
                //     </Grid>
                //     <Grid item xs={12}>
                //       <Paper elevation={0} className={classes.paper}><span className="p-explore_Totalnumber">{totalvolume}&nbsp;</span><span className="p-explore_TotalnumberValue">BUSD</span>
                //       </Paper>
                //     </Grid>
                //   </Grid>
                // </Sectionsub>
                <></>
              ) : (
                  <Sectionsub modifiers="padding5" className="p-explore_totalvolume p-explore_carousel">
                    <Carouselt />
                  </Sectionsub>
                )}
            </Grid>
            {!isMobile ? (
              <Grid item xs={3} >
                <Grid container spacing={1}>
                  {/* <Grid alignItems="center" style={{ height: "100%" }} item xs={12}>
                      
                      <Button handleClick={() => setModalOpenClaim(true)}  modifiers="claim"><span>Claim Mining CONT Token </span><Icon modifiers="logoClaim" iconName="logo2"/> </Button>
                    </Grid> */}
                  {/* <Grid style={{ height: "100%" }} item xs={12}>
                    <div className="p-explore_subdetail">
                      <Grid spacing={1} style={{ width: "100%",paddingBottom:"6px",paddingTop:"5px" }} item xs={12}>
                        <Link to="/userguilde">
                          <Button modifiers="term">Tutorial</Button>
                        </Link>
                      </Grid>
                      <Grid spacing={1} style={{ width: "100%" }} item xs={12}>
                        <Link to="/termofservice">
                          <Button modifiers="term">Term of service</Button>
                        </Link>
                      </Grid>
                      <Grid spacing={1} style={{ width: "100%",paddingTop:"6px" }} item xs={12}>
                      <Link to="/privacypolicy">
                        <Button modifiers="term">Privacy Policy</Button>
                      </Link>
                      </Grid>
                    </div>
                    </Grid> */}

                  <Grid style={{ height: "100%" }} item xs={12}>
                    <div className="p-explore_subdetail">
                      <Grid style={{ height: "100%" }} item xs={12}>
                        <Link to="/userguilde">
                          <button className="p-explore_ButtonHowconnect">
                            <Sectionsub modifiers="howconnect">
                              <div className="p-explore_Howconnect">
                                <Heading modifiers={['left']}>How to connect Metamask?</Heading>
                              </div>
                            </Sectionsub>
                          </button>
                        </Link>
                      </Grid>

                      <Grid style={{ height: "100%" }} item xs={12}>
                        <Grid >
                          {/* <Link to="/userguilde"> */}
                          <a href="https://www.coconut.global/">
                            <a href="https://www.coconut.global/" className="p-explore_ButtonHowconnect" target="_blank">
                              <Sectionsub modifiers="howsettup">
                                <div className="p-explore_Howsettup">
                                  <Heading modifiers={['left','white']}>Introduce of COCONUT project</Heading>
                                </div>
                                {/* <Icon modifiers="marginLeft" iconName='multicircle'/> */}
                              </Sectionsub>

                            </a>
                          </a>
                          {/* </Link> */}
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            ) : (<div></div>)}
          </Grid>
        </Container>
        
        <Formik initialValues={initialValue} validationSchema={exploreSchema} onSubmit={values => { 
          if (values.search !== undefined) {
          navigate(`/search?name=${values.search}`); 
          }
          }
      }>
          {({ values }) => {
            return (
              <Form>

                <Grid
                  className="p-explore_mainet"
                  container
                  spacing={3}
                  direction="row"
                  justify="flex-start"
                  alignItems="stretch"
                >
                  {!isMobile && (
                    <Grid className={classes.sticky} item xs={3} spacing={2}>
                      <Section className="p-explore_mainsub">
                      <TextFieldFormik
                                  modifiers="search"
                                  placeholder={t("mainMenu.Search")}
                                  type="search"
                                  name="search"
                                />
                                {/* <Textfieldsearch/> */}
                        {(['top'] as Anchor[]).map((anchor) => (
                          <React.Fragment key={anchor}>
                            <button className="expaned-mobile" onClick={toggleDrawer(anchor, true)} ><Icon modifiers="mini" iconName="threedotNobackground" /></button>
                            <SwipeableDrawer
                              anchor={anchor}
                              open={state[anchor]}
                              onClose={toggleDrawer(anchor, false)}
                              onOpen={toggleDrawer(anchor, true)}
                            >
                              {list(anchor)}
                            </SwipeableDrawer>
                          </React.Fragment>
                        ))}
                        <div className="menuOption">
                          <Grid className="menu" container spacing={0}>
                            <Grid item xs={12}>
                              <TabList modifiers="explore">
                                
                                <Heading modifiers={['explore']}>{t("mainMenu.Explore")}</Heading>
                                {/* {[...ProductCategories].map(cate => ( */}
                                <div className="menuOption_tablist">
                                {[...ProductCategories].map(cate => (
                                  // {['All','Trend', ...ProductCategories].map(cate => (
                                  <TabButton
                                    modifiers="explore"
                                    key={cate.tab}
                                    // useFormik
                                    name="productCategory"
                                    value={cate.tab}
                                    explore
                                    // checked={true}
                                    handleClick={() => handleFilter('category', cate.tab)}
                                  >
                                    <Icon modifiers="32px" iconName={cate.icon} />
                                    <Text modifiers="centerexplore">{cate.tab}</Text>
                                    {/* <Grid
                                      container
                                      spacing={3}
                                    >
                                      <Grid item xs={1} spacing={1}></Grid>
                                      <Grid item xs={1} spacing={0}> <Icon iconName={cate.icon} /></Grid>
                                      <Grid className={classes.tabc} justify="flex-start" item xs={7} spacing={1}>
                                        {cate.tab}
                                      </Grid>
                                    </Grid> */}
                                  </TabButton>
                                ))}
                                </div>
                                 <div className="p-explore_moreContent">
                                  <Text modifiers="center">Category</Text>
                                  {reg.map((cate, i) => (
                                    <TabButton 
                                    category
                                    modifiers="category"
                                    // className="p-explore_button-moreDetail" 
                                    
                                    handleClick={() => handleFilter('category', 

                                    cate.name)}>{cate.name.charAt(0).toUpperCase() + cate.name.slice(1)}</TabButton>
                                  ))}
                                </div>
                                {/* <Dropdown
                                  modifiers={['flex-end']}
                                  trigger={
                                    <Button
                                      modifiers={['icon', 'filter', 'noBorder']}
                                      handleClick={() => setShowFilterAndSort(!showFilterAndSort)}
                                    >
                                      <Icon modifiers="filterexplore" iconName="filter" />
                                    </Button>

                                  }
                                  id="productFilter"
                                >
                                  <div className="p-explore_dropdown">
                                    <DropdownMenu>
                                      <DropDownItemGroup groupName="Sort by">
                                        <Divider style={{ background: 'white', marginBottom: '20px' }} />
                                        {Object.keys(Sort).map((s, idx) => (
                                          <DropdownItem key={idx}>
                                            <CheckInputFormik
                                              // type="radio"
                                              name="productSort"
                                              value={s}
                                              handleChange={() => {
                                                handleFilter('sort', s);
                                              }}
                                            >
                                              {s}
                                            </CheckInputFormik>
                                          </DropdownItem>
                                        ))}
                                      </DropDownItemGroup>
                                    </DropdownMenu>
                                  </div>
                                </Dropdown> */}
                               


                                {/* <Divider /> */}

                                {/* <AccordionDetails className={classes.details}>
                              <div>
                                {reg.map((cate,i) => (
                                  <button className="p-explore_button-more" onClick={() => handleFilter('category', cate.name)}>{cate.name}</button>
                                ))}
                              </div>
                              <Dropdown
                                modifiers={['flex-end']}
                                trigger={
                                  <Button
                                    modifiers={['icon', 'filter', 'noBorder']}
                                    handleClick={() => setShowFilterAndSort(!showFilterAndSort)}
                                  >
                                    <Icon iconName="filter" />
                                  </Button>
                                  
                                }
                                id="productFilter"
                              >
                                <DropdownMenu>
                                  <DropDownItemGroup groupName="Sort by">
                                    {Object.keys(Sort).map((s, idx) => (
                                      <DropdownItem key={idx}>
                                        <CheckInputFormik
                                          // type="radio"
                                          name="productSort"
                                          value={s}
                                          handleChange={() => {
                                            handleFilter('sort', s);
                                          }}
                                        >
                                          {s}
                                        </CheckInputFormik>
                                      </DropdownItem>
                                    ))}
                                  </DropDownItemGroup>
                                </DropdownMenu>
                              </Dropdown>
                            </AccordionDetails> */}
                                {/* <Divider classes={{
                              root: classes.Divider
                            }} /> */}

                              </TabList>
                            </Grid>
                          </Grid>
                        </div>
                      </Section>

                    </Grid>
                  )}
                  <Grid item xs={9}>
                    <div className="p-explore_products">
                      {store.error && wallet.status === "disconnected" ? (
                        <Text modifiers={['center', 'error']}>{store.error.message}</Text>
                      ) : (
                          <ItemList
                            next={() =>
                              getProducts({
                                cursor: store.next_cursor,
                              })
                            }
                            mobiless={isMobile}
                            isLoading={store.isLoading}
                            searchBy={values.productCategory}
                            next_cursor={store.next_cursor}

                            list={res === 'Trend' ? (store?.productsTrend.map(item => ({
                              title: item.collectible.title,
                              alt: '',
                              active: true,
                              creator: item.collectible.creator,
                              owner: item.collectible.owner,
                              creator_acc: item.collectible.creator_acc?.avatar.String,
                              categories: item.collectible.categories,
                              instant_sale_price: item.collectible.instant_sale_price,
                              token_owner: item.collectible.token_owner,
                              creator_address: item.collectible.creator_acc?.address,
                              userName: item.collectible.creator_acc?.username.String,
                              token_id: item.collectible.token_id,
                              description: item.collectible.description,
                              status: item.collectible.status,
                              quote_token: item.collectible.quote_token.name,
                              unlock_once_purchased: item.collectible.unlock_once_purchased,
                              src: item.collectible.upload_file,
                              ownerAvatar: item.collectible.owner?.avatar.String,
                              liked: item.collectible.like?.liked,
                              price: Number(item.collectible.instant_sale_price),
                              unit: item.collectible.quote_token?.name,
                              totallike: item.collectible.like?.total,
                              view: item.collectible.view,
                              mediaType: getMediaType(item.collectible.upload_file),
                              userList: users.map(user => ({
                                ...user,
                                name: item.collectible.token_owner,
                              })),
                              amount: 0,
                              id: item.collectible.id,
                            }))) : (
                                store?.products.map(item => ({
                                  title: item.title,
                                  active: true,
                                  alt: '',
                                  categories: item.categories,
                                  creator: item.creator,
                                  instant_sale_price: item.instant_sale_price,
                                  token_owner: item.token_owner,
                                  owner: item.owner,
                                  token_id: item.token_id,
                                  description: item.description,
                                  status: item.status,
                                  quote_token: item.quote_token.name,
                                  owneraddress: item.owner.address,
                                  unlock_once_purchased: item.unlock_once_purchased,
                                  creator_acc: item.creator_acc?.avatar.String,
                                  creator_address: item.creator_acc?.address,
                                  userName: item.creator_acc?.username.String,
                                  src: item.upload_file,
                                  ownerAvatar: item.owner?.avatar.String,
                                  liked: item.like?.liked,
                                  price: Number(item.instant_sale_price),
                                  unit: item.quote_token?.name,
                                  totallike: item.like?.total,
                                  view: item.view,
                                  mediaType: getMediaType(item.upload_file),
                                  userList: users.map(user => ({
                                    ...user,
                                    name: item.token_owner,
                                  })),
                                  amount: 0,
                                  id: item.id,
                                }))
                              )
                            }
                            userid={wallet.account}
                          />
                        )}
                    </div>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Layout>
      <Modal modifiers="claim" isOpen={modalOpenClaim} handleClose={() => setModalOpenClaim(false)}>
        <ModalHeader title="" handleClose={() => setModalOpenClaim(false)} />
        <Modalclaim />
      </Modal>
    </div>
  );
};

export default hot(Home);
