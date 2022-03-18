import React, { useCallback, useEffect, useMemo, useState,useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'components/templates/layout';
import { Section } from 'components/organisms/section';
import { Sectionsub } from 'components/organisms/sectionsub';
import { users } from 'dummy/dummy';
import { Icon } from 'components/atoms/icon';
import { UserAvatar } from 'components/molecules/userAvatar';
import { Toggle } from 'components/atoms/toggle';
import { Form, Formik } from 'formik';
import { Dropdown } from 'components/molecules/dropdown';
import { TabList } from 'components/molecules/tabList';
import { ExploreMenu } from 'components/organisms/exploreMenu';
// import { Barmenu } from 'components/organisms/BarMenu';
import { handleViewport } from 'react-in-viewport';
import { TabListMyItem } from 'components/molecules/tabList-MyItem';
import { TabButton } from 'components/molecules/tabButton';
import { BUSDContract, CONTContract, NFTContract, SimpleExchangeContract } from 'lib/smartContract';
import { connectWallet } from 'lib/apiCommon';
// import { ItemList } from 'components/organisms/itemList';
import { ItemListUser } from 'components/organisms/itemListUser';
import Web3 from 'web3';
import ReactModal from 'react-modal';
import { closeConnectModal, getCommon, setAccount } from 'store/common';
// import { ExploreMenu } from 'components/organisms/exploreMenu';
import { Barmenu } from 'components/organisms/BarMenu';
import { Avatar } from 'components/organisms/Avatar';
import { User } from 'components/organisms/User';
import { Categories, createSchema, initialValue, Unit } from 'components/pages/create/form';
import { Heading } from 'components/molecules/heading';
import { Fieldrow } from 'components/molecules/fieldrow';
import { TextFieldFormik } from 'components/atoms/textfield';
import { FileInput } from 'components/atoms/fileinput';
import { Textarea } from 'components/atoms/textarea';
import { getMediaType } from 'util/getMediaType';
import { Button } from 'components/atoms/button';
import { RouteComponentProps } from '@reach/router';
import { ViewMyitemTabs, ViewMyitemTabsType } from 'components/pages/view/constants';
import { useMediaQuery } from 'react-responsive'
// import { connectWallet, ethEnabled, handleClick } from 'lib/apiCommon';

import {
  ExploreSchema,
  exploreSchema,
  ExtraProductCategories,
  MyItemCategories,
  Sort,
  SortDefaultValue,
} from 'components/pages/explore/form';
import { Text } from 'components/atoms/text';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, TelegramShareButton, EmailShareButton } from "react-share"
import { Productcard } from 'components/organisms/productCard';
import { navigate } from 'gatsby-link';
import { Modal } from 'components/organisms/modal';
import { ModalHeader } from 'components/molecules/modalHeader';
import { StepItem } from 'components/molecules/stepItem';
import { Steps } from 'components/organisms/steps';
import { useWallet } from 'use-wallet';
import { useDispatch, useSelector } from 'react-redux';
import { CheckInputFormik } from 'components/atoms/checkInput';
import { approveNFT, createNFT, createTokenURI, getCreateStore, resetStore, sellNFT } from 'store/createNFT';
import { Select } from 'components/atoms/select';
import { commonStart } from 'store/common';
import { ButtonContainer } from 'components/molecules/buttonContainer';
import { amountReceived, amountReceivedDollar } from 'util/amount';
import { MultiSelect } from 'components/atoms/multiselect';
import { map, mergeMap, catchError, filter } from 'rxjs/operators';
import { DropdownItem, DropDownItemGroup, DropdownMenu } from 'components/molecules/dropdownMenu';
import { purchase, approveBUSD, getProduct, approveCONT } from 'store/buyNFT';
import { Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getExploreStore, getProductList, GetProductListReq, getTotalVolume } from 'store/explore';

export const userpage: React.FC<RouteComponentProps> = props => {
  const { errorMessage } = useSelector(getCommon);
  const { currentStep, tokenURI } = useSelector(getCreateStore);
  const params = new URLSearchParams(props.location?.search);
  const [showExtraCategories, setShowExtraCategories] = useState(false);
  const [showFilterAndSort, setShowFilterAndSort] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const store = useSelector(getExploreStore);
  const dispatch = useDispatch();
  
  const getProductEpic: Epic = action$ =>
    action$.pipe(
      filter(getProduct.started.match),
      mergeMap(action => {
        // return from(axios.get(`http://nft.techiast.com/nft/${action.payload.id}`)).pipe(
          return from(axios.get(`${process.env.ADDRESS_API}/nft/${action.payload.id}`)).pipe(
          map(res => {
            return getProduct.done({
              params: action.payload,
              result: res.data,
            });
          }),
          catchError(error => of(getProduct.failed({ params: action.payload, error: error })))
        );
      })
    );


  const getProducts = (req: GetProductListReq) => {
    dispatch(
      getProductList.started({
        limit: req.limit,
        mode: req.mode,
        filterAndSort: params.get('sort'),
        category: params.get('category'),
        cursor: req.cursor,
      })
    );
  };
  const initialValue: ExploreSchema = useMemo(
    () => ({
      unit: Unit[0],
      productCategory:'Created Items',
      productSort: params.get('sort') || SortDefaultValue,
      verify: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const [username, usernameSet] = useState<any>(Array)
  const [addWallet, addWalletSet] = useState<any>(Array)
  const [avatar, avatarSet] = useState<any>(Array)
  const [cover, coverSet] = useState<any>(Array)
  const [collectible, setcollectible] = useState<any>(Array)
  const [infoBio, infoBioSet] = useState<any>(Array)
  const wallet = useWallet();
  const [selectedTab, setSelectedTab] = useState<ViewMyitemTabsType>('Created Items');
  // const result = query?.substring(query.indexOf("="));
  const click =async () => {
    try {
    const query = new URLSearchParams(props.location?.search).get('id');
    const result = query?.substring(query.indexOf("="));
    const profile = await axios.get(`${process.env.ADDRESS_API}/account?id=${result}`)
    const haha = profile.data.username.String
    const addWallet = profile.data.address
    const infoBio = profile.data.info.String
    const avatar1 = profile.data.avartar.String
    const cover = profile.data.cover.String
    // console.log("profile myItem",profile)
    // console.log("wallet form my item",wallet)
    // console.log("window.location.href",window.location.href)
    usernameSet(haha)
    addWalletSet(addWallet)
    infoBioSet(infoBio)
    avatarSet(avatar1)
    coverSet(cover)}
    catch {
      console.log("fail userpage")
    }
  }
 
 

 
  const handleFilter = useCallback(async (param: string, value: string) => {
    setIsShowMore(false);
    const query = new URLSearchParams(props.location?.search).get('id');
    const result = query?.substring(query.indexOf("="));
    params.get(param) ? params.set(param, value) : params.append(param, value);
    const newPath = `${props.path}?${params.toString()}`;
    // console.log("newPath",newPath)
    window.history.pushState({ path: newPath }, '', newPath);
    // console.log("params get", params)
    // console.log("check displayyyyy",params.get('category'))
    const optionsget = params.get('category')
    let optionsget1 = optionsget?.toLocaleLowerCase()
    switch (optionsget1){
      case'created items':
        optionsget1 ='creator';
        break;
        case'on sale':
        optionsget1 ='owner';
        break;
        case'bought items':
        optionsget1 ='bought';
        break;
        case'sold items':
        optionsget1 ='sold';
        break;
    }
    const getmyitem = await axios.get(`${process.env.ADDRESS_API}/nft/collectible-paging?cursor=&limit=10&sort=desc&filter=created-date&title=&address=${result}&options=${optionsget1}`)
    const collectible = getmyitem.data.collectibles
    setcollectible(collectible)
  }, []);
  const initialItem = async() => {
    const query = new URLSearchParams(props.location?.search).get('id');
    const result = query?.substring(query.indexOf("="));
    const initial_values = await axios.get(`${process.env.ADDRESS_API}/nft/collectible-paging?cursor=&limit=10&sort=desc&filter=created-date&title=&address=${result}&options=creator`)
    const collectible =initial_values.data.collectibles
    setcollectible(collectible)
  } 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  

  useEffect(() => {
    setIsShowMore(false);
    initialItem()
    click();
  }, []);
  useEffect(() => {
    if (!modalOpen) {
      dispatch(resetStore());
    }

  }, [dispatch, modalOpen]);

  useEffect(() => {
    if (!modalOpen1) {
      dispatch(resetStore());
    }

  }, [dispatch, modalOpen1]);
  return (
    <div className="p-explore">
      {/* <Layout title="Explore"> */}
      {/* <span>{datas}</span> */}
        <Formik initialValues={initialValue} validationSchema={exploreSchema} onSubmit={() => { }}>
          {({ values }) => {
  return (
<Form>
    <div className="p-explore">

      <div className="p-create">
        <Layout title="Create NFT">
         
          <Section className="p-explore_main">
          <User avatar={avatar} cover ={cover}  infoBio={infoBio} username={username} address={addWallet} className="p-create_main"></User>
          <Section className="o-section_mainsub" >
          <div className="p-explore_productfilter-userpage">
                    <Barmenu
                      category={
                        <TabList>
                          {['Created Items', ...MyItemCategories].map(cate => (
                            <TabButton
                              key={cate}
                              active={selectedTab === cate}
                              useFormik
                              name="productCategory"
                              value={cate}
                              handleClick={() => handleFilter('category', cate)}
                            >
                              {cate}
                            </TabButton>
                          ))}
                        
                        </TabList>
                      }
                      filterAndSort={
                        <Dropdown
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
                      }
                    />
                  </div>
                  <div className="p-explore_products">
                    {/* {store.error ? (
                      <Text modifiers={['center', 'error']}>{store.error.message}</Text>
                    ) : ( */}
                        <ItemListUser
                          next={() =>
                            getProducts({
                              cursor: store.next_cursor,
                            })
                          }
                          isLoading={store.isLoading}
                          searchBy={values.productCategory}
                          next_cursor={store.next_cursor}
                          list={collectible.map(item => ({
                            title: item.title,
                            alt: '',
                            src: item.upload_file,
                            price: Number(item.instant_sale_price),
                            unit: item.quote_token.name,
                            mediaType: getMediaType(item.upload_file),
                            userList: users,
                            view: item.view,
                            amount: 0,
                            id: item.id,
                          }))}
                        />
                      {/* )} */}
                  </div>
            </Section>
            
          </Section>
        </Layout>
      </div>


    </div>
    </Form>


);
}}
</Formik>
{/* </Layout> */}

</div>
);
};

export default hot(userpage);
