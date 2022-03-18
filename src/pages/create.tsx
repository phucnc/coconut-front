import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'components/templates/layout';
import { Section } from 'components/organisms/section';
import { Form, Formik } from 'formik';
import { Categories, createSchema, initialValue, Unit } from 'components/pages/create/form';
import axios from 'axios';
import { Link } from 'components/atoms/link';
import { Text } from 'components/atoms/text';
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
import { useWallet } from 'use-wallet';
import { useDispatch, useSelector } from 'react-redux';
import { approveNFT, createNFT, createTokenURI, getCreateStore, resetStore, sellNFT, sellCreateNFT, approveCreateNFT } from 'store/createNFT';
import { Select } from 'components/atoms/select';
import { commonStart } from 'store/common';
import { ButtonContainer } from 'components/molecules/buttonContainer';
import { amountReceived, amountReceivedDollar,amountDollarBNBrevieved,amountDollarBUSD,amountDollarCONT,amountDollarCONTrecieved,amountDollarBUSDrecieved } from 'util/amount';
import { MultiSelect } from 'components/atoms/multiselect';
import { useEthers, useEtherBalance } from "@usedapp/core";
import { useTranslation } from "react-i18next";

export const Create: React.FC = () => {
  const wallet = useWallet();
  const [reg, regSet] = useState(Array);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentStep, tokenURI } = useSelector(getCreateStore);
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const serviceFee = Number(process.env.SERVICE_FEE);

  const CreateSteps = [
    {
      description: 'Call contract method',
      title: 'Upload files and Mint token',
      handleClick: () => {
        dispatch(tokenURI ? createNFT.started({}) : createTokenURI.started({}));
      },
    },
    {
      description: 'Approve perfoming transactions with your wallet',
      title: 'Approve',
      handleClick: () => {
        dispatch(approveCreateNFT.started({}));
      },
    },
    {
      description: 'Sign sell order using your wallet',
      title: 'Sign sell order',
      handleClick: () => {
        dispatch(sellCreateNFT.started({}));
      },
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  
  const Get_categories = async () => {
    const categories = await axios.get(`${process.env.ADDRESS_API}/category`);
    // const data = total_mint.data.accounts[0];
    const listreg = categories.data.category;
    regSet(categories.data.category);
  };

  useEffect (() =>{
    Get_categories()
    },[]
  );
  useEffect(() => {
    currentStep.number === CreateSteps.length &&
      setTimeout(() => {
        setModalOpen(false);
      }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep.number]);

  useEffect(() => {
    if (!modalOpen) {
      dispatch(resetStore());
      currentStep.number === CreateSteps.length && navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, modalOpen]);

  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  // console.log("state.checkedB",state.checkedB)
  return (
    <div className="p-create">
      <Layout title="Create NFT">
        <Section className="p-create_main">
          <Heading>{t("create.CreateNFT")}</Heading>
          <Formik
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={values => {
              dispatch(commonStart({ nextAction: createTokenURI.started({ data: values }) }));
              setModalOpen(true);
            }}
            validateOnMount
          >
            {({ values, isValid, setTouched, touched }) => {
              const previewSrc = URL && values.file ? URL.createObjectURL(values.file) : '';
              const previewType = values.file && values.file.type;
              const addresspush ={"address": wallet.account}
              return (
                <Form className="p-create_form">
                  <div className="p-create_inputs">
                    <Fieldrow fieldName={t("create.Uploadfile")} name="file">
                      <FileInputcreate
                        name="file"
                        label={t("create.type")}
                        setTouched={() => !touched.file && setTouched({ ...touched, file: true })}
                      />
                    </Fieldrow>
                    <Fieldrow
                      className="p-create_instantsale"
                      fieldName={t("create.Instantsaleprice")}
                      lead={t("create.Enterprice")}
                      // toggleName="instantsale"
                      caption={[
                        `${t("create.Servicefee")} ${serviceFee}%`,
                        `${t("create.Youwillreceive")} ${amountReceived(values.instantsaleprice)} ${Unit[values.unit]} (～$${
                          values.unit == 0
                            ? amountDollarBNBrevieved(values.instantsaleprice)
                            :
                          values.unit == 1 ?
                          amountDollarBUSDrecieved(values.instantsaleprice)
                            :
                          amountDollarCONTrecieved(values.instantsaleprice)
                          })`,
                      ]}
                      isCaptionForInput
                      name="instantsaleprice"
                    >
                      <TextFieldFormik name="instantsaleprice" placeholder="Enter price for one piecee" type="number" />
                      <Select name="unit">
                        {Unit.map((u, idx) => (
                          <option value={idx} key={u}>
                            {u}
                          </option>
                        ))}
                      </Select>
                    </Fieldrow>
                    <Fieldrow fieldName={t("create.Category")} name="categories">
                      {typeof window !== `undefined` && (
                        <MultiSelect
                          options={reg}
                          selectedValues={values.categories}
                          name="categories"
                          onBlur={() => !touched.categories && setTouched({ ...touched, categories: true })}
                        />
                      )}
                    </Fieldrow>
                    
                    <Fieldrow  fieldName={t("create.Name")} name="name">
                      <TextFieldFormik  name="name" placeholder={t("create.itemName")} />
                    </Fieldrow>
                    {/* <div className="addresshidden">
                    <Fieldrow fieldName="address">
                      <Textarea value={wallet.account} name="address" placeholder="Redeemable T-shirt with logooo" maxLength={500} />
                    </Fieldrow>
                    </div> */}
                    <Fieldrow fieldName={t("create.Description")} isOptional className="p-create_description">
                      <Textarea name="description" placeholder={t("create.itemName")} maxLength={500} />
                    </Fieldrow>
                    {/* <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedB}
                          onChange={handleChange}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="I understand and agree that this content has not been copyrighted and the original author has not been verified, and that if there is a problem with the content such as copyright after purchase, the transaction may be stopped. In addition, I have checked the notice and disclaimer in the service, and I agree."
                      labelPlacement="end"
                    />
                    <ButtonContainer>
                      <Button type="button" modifiers="bid" anchor={{ href: '/' }}>
                        Back
                      </Button>
                      <Button type="submit" disabled={!isValid || !state.checkedB} modifiers="buy">
                        Create
                      </Button>
                    </ButtonContainer> */}
                  </div>
                  <div className="p-create_review">
                    <div className="p-create_reviewcontent">
                      <div className="p-create_reviewbox">
                      <Button modifiers="review">
                      <Icon iconName='playpink' modifiers="mini" />
                        &nbsp;{t("create.Review")}</Button>
                        <Reviewcard
                          title={values.name || ''}
                          price={values.instantsaleprice || 0}
                          unit={Unit[values.unit]}
                          src={previewSrc}
                          mediaType={previewType}
                          // collection={values.collection}
                          alt=""
                          isPreview
                        />
                        </div>
                        <div className="p-create_reviewcheckbox"></div>
                        <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChange}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={<div>{(t("create.legal"))}<Link href={"/termofservice"}>&nbsp;(Term of service)</Link></div>}
                        labelPlacement="end"
                      />
                      <div className="p-create_reviewcheckbox">
                        <ButtonContainer>
                          <Button type="button" modifiers="bid" anchor={{ href: '/' }}>
                          {t("create.Back")}
                          </Button>
                          <Button type="submit" disabled={!isValid || !state.checkedB} modifiers="buy">
                          {t("create.CreateNFT")}
                          </Button>
                        </ButtonContainer>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Section>
        <Modal isOpen={modalOpen} handleClose={() => setModalOpen(false)}>
          <ModalHeader title="FOLLOW STEPS" handleClose={() => setModalOpen(false)} />
          <Steps>
            {CreateSteps.map((step, idx) => {
              const iconName =
                currentStep.number > idx
                  ? 'tick-success'
                  : currentStep.number === idx
                  ? currentStep.status
                  : 'tick-step';
              return <StepItem key={idx} iconName={iconName} {...step} handleClick={step.handleClick} />;
            })}
          </Steps>
          <Text> After processing , popup is automatically closed. Wait for a moment. </Text>
        </Modal>
      </Layout>
    </div>
  );
};

export default hot(Create);
