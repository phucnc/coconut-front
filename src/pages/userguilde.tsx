import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'components/templates/layout';
import { Section } from 'components/organisms/section';
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
import setup_29 from 'assets/images/Slide29.png';
import setup_30 from 'assets/images/Slide30.png';
import { useWallet } from 'use-wallet';
import { useDispatch, useSelector } from 'react-redux';
import { approveNFT, createNFT, createTokenURI, getCreateStore, resetStore, sellNFT, sellCreateNFT, approveCreateNFT } from 'store/createNFT';
import { commonStart } from 'store/common';

export const userguilde: React.FC = () => {
  const dispatch = useDispatch();
  const { currentStep, tokenURI } = useSelector(getCreateStore);
  return (
    <div className="p-create">
      <Layout title="Create NFT">
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
                    <img   className="p-create_img" src={setup_1}></img>
                    <img  className="p-create_img" src={setup_2}></img>
                    <img id="img1"  className="p-create_img" src={setup_3}></img>
                    <img className="p-create_img" src={setup_4}></img>
                    <img className="p-create_img" src={setup_5}></img>
                    <img className="p-create_img" src={setup_6}></img>
                    <img className="p-create_img" src={setup_7}></img>
                    <img className="p-create_img" src={setup_8}></img>
                    <img id="img2" className="p-create_img" src={setup_9}></img>
                    <img className="p-create_img" src={setup_10}></img>
                    <img className="p-create_img" src={setup_11}></img>
                    <img id="img3" className="p-create_img" src={setup_12}></img>
                    <img className="p-create_img" src={setup_13}></img>
                    <img className="p-create_img" src={setup_14}></img>
                    <img className="p-create_img" src={setup_15}></img>
                    <img  className="p-create_img" src={setup_16}></img>
                    <img id="img4" className="p-create_img" src={setup_17}></img>
                    <img className="p-create_img" src={setup_18}></img>
                    <img className="p-create_img" src={setup_19}></img>
                    <img  className="p-create_img" src={setup_20}></img>
                    <img id="img5" className="p-create_img" src={setup_21}></img>
                    <img className="p-create_img" src={setup_22}></img>
                    <img className="p-create_img" src={setup_23}></img>
                    <img className="p-create_img" src={setup_24}></img>
                    <img className="p-create_img" src={setup_25}></img>
                    <img className="p-create_img" src={setup_26}></img>
                    <img className="p-create_img" src={setup_27}></img>
                    <img className="p-create_img" src={setup_28}></img>
                    <img className="p-create_img" src={setup_29}></img>
                    <img className="p-create_img" src={setup_30}></img>
                    <div className="p-create_buttonDone">
                      <Button anchor={{ href: '/' }} modifiers="bigDone">Done+</Button>
                    </div>
                  </div>
                  <div className="p-create_review">
                    <div className="p-create_userguildeBox">
                      <h2>Setup BSC in Metamask Wallet:</h2>
                    <ul className="p-create_noticelist">
                      {/* <li className="p-create_textlist"><Link  to="img1" spy={true} smooth={true}>Page 3: How to create a Metamask Wallet</Link> </li> */}
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
                    <Divider style={{ background: 'black' }}/>
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
