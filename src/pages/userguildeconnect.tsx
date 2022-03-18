import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'components/templates/layout';
import { Section } from 'components/organisms/section';
import { Form, Formik } from 'formik';
import { Categories, createSchema, initialValue, Unit } from 'components/pages/create/form';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import { Icon, IconName } from 'components/atoms/icon';
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
import connect1 from 'assets/images/connect1.png';
import connect2 from 'assets/images/connect2.png';
import connect3 from 'assets/images/connect3.png';
import connect4 from 'assets/images/connect4.png';
import { useWallet } from 'use-wallet';
import { useDispatch, useSelector } from 'react-redux';
import { approveNFT, createNFT, createTokenURI, getCreateStore, resetStore, sellNFT, sellCreateNFT, approveCreateNFT } from 'store/createNFT';
import { Select } from 'components/atoms/select';
import { commonStart } from 'store/common';
import { ButtonContainer } from 'components/molecules/buttonContainer';
import { amountReceived, amountReceivedDollar } from 'util/amount';
import { MultiSelect } from 'components/atoms/multiselect';
import { useEthers, useEtherBalance } from "@usedapp/core";

export const userguildeconnect: React.FC = () => {
  const wallet = useWallet();
  const [reg, regSet] = useState(Array);
  const dispatch = useDispatch();
  const { currentStep, tokenURI } = useSelector(getCreateStore);
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const serviceFee = Number(process.env.SERVICE_FEE);

  return (
    <div className="p-create">
      <Layout title="Create NFT">
        {/* <Section className="p-create_main"> */}
          {/* <Heading>Create collectible</Heading> */}
          <Formik
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={values => {
              
              dispatch(commonStart({ nextAction: createTokenURI.started({ data: values }) }));
            }}
            validateOnMount
          >
            {({ values, isValid, setTouched, touched }) => {
              return (
                <Form className="p-create_form">
                  <div className="p-create_guilde">
                    <img className="p-create_imgConnect" src={connect1}></img>
                    <img className="p-create_imgConnect" src={connect2}></img>
                    <img className="p-create_imgConnect" src={connect3}></img>
                    <img className="p-create_imgConnect" src={connect4}></img>
                    <div className="p-create_buttonDone">
                      <Button anchor={{ href: '/' }} modifiers="bigDone">Done+</Button>
                    </div>
                  </div>
                </Form>
                
              );
            }}
          </Formik>
        {/* </Section> */}
      </Layout>
    </div>
  );
};

export default hot(userguildeconnect);
