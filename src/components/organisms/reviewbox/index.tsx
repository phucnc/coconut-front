import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import { Heading } from 'components/molecules/heading';
import { Text } from 'components/atoms/text';
import { Image, ImageProps } from 'components/atoms/image';
// import { Button } from 'semantic-ui-react'
import { Icon, IconName } from 'components/atoms/icon';
import { Link } from 'components/atoms/link';
import { Dropdown } from 'components/molecules/dropdown';
import { DropdownMenu, DropdownItem, DropDownItemGroup } from 'components/molecules/dropdownMenu';
import { useWallet } from 'use-wallet';
import axios from 'axios';
import { connectWallet } from 'lib/apiCommon';
import { UserAvatar } from 'components/molecules/userAvatar';
import { CheckInput } from 'components/atoms/checkInput';
import { UserType, VideoType, VideoTypes } from 'lib/constants';
import { Button } from 'components/atoms/button';
import { Video } from 'components/molecules/video';
import { Tooltip } from 'components/molecules/tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { ButtonContainer } from 'components/molecules/buttonContainer';
import { Categories, createSchema, initialValue, Unit } from 'components/pages/create/form';
import { Form, Formik } from 'formik';
import { Modal } from 'components/organisms/modal';
import { Modalshare } from 'components/organisms/modalshare';
import { approveNFT, createNFT, createTokenURI, getCreateStore, sellNFT } from 'store/createNFT';
import { Select } from 'components/atoms/select';
import { ModalHeader } from 'components/molecules/modalHeader';
import { useDispatch, useSelector } from 'react-redux';
import { Fieldrow } from 'components/molecules/fieldrow';
import { TextFieldFormik } from 'components/atoms/textfield';
import { resetStore } from 'store/createNFT';
import { Layout } from 'components/templates/layout';
import { commonStart } from 'store/common';
import { Section } from 'components/organisms/section';
import { amountReceived, amountReceivedDollar } from 'util/amount';
import { useTranslation } from "react-i18next";

type Modifier = 'foo' | 'bar';

export type User = { src: string; alt: string; type: UserType; name: string };
export interface ProductProps extends Omit<ImageProps, 'modifiers'> {
  modifiers?: Modifier | Modifier[];
  title: string;
  price?: number;
  bidPrice?: string | number;
  userList?: User[];
  amount?: number;
  collection?: string;
  isPreview?: boolean;
  id?: string | number;
  mediaType?: 'gif' | 'png' | 'image' | VideoType;
  unit?: string;
  address?: string;
  totallike?: any;
  userid?: string;
  view?: number;
  creator?: string;
  creator_acc?: string;
}


export const Reviewcard: React.FC<ProductProps> = props => {
  const wallet = useWallet();
  const [like, setLike] = useState({ isLike: false, amount: props.amount });
  const productLink = `/view?id=${props.id}`;
  const dispatch = useDispatch();
  const [ModalOpendelete, setModalOpendelete] = useState(false);
  const serviceFee = Number(process.env.SERVICE_FEE);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const [ModalResell, setModalResell] = useState(false);
  const [modalOpenShare, setModalOpenShare] = useState(false);
  const [modalInception, setmodalInception] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (!ModalResell) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, ModalResell]);
  useEffect(() => {
    if (!ModalOpendelete) {
      dispatch(resetStore());
    }

  }, [dispatch, ModalOpendelete]);
  useEffect(() => {
    if (!modalOpenShare) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpenShare]);
  const view = async () => {
    const viewer = await axios.post(`${process.env.ADDRESS_API}/view?collectible_id=${props.id}`)
  }
  const numberLike = async () => {
    if (!like.isLike) {
      const liked = await axios.post(`${process.env.ADDRESS_API}/nft/like?collectible_id=${props.id}&account_id=${props.userid}&action=1`)
    } else {
      const unliked = await axios.post(`${process.env.ADDRESS_API}/nft/like?collectible_id=${props.id}&account_id=${props.userid}&action=0`)
    }
    setLike({
      isLike: !like.isLike,
      amount: !like.isLike && typeof props.amount === 'number' ? props.amount + 1 : props.amount,
    })
  }

  // console.log("props.totallike", props.totallike.total)
  // console.log("useriddddd", props.userid)
  // console.log("viewwwwwww",props.id)
  return (
    <article className={mapModifiers('o-review', props.modifiers, props.isPreview && 'preview')}>
      {props.isPreview ? (
        <ProductPreview {...props} />
      ) : (
          <>
            <Link handleClick={() => view()} href={productLink}>
              <div className="o-review_media">
                {VideoTypes.includes(props.mediaType || '') ? (
                  <Video src={props.src} />
                ) : (
                    <Image src={props.src} alt={props.alt} />
                  )}
                <span className="o-review_view"><Icon iconName='play' />{props.view}</span>

              </div>

            </Link>
            <Modal modifiers="error" isOpen={modalInception} handleClose={() => setmodalInception(false)}>
              <Text modifiers={['bold', 'center']}>{t("mainMenu.ConnectD")}</Text>
              <ButtonContainer>
                <Button modifiers="bid" handleClick={() => setmodalInception(false)}>
                  Cancel
          </Button>
                <Button modifiers="buy" handleClick={() => { connectWallet(wallet); setmodalInception(false) }}>
                {t("mainMenu.Connect")}
          </Button>
              </ButtonContainer>
            </Modal>
            {wallet.status == "connected" ?
              (
                <button
                  onClick={() => numberLike()
                  }
                  className="o-review_like">{props.totallike.total + like.amount}&nbsp;&nbsp;
                  <Icon iconName={like.isLike ? 'heartred' : 'heartoutline'} />
                </button>
              ) : (
                <button
                  onClick={() => setmodalInception(true)}
                  className="o-review_like">{props.totallike.total + like.amount}&nbsp;&nbsp;
                  <Icon iconName={like.isLike ? 'heartred' : 'heartoutline'} />
                </button>
              )
            }
            {/* <CheckInput
              iconName={like.isLike ? 'heart-active' : 'heart'}
              amount={like.amount}
              handleChange={() =>
                setLike({
                  isLike: !like.isLike,
                  amount: !like.isLike && typeof props.amount === 'number' ? props.amount + 1 : props.amount,
                })
              }
            /> */}
            <Button handleClick={() => setModalOpenShare(true)} modifiers={['iconshare']}><Icon modifiers={['tiny']} iconName='sharelink' /></Button>
            <Modal modifiers={['price']} isOpen={ModalResell} handleClose={() => setModalResell(false)}>
              <ModalHeader title="Resell this NFT" handleClose={() => setModalResell(false)} />


              {/* <Heading>Create collectible</Heading> */}
              <Formik
                initialValues={initialValue}
                validationSchema={createSchema}
                onSubmit={values => {
                  dispatch(commonStart({ nextAction: createTokenURI.started({ data: values }) }));
                  // setModalOpen(!!wallet.account);
                }}
                validateOnMount
              >
                {({ values }) => {
                  // const previewSrc = URL && values.file ? URL.createObjectURL(values.file) : '';
                  // const previewType = values.file && values.file.type;
                  return (
                    <Form className="p-create_form">
                      <div className="p-create_inputssub">
                        <Fieldrow
                          className="p-create_instantsale"
                          caption={[
                            // `Service fee ${serviceFee}%`,
                            `You will receive ${
                            values.unit === 0
                              ? amountReceived(values.instantsaleprice).toFixed(2)
                              : amountReceived(values.instantsaleprice)
                            }${Unit[values.unit]}（～$${amountReceivedDollar(values.instantsaleprice)}）`,
                          ]}
                          captionfee
                          isCaptionForInput
                          name="instantsaleprice"
                        >
                          <TextFieldFormik modifiers="price" name="instantsaleprice" placeholder="Enter price for one piece" type="number" />
                          <Select name="unit">
                            {Unit.map((u, idx) => (
                              <option value={idx} key={u}>
                                {u}
                              </option>
                            ))}
                          </Select>
                        </Fieldrow>
                        <ButtonContainer>
                          <Button type="submit" modifiers="resell">
                            Create
                              </Button>
                        </ButtonContainer>
                      </div>
                    </Form>
                  );
                }}
              </Formik>

            </Modal>
            <Modal isOpen={modalOpenShare} handleClose={() => setModalOpenShare(false)}>
              <ModalHeader title="Share this NFT" handleClose={() => setModalOpenShare(false)} />
              <Modalshare link={productLink} />
            </Modal>
            <div className="o-review_info">
              <div className="o-review_heading">
                <div className="o-review_lead">
                  <Link href={productLink}>
                    <Heading type="h4" title={props.title}>
                      {props.title}
                    </Heading>
                  </Link>
                </div>
              </div>
              <div className="o-review_bmp">
                <div className="o-review_price">
                  <Text modifiers={['black']} inline unit={props.unit}>
                    {props.price}
                  </Text>
                </div>
                {/* <ul className="o-review_userlist">
                  {props.userList &&
                    props.userList.map((u, idx) => (
                      <li
                        key={idx}
                        className={`o-review_user o-review_user-${idx + 1}`}
                        data-tip={`${u.type}: ${u.name}`}
                      >
                        <UserAvatar userAddress={props.address} {...u} modifiers="small" hasTick />
                      </li>
                    ))}
                </ul> */}
                <ul className="o-review_userlist">
                  <li

                    className={`o-review_user o-review_user-1`}
                  >
                    <UserAvatar src={props.creator_acc} userAddress={props.creator} modifiers="small" />
                  </li>
                </ul>
              </div>
            </div>
            <Tooltip />
          </>
        )}
    </article>
  );
};

const ProductPreview: React.FC<ProductProps> = props => {
  const { t } = useTranslation();
  return (
    <>
      <div className="o-review_media">
        {(props.src &&
          (VideoTypes.includes(props.mediaType || '') ? (
            <Video key={props.src} src={props.src} />
          ) : (
              <Image src={props.src} alt={props.alt} />
            ))) || (
            <Text size="14" modifiers="lightgray">
              {/* Media Review */}
            </Text>
          )}

      </div>
      <div className="o-review_info">
        <div className="o-review_heading">
          <div className="o-review_lead">
            <Heading type="h4" title={props.title}>
              {props.title || (
                <Text size="14" inline modifiers="lightgray">
                  [{t("create.Name")}]
                </Text>
              )}
            </Heading>
            <Text modifiers={['gray', 'bold']} size="12" inline>
              {props.collection}
            </Text>
          </div>
        </div>
        <div className="o-review_bmp">
          <div className="o-review_price">
            <Text modifiers={['blue', 'bold']} inline unit={props.unit}>
              {props.price}
            </Text>
            {/* <Text modifiers={['gray']} size="14" inline>
              1 of 1
            </Text> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default hot(Reviewcard);
