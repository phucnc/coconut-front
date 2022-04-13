import { Button } from 'components/atoms/button';
import { Icon } from 'components/atoms/icon';
import { Link } from 'components/atoms/link';
import { TextFieldFormik } from 'components/atoms/textfield';
import { Form, Formik } from 'formik';
import { navigate } from 'gatsby-link';
import { throttle } from 'lodash';
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { useDispatch, useSelector } from 'react-redux';
import { getBalanceStore, getBUSD, getCONT } from 'store/getBalance';
import { useWallet } from 'use-wallet';
import Divider from '@material-ui/core/Divider';
import { MenuChunk } from './chunk';
import { Text } from 'components/atoms/text';
import { ButtonContainer } from 'components/molecules/buttonContainer';
import { Modal } from 'components/organisms/modal';
import { ModalHeader } from 'components/molecules/modalHeader';
import { connectWallet } from 'lib/apiCommon';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { approveNFT, createNFT, createTokenURI, getCreateStore, resetStore, sellNFT } from 'store/createNFT';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { useEthers, useEtherBalance } from "@usedapp/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuHeader,
  MenuDivider,
  MenuRadioGroup
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 250,
    textAlign: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: "50px",
  },
  ListItemText: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "25px",
    paddingTop: "25px",
    backgroundColor: "transparent !important",
  },
  Accord: {
    backgroundColor: "transparent !important",
  },
  Summary: {
    backgroundColor: "transparent !important",
    border: 'none',
    width: '100px',
    left: '80px'
  },
  Summarylast: {
    backgroundColor: "transparent !important",
    border: 'none',
    width: '100px',
    left: '140px'
  },
  detail: {
    display: "flex",
    padding: "8px 16px 16px",
    position: "relative",
    backgroundColor: "transparent !important",
  },
  heading: {
    // flexBasis: '33.33%',
    flexShrink: 0,
    background: 'transparent',
  },
  fullList: {
    width: 'auto',
    height: '100%',
  },
  Fragment: {
    height: '100%',
  },
});
type Anchor = 'top' | 'left' | 'bottom' | 'right';


export const Header: React.FC = () => {
  const wallet = useWallet();
  const dispatch = useDispatch();
  const [isSticky, setSticky] = useState(false);
  const { t } = useTranslation();
  const [openHambugerMenu, setOpenHambugerMenu] = useState(false);
  const [modalOpenShare, setModalOpenShare] = useState(false);
  const [modalmobile, setmodalmobile] = useState(false);
  const classes = useStyles();
  const [reg, regSet] = useState(Array);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const {activateBrowserWallet, account } = useEthers();
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
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

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div onClick={toggleDrawer(anchor, false)}>
          <ListItem className={classes.ListItemText} button>
            <Button handleClick={() => setmodalmobile(true)}>{t("mainMenu.Myitem")}</Button>
          </ListItem>
        </div>
        <div onClick={toggleDrawer(anchor, false)}>
          <ListItem className={classes.ListItemText} button>
            <Button anchor={{ href: '/' }} >Explore</Button>
          </ListItem>
        </div>
        <ListItem className={classes.ListItemText} button>
          <Button anchor={{ href: 'https://thankful-raclette-226.notion.site/COCONUT-d5dc804f50564430a1d6482be1907571' }} >FAQ</Button>
        </ListItem>
        <ListItem className={classes.ListItemText}>
          <Button > <Accordion className={classes.Accord} style={{ boxShadow: "none" }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary style={{ boxShadow: "none" }}
              className={classes.Summary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>Community</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <Button anchor={{ href: 'https://www.notion.so/ConteNFT-28ddfedca1a548bba7af855f695c2bf6?showMoveTo=true&saveParent=true' }}><Icon iconName="discord" /></Button>
              <Button anchor={{ href: 'https://twitter.com/ConteNft' }}><Icon iconName="twit" /></Button>
              <Button anchor={{ href: 'https://www.facebook.com/Contenft-104262898537410' }}><Icon iconName="fb" /></Button>
              <Button anchor={{ href: 'https://t.me/ConteNFT' }}><Icon iconName="teleg" /></Button>
            </AccordionDetails>
          </Accordion>
          </Button>
        </ListItem>
        <ListItem className={classes.ListItemText}>
          <Button > <Accordion className={classes.Accord} style={{ boxShadow: "none" }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary style={{ boxShadow: "none" }}
              className={classes.Summarylast}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>More</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                <Button anchor={{ href: '' }}  >Contact us</Button>
                </Grid>
                <Grid item xs={6}>
                <Button anchor={{ href: '' }} >Blog</Button>
                </Grid>
                <Grid item xs={6}>
                <Button anchor={{ href: 'https://thankful-raclette-226.notion.site/COCONUT-d5dc804f50564430a1d6482be1907571' }} >CONUT Token</Button>
                </Grid>
                <Grid item xs={6}>
                <Button anchor={{ href: 'https://www.notion.so/ConteNFT-28ddfedca1a548bba7af855f695c2bf6?showMoveTo=true&saveParent=true' }} >Notice</Button>
                </Grid>

              </Grid>
            </AccordionDetails>
          </Accordion>
          </Button>
        </ListItem>
      </List>
      <div onClick={toggleDrawer(anchor, false)} className="o-header_connect-mobile">
        <Button handleClick={() => setmodalmobile(true)} modifiers="connectmobile"> {t("mainMenu.Connect") }</Button>
      </div>
    </div>
  )

  useEffect(() => {
    if (wallet.account) {
      dispatch(getBUSD.started({ account: wallet.account }));
      dispatch(getCONT.started({ account: wallet.account }));

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.status, wallet.balance]);
  const balance = useSelector(getBalanceStore);

  useEffect(() => {
    if (!modalmobile) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalmobile]);

  useEffect(() => {
    // accounts();
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const header = document.querySelector('.o-header');
      const layout = document.querySelector('.t-layout');
      const isSticky = (header && window.pageYOffset > header.getBoundingClientRect().top) || false;
      const onTop = window.pageYOffset === 0;
      setSticky(isSticky);
      layout?.classList.toggle('u-sticky', isSticky && !onTop);
    }, 150);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header className={'o-header u-sticky'}>
      {/* <header className={`o-header ${isSticky ? 'u-sticky' : ''}`}> */}
      <a href="/"> <span className={'o-header_b-logo'}><Divider orientation="vertical" flexItem /></span> </a>

      <div className="o-header_main">
        {/* <Formik
          initialValues={{ search: '' }}
          onSubmit={values => {
            navigate(`/search?name=${values.search}`);
            // navigate(`https://st.contenft.com/search?name=${values.search}`);
          }}
        >
          <Form className="o-header_search">
            <TextFieldFormik
              modifiers="search"
              placeholder="Search"
              type="text"
              name="search"
            />
          </Form>
        </Formik> */}
        <Modal modifiers="error" isOpen={modalOpenShare} handleClose={() => setModalOpenShare(false)}>
          <Text modifiers={['bold', 'center']}>{t("mainMenu.ConnectD")}</Text>
          <ButtonContainer>
            <Button modifiers="bid" handleClick={() => setModalOpenShare(false)}>
              Cancel
          </Button>
            <Button modifiers="buy" handleClick={() => { connectWallet(wallet); setModalOpenShare(false) }}>
            {t("mainMenu.Connect")}
          </Button>
          </ButtonContainer>
        </Modal>


        <ul className="o-header_menu">
          <li>
            {wallet.status === 'connected'? (
              <Link modifiers={['font']}
                href={"/myitem?id=" + wallet.account}>
                {t("mainMenu.Myitem")}</Link>
            ) : (
                <button className="o-header_button-menuItem"
                  onClick={() => setModalOpenShare(true)}
                >
                   {t("mainMenu.Myitem")}</button>
              )}
          </li>
        </ul>
        <ul className="o-header_menu">

          <a className="o-header_menulist" href="https://thankful-raclette-226.notion.site/COCONUT-d5dc804f50564430a1d6482be1907571" target="_blank">FAQ</a>

        </ul>
        <ul className="o-header_menu">
          <Menu menuButton={<MenuButton className="o-header_menulist">{t("mainMenu.Community")} &#x276F;</MenuButton>}>
            
            <MenuItem className="o-header_link-text" href="https://twitter.com/conutofficial" target="_blank">Twitter</MenuItem>
            <MenuItem className="o-header_link-text" href="https://t.me/conutofficial" target="_blank">Telegram</MenuItem>
            <MenuItem href="mailto:support@coconut.global" className="o-header_link-text"> <a href="mailto:support@coconut.global" target="_blank">Email</a></MenuItem>
            <MenuItem className="o-header_link-text" href="https://github.com/phucnc/coconut-front" target="_blank">Github</MenuItem>
          </Menu>
        </ul>
        <ul className="o-header_menu">
          <Menu menuButton={<MenuButton className="o-header_menulist">{t("mainMenu.More")} &#x276F;</MenuButton>}>
            <MenuItem target="_blank" href="https://thankful-raclette-226.notion.site/COCONUT-d5dc804f50564430a1d6482be1907571"  >CONUT Token</MenuItem>
            <SubMenu style={{ textDecoration: 'none' }} label={t("mainMenu.Contact")}>
              <MenuItem href="mailto:support@coconut.global" className="o-header_link-text"> <a href="mailto:support@coconut.global" target="_blank">{t("mainMenu.Business")}</a></MenuItem>
              <MenuItem href="mailto:support@coconut.global" className="o-header_link-text"> <a href="mailto:support@coconut.global" target="_blank">CS</a></MenuItem>
            </SubMenu>
            <MenuItem href="/">{t("mainMenu.Blog")}</MenuItem>
            <MenuItem href="/notice">Notice</MenuItem>
            <MenuItem href="/termofservice">Term of service</MenuItem>
            <MenuItem href="/termofservice">Policy</MenuItem>
          </Menu>
        </ul>
        {/* <Formik
          initialValues={{ search: '' }}
          onSubmit={values => {
            navigate(`/search?name=${values.search}`);
            // window.location.href = `https://app.contenft.com/search?name=${values.search}`
            // navigate(`https://st.contenft.com/search?name=${values.search}`);
          }}
        >
          <Form className="o-header_search">
            <TextFieldFormik
              modifiers="search"
              placeholder={t("mainMenu.Search")}
              type="search"
              name="search"
            />
          </Form>
        </Formik> */}
        <MenuChunk wallet={wallet} balanceBUSD={balance.BUSD} balanceCONT={balance.CONUT} />     
        <div className="o-header_hambuger">
          {(['top'] as Anchor[]).map((anchor) => (
            <React.Fragment key={anchor}>
              <button onClick={toggleDrawer(anchor, true)}>
                <Icon iconName="hamburger" /></button>
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
        </div>
      </div>
      {openHambugerMenu && (
        // <div className="o-header_hambugermenu">
        //   <div className="o-header_head">
        //     <Heading modifiers="white">NFT</Heading>
        //     <Button
        //       modifiers={['icon', 'noBackground', 'noBorder']}
        //       handleClick={() => setOpenHambugerMenu(!openHambugerMenu)}
        //     >
        //       <Icon iconName="close" />
        //     </Button>
        //   </div>
        //   {wallet?.status === 'connected' && (
        //     <Mywallet
        //       open={true}
        //       walletAccount={wallet.account || ''}
        //       balanceBNB={Number(wallet.balance)}
        //       balanceBUSD={balance.BUSD}
        //       balanceCONT={balance.CONT}
        //       hideDisconnect
        //       modifiers="fullwidth"
        //     />
        //   )}
        //   <ul className="o-header_menu">
        //     <li>
        //       <Link href="/">Explore</Link>
        //     </li>
        //     <li>
        //       <Link href="/">My Item</Link>
        //     </li>
        //   </ul>
        //   <MenuChunk wallet={wallet} balanceBUSD={balance.BUSD} balanceCONT={balance.CONT} />
        // </div>
        <div >
          {(['top'] as Anchor[]).map((anchor) => (
            <React.Fragment key={anchor}>
              <button onClick={toggleDrawer(anchor, true)}>{anchor}</button>
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
        </div>
      )}
      <Modal modifiers="error" isOpen={modalmobile} handleClose={() => setmodalmobile(false)}>
        <ModalHeader title={t("View.Sorry")} handleClose={() => setmodalmobile(false)} />
        <Text modifiers={['bold', 'center']}>{t("View.SorryD")}</Text>
        <ButtonContainer>
          <Button modifiers="buy" handleClick={() => { setmodalmobile(false) }}>
            OK
          </Button>
        </ButtonContainer>
      </Modal>
    </header>
  );
};

export default hot(Header);
