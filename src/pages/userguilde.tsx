import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'components/templates/layout';
import { Sectionguilde } from 'components/organisms/sectionguilde';
import { Form, Formik } from 'formik';
import { Categories, createSchema, initialValue, Unit } from 'components/pages/create/form';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import { Icon, IconName } from 'components/atoms/icon';
import { Text } from 'components/atoms/text';
import { Heading } from 'components/molecules/heading';
import { Fieldrow } from 'components/molecules/fieldrow';
import { TextFieldFormik } from 'components/atoms/textfield';
import { FileInputcreate } from 'components/atoms/fileinputcreate';
import { Textarea } from 'components/atoms/textarea';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Button } from 'components/atoms/button';
import { Reviewcard } from 'components/organisms/reviewbox';
import { navigate } from 'gatsby-link';
import { Modal } from 'components/organisms/modal';
import { ModalHeader } from 'components/molecules/modalHeader';
import { StepItem } from 'components/molecules/stepItem';
import { Steps } from 'components/organisms/steps';
import Grid from '@material-ui/core/Grid';
import main_img from 'assets/images/howtouse_main.png';
import bottom_fade from 'assets/images/bottom_fade.png';
import setup_1 from 'assets/images/Slide1.png';
import setup_2 from 'assets/images/Slide2.png';
import setup_3 from 'assets/images/Slide3.png';
import setup_4 from 'assets/images/Slide4.png';
import setup_5 from 'assets/images/Slide5.png';
import setup_6 from 'assets/images/Slide6.png';
import setup_7 from 'assets/images/Slide7.png';
import setup_8 from 'assets/images/Slide8.png';
import setup_9 from 'assets/images/Slide9.png';
import setup_10 from 'assets/images/Slide10.png';
import setup_11 from 'assets/images/Slide11.png';
import setup_12 from 'assets/images/Slide12.png';
import setup_13 from 'assets/images/Slide13.png';
import setup_14 from 'assets/images/Slide14.png';
import setup_15 from 'assets/images/Slide15.png';
import setup_16 from 'assets/images/Slide16.png';
import setup_17 from 'assets/images/Slide17.png';
import setup_18 from 'assets/images/Slide18.png';
import setup_19 from 'assets/images/Slide19.png';
import setup_20 from 'assets/images/Slide20.png';
import setup_21 from 'assets/images/Slide21.png';
import setup_22 from 'assets/images/Slide22.png';
import setup_23 from 'assets/images/Slide23.png';
import setup_24 from 'assets/images/Slide24.png';
import setup_25 from 'assets/images/Slide25.png';
import setup_26 from 'assets/images/Slide26.png';
import setup_27 from 'assets/images/Slide27.png';
import setup_28 from 'assets/images/Slide28.png';
// import setup_29 from 'assets/images/Slide29.png';
// import setup_30 from 'assets/images/Slide30.png';
import { useWallet } from 'use-wallet';
import { useDispatch, useSelector } from 'react-redux';
import { approveNFT, createNFT, createTokenURI, getCreateStore, resetStore, sellNFT, sellCreateNFT, approveCreateNFT } from 'store/createNFT';
import { commonStart } from 'store/common';

export const userguilde: React.FC = () => {
  const dispatch = useDispatch();
  const { currentStep, tokenURI } = useSelector(getCreateStore);
  return (
    <div className="p-create">
      <Layout title="User Guilde">
        <Formik
          initialValues={initialValue}
          validationSchema={createSchema}
          onSubmit={values => {
            console.log("aaa")
          }}
          validateOnMount
        >
          {({ values, isValid, setTouched, touched }) => {
            return (
              <Form className="p-create_form">
                <div className="p-create_guilde">
                  <section className="sectionguidle">
                    <div className="sectionguidle_Main">
                      <img className="p-create_img" src={main_img} />
                      <img className="p-create_imgFade" src={bottom_fade} />
                    </div>
                    <Grid
                      className="sectionguidle_box"
                      container
                      spacing={5}
                      // direction="row"
                      justify="center"
                    // alignItems="stretch"
                    >
                      {/* <Grid justify="center" item xs={6}>
                        <Icon modifiers={['superlarge','flex']}  iconName="ccn_logo"/>
                      </Grid> */}
                      <Grid justify="center" item xs={7}>
                        <h2>How to use Coconut Global with MetaMask Wallet?</h2>
                      </Grid>
                      <Grid justify="center" item xs={1}></Grid>
                      <Grid justify="center" item xs={4}>
                        <ol>
                          <li>How to create a MetaMask Wallet?</li>
                          <li>Setting BSC Network on MetaMask Wallet</li>
                          <li>How to connect to MetaMask Wallet from Coconut Global?</li>
                          <li>How can I create an NFT?</li>
                          <li>How can I buy an NFT?</li>
                          <li>How can I resell my purchased NFT?</li>
                        </ol>
                      </Grid>
                    </Grid>
                  </section>
                  <div className="sectionguidle_sub">
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      <Grid justify="center" item xs={6}>
                        <h1>1.&nbsp; &nbsp; How to create a MetaMask Wallet?”</h1>
                        <ul>
                          <li><span>If you are wondering how to create a new cryptocurrency wallet, consider creating one by installing the MetaMask extension on your browser.</span></li>
                          <li><span>MetaMask is a free and secure browser extension that allows web applications to read and interact with the Ethereum/Binance Smart Chain blockchain.</span></li>
                        </ul>
                      </Grid>
                      <Grid justify="center" item xs={6}>
                        <img className="p-create_imgGuilde" src={setup_1} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={9}>
                        <Text>To create a new wallet with MetaMask you need to install the extension first. You can install Metamask for Chrome, Firefox, Brave and Opera browsers.</Text>
                        <Text>Open https://metamask.io or search for “Metamask extension” using your favorite search engine.</Text>
                      </Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={8}>
                        <img className="p-create_imgGuilde2" src={setup_2} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={9}>
                        <Text>In this tutorial we will be using Google Chrome as an example, but the workflow is the same for all browsers.</Text>
                      </Grid>
                      <Grid item xs={12}>
                        <img className="p-create_imgGuilde2" src={setup_3} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={6}>
                        <h2>Creating your account</h2>
                        <Text>Click on the extension icon in your Chrome browser; the extension icon is located in the top right hand corner on Chrome and should be in a similar location on other browsers.</Text>
                        <Text>Once MetaMask is open, you may be prompted to either "Create a Wallet" or "Import wallet." If you are first setting up your MetaMask account, select the former. If you have a wallet already, you can select "Import wallet" and then you will be asked to input your 12 word seed phrase to link your account; we'll tackle the seed phrase below.</Text>
                      </Grid>
                      <Grid item xs={6}>
                        <img className="p-create_imgGuilde2" src={setup_4} />
                        <Text>Once you've opted to create a new account, you will be asked to accept the terms of use, and then prompted to create a new password. Click Create.</Text>
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      <Grid justify="center" item xs={6}>
                        <ul>
                          <li><span>When MetaMask reveals your secret words, DO NOT FORGET to write them down.</span></li>
                          <li><span>This section is bolded so that you don't accidentally skim and lose access to your wallet forever.</span></li>
                          <li><span>Click the "Reveal Secret Words" button.</span></li>
                          <li><span>You will see a 12 words seed phrase.</span></li>
                          <li><span>DO NOT store these online, as that can always be a potential security risk. Instead, write these down in a notebook or something you will not misplace. Store it somewhere safe.</span></li>
                        </ul>
                      </Grid>
                      <Grid justify="center" item xs={6}>
                        <img className="p-create_imgGuilde2" src={setup_5} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={6}>
                        <h2>Log-in MetaMask Wallet</h2>
                        <Text>Now, you can check and log-in MetaMask Wallet in your browers</Text>
                      </Grid>
                      <Grid item xs={6}>
                        <img className="p-create_imgGuilde2" src={setup_6} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={12}>
                        <h1>2.&nbsp; &nbsp;Setting BSC Network on MetaMask Wallet</h1>
                      </Grid>
                      <Grid item xs={12}>
                        <img className="p-create_imgGuilde2" src={setup_7} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={6}>
                        <h2>Select option “Setting”</h2>
                        <Text>On the MetaMask wallet, click to drop down your accounts and select Settings.</Text>
                      </Grid>
                      <Grid item xs={6}>
                        <img className="p-create_imgGuilde2" src={setup_8} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={6}>
                        <h2>Add new network</h2>
                        <Text>Select Networks, then Add New network.</Text>
                      </Grid>
                      <Grid item xs={6}>
                        <img className="p-create_imgGuilde2" src={setup_9} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={6}>
                        <h2>Input the Information of BSC</h2>
                        <ul className="p-create_noticelist">
                          <li className="p-create_textlist">Network Name:</li>
                          <span> Smart Chain</span>
                          <li className="p-create_textlist">New RPC URL:</li>
                          <span> https://bsc-dataseed.binance.org/</span>
                          <li className="p-create_textlist">ChainID:</li>
                          <span> 56</span>
                          <li className="p-create_textlist">Symbol</li>
                          <span> BNB</span>
                          <li className="p-create_textlist">Block Explorer</li>
                          <a href="https://bscscan.com/">https://bscscan.com/</a>
                        </ul>
                        <div className="sectionguidle_sub_button">Click Save to add the BSC. And Done!&nbsp;&nbsp;&nbsp;&nbsp;<Icon iconName="done"/></div>
                      </Grid>
                      <Grid item xs={6}>
                        <img className="p-create_imgGuilde2" src={setup_10} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={6}>
                        <h2>Add BUSD and CONUT token to Metamask Wallet</h2>
                        <ul>
                          <li><span>When MetaMask reveals your secret words, DO NOT FORGET to write them down.</span></li>
                          <li><span>This section is bolded so that you don't accidentally skim and lose access to your wallet forever. </span></li>
                          <li><span>Click the "Reveal Secret Words" button.</span></li>
                          <li><span>You will see a 12 words seed phrase.</span></li>
                          <li><span>DO NOT store these online, as that can always be a potential security risk. Instead, write these down in a notebook or something you will not misplace. Store it somewhere safe.</span></li>
                        </ul>
                      </Grid>
                      <Grid item xs={6}>
                        <img className="p-create_imgGuilde2" src={setup_11} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      <Grid item xs={12}>
                        <h1>3.&nbsp; &nbsp;How to connect MetaMask Wallet from Coconut Global?</h1>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_12} />
                        </div>
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={8}>
                        <h2>Open https://app.coconut.global page</h2>
                        <Text>Open https://app.coconut.global page and click button “Connect Wallet”</Text>
                        <Text>Choose MetaMask Wallet</Text>
                      </Grid>
                      <Grid item xs={12}>
                        <img className="p-create_imgGuilde2" src={setup_13} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={6}>
                        <h2>Confirm connect</h2>
                        <Text>When MetaMask Wallet extension open, confirm connect to Coconut Global service.</Text>
                        <Text>If connect status on MetaMask Wallet is Connected, you can start creating and trading NFTs on our platform.</Text>
                      </Grid>
                      <Grid item xs={6}>
                        <img className="p-create_imgGuilde2" src={setup_14} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      <Grid item xs={12}>
                      <div className="sectionguidle_sub_center">
                        <h1>4.&nbsp; &nbsp;How can I create NFT?</h1>
                      </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_15} />
                        </div>
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      <Grid item xs={12}>
                      <div className="sectionguidle_sub_center">
                        <h2>Check Wallet Connecting status?</h2>
                        <Text>You need connect to MetaMask Wallet to create item NFT</Text>
                        <Text>You can check in here:</Text>
                      </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_16} />
                        </div>
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={8}>
                        <h2>Create Item</h2>
                        <Text>1.Choose “Create” button</Text>
                        <Text>2.Agree with Coconut’s term</Text>
                        <Text>3.Complete the NFT information and create</Text>
                      </Grid>
                      <Grid item xs={12}>
                        <img className="p-create_imgGuilde_top" src={setup_17} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={8}>
                        <h2>Confirm MetaMask Wallet requests to create NFT item</h2>
                      </Grid>
                      <Grid item xs={12}>
                        <img className="p-create_imgGuilde2" src={setup_18} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                    // justify="center"
                    >
                      <Grid item xs={8}>
                        <h2>Check your created NFT item</h2>
                      </Grid>
                      <Grid item xs={12}>
                        <img className="p-create_imgGuilde2" src={setup_19} />
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containtFull"
                      container
                      spacing={5}
                      justify="center"
                    >
                      <Grid item xs={6}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_20} />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <h1>5.&nbsp; &nbsp;How can I buy NFT item?</h1>
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      <Grid item xs={6}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_21} />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <h2>First, check Wallet Connecting status, then</h2>
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      <Grid item xs={6}>
                        <h2>Confirm Transaction</h2>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_22} />
                        </div>
                      </Grid>
                      
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      <Grid item xs={5}>
                        <h2>Check your purchased NFT items</h2>
                      </Grid>
                      <Grid item xs={7}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_23} />
                        </div>
                      </Grid>
                      
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containtFull"
                      container
                      spacing={5}
                      justify="center"
                    >
                      
                      <Grid item xs={10}>
                        <h1>6.&nbsp; &nbsp;How can I resell my purchased NFT?</h1>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_24} />
                        </div>
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      
                      <Grid item xs={7}>
                        <h2>Choose 1 item in Purchased Item at My-item page</h2>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_25} />
                        </div>
                      </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                      className="sectionguidle_sub_containt"
                      container
                      spacing={5}
                      justify="center"
                    >
                      
                      <Grid item xs={7}>
                        <h2>Input the price you want to resell this item and confirm</h2>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <img className="p-create_imgGuilde2" src={setup_26} />
                        </div>
                      </Grid>
                    </Grid>
                    {/*  */}
                  </div>

                </div>
                <div className="p-create_review">
                  <div className="p-create_userguildeBox">
                    <h2>Setup BSC in Metamask Wallet:</h2>
                    <ul className="p-create_noticelist">
                      <li className="p-create_textlist">Network Name:</li>
                      <li className="p-create_textlistnone">
                        <span>Smart Chain</span></li>
                      <li className="p-create_textlist">New RPC URL:</li>
                      <li className="p-create_textlistnone">
                        <a href="https://bsc-dataseed.binance.org/">https://bsc-dataseed.binance.org/</a></li>
                      <li className="p-create_textlist">ChainID:</li>
                      <li className="p-create_textlistnone"><span> 56</span></li>
                      <li className="p-create_textlist">Symbol</li>
                      <li className="p-create_textlistnone"><span> BNB</span></li>
                      <li className="p-create_textlist">Block Explorer</li>
                      <li className="p-create_textlistnone"><a href="https://bscscan.com/">https://bscscan.com/</a></li>

                    </ul>
                    <Divider style={{ background: 'black' }} />
                    <ul className="p-create_noticelist">
                      <li className="p-create_textlist">CONUT token: </li>
                      <li className="p-create_textlistnone"><span>
                        0x323249642f3a4519134a0926cb7797077e49de76</span></li>
                      <li className="p-create_textlist">BUSD token: </li>
                      <li className="p-create_textlistnone"><span>
                        0xe9e7cea3dedca5984780bafc599bd69add087d56</span></li>

                    </ul>
                  </div>

                </div>

              </Form>

            );
          }}
        </Formik>
      </Layout>
    </div>
  );
};

export default hot(userguilde);
