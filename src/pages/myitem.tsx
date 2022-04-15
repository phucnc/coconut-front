import React, { useCallback, useEffect, useMemo, useState,useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'components/templates/layout';
import { Section } from 'components/organisms/section';
import { users } from 'dummy/dummy';
import { navigate } from 'gatsby';
import { Icon } from 'components/atoms/icon';
import { Form, Formik } from 'formik';
import { Dropdown } from 'components/molecules/dropdown';
import { TabList } from 'components/molecules/tabList';
import { TabButton } from 'components/molecules/tabButton';
// import { ItemList } from 'components/organisms/itemList';
import { ItemListMyItem } from 'components/organisms/itemListMyItem';
import { closeConnectModal, getCommon, setAccount,tokenID } from 'store/common';
// import { ExploreMenu } from 'components/organisms/exploreMenu';
import { Barmenu } from 'components/organisms/BarMenu';
import { Avatar } from 'components/organisms/Avatar';
import {  Unit } from 'components/pages/create/form';
import { getMediaType } from 'util/getMediaType';
import { Button } from 'components/atoms/button';
import { RouteComponentProps } from '@reach/router';
import {  ViewMyitemTabsType } from 'components/pages/view/constants';

import {
  ExploreSchema,
  exploreSchema,
  MyItemCategories,
  Sort,
  SortDefaultValue,
} from 'components/pages/explore/form';
import { useWallet } from 'use-wallet';
import { useDispatch, useSelector } from 'react-redux';
import { CheckInputFormik } from 'components/atoms/checkInput';
import { approveNFT, createNFT, createTokenURI, getCreateStore, resetStore, sellNFT } from 'store/createNFT';
import { DropdownItem, DropDownItemGroup, DropdownMenu } from 'components/molecules/dropdownMenu';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { getExploreStore,getProductListM, GetProductListMReq } from 'store/explore';

export const Myitem: React.FC<RouteComponentProps> = props => {
  const { errorMessage } = useSelector(getCommon);
  const queryaddress = new URLSearchParams(props.location?.search).get('id');
  const result = queryaddress?.substring(queryaddress.indexOf("="));
  const { currentStep, tokenURI,refresh,reload } = useSelector(getCreateStore);
  const params = new URLSearchParams(props.location?.search);
  console.log("params1")
  const [showFilterAndSort, setShowFilterAndSort] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [collectible, setcollectible] = useState<any>(Array)
  const [optionres, setoption] = useState<any>(Array)
  const store = useSelector(getExploreStore);
  const { t } = useTranslation();

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
  const query = new URLSearchParams(props.location?.search).get('search');
  console.log("queryy",query)
  const [username, usernameSet] = useState<any>(Array)
  const [addWallet, addWalletSet] = useState<any>(Array)
  const [avatar, avatarSet] = useState<any>(Array)
  const [cover, coverSet] = useState<any>(Array)
  const [infoBio, infoBioSet] = useState<any>(Array)
  const wallet = useWallet();
  const Refresh =async () => {
    try {
    const profile = await axios.get(`${process.env.ADDRESS_API}/account?id=${wallet.account}`)
    const haha = profile.data.username.String
    const addWalletuser = profile.data.address
    const infoBio = profile.data.info.String
    const avatar = profile.data.avartar.String
    const cover = profile.data.cover.String
    // resultSet(result)
    usernameSet(haha)
    addWalletSet(addWalletuser)
    infoBioSet(infoBio)
    avatarSet(avatar)
    coverSet(cover)}
    catch {
      console.log("fail my item")
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
    console.log("newpath",newPath)
    console.log("params9",params)
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
    console.log("collectible1",collectible)
    console.log("collectible2",wallet.account)
    setcollectible(collectible)
    setoption(optionsget1)
  }, []);
  
  const refreshitem = () => {
    if (refresh && refresh == true)
    window.location.reload();
  }
  const initialItem = async() => {
    try {
    const query = new URLSearchParams(props.location?.search).get('id');
    const result = query?.substring(query.indexOf("="));
    console.log("result1",result)
    console.log("result2",query)
    console.log("result33333",props.location?.search)
    const initial_values = await axios.get(`${process.env.ADDRESS_API}/nft/collectible-paging?cursor=&limit=10&sort=desc&filter=created-date&title=&address=${result}&options=creator`)
    const collectible =initial_values.data.collectibles
    setcollectible(collectible)
    setoption("creator")
    }
    catch {
      console.log("fail initial myitem")
    }
  } 
  useEffect(() => {
    query ? navigate(`/search?name=${query}`) : console.log("myitem")
    initialItem()
    setIsShowMore(false);
    Refresh();
  }, [reload]);

  useEffect (()=> {
    refreshitem()
  },[refresh]);

  const [selectedTab, setSelectedTab] = useState<ViewMyitemTabsType>('Created Items');

 console.log("propss",props)
 console.log("wallet.account",wallet.account)
  return (
    <div className="p-explore">
        <Formik initialValues={initialValue} validationSchema={exploreSchema} onSubmit={() => { }}>
          {({ values }) => {
            console.log("values1",values)
  return (
<Form>
    <div className="p-explore">
      <div className="p-create">
        <Layout title="Create NFT">
          <Section className="p-explore_main">
          <Avatar resultaddress={result} cover={cover} avatar={avatar}  infoBio={infoBio} username={username} address={result} className="p-create_main"></Avatar>
          <Section className="p-explore_myitemsub" >
          <div className="p-explore_productfilter">
                    <Barmenu
                      title
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
                              {t(`Myitem.${cate}`)}
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
                        <ItemListMyItem
                          searchBy={values.productCategory}
                          next_cursor={store.next_cursor}
                          list={collectible.map(item => ({
                            title: item.title,
                            alt: '',
                            src: item.upload_file,
                            totallike: item.like.total,
                            price: Number(item.instant_sale_price),
                            unit: item.quote_token.name,
                            view: item.view,
                            tokenowner: item.token_owner,
                            mediaType: getMediaType(item.upload_file),
                            url: item.upload_file,
                            userList: users,
                            amount: 0,
                            tokenid:item.token_id,
                            id: item.id,
                            optionres:{optionres},
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

export default hot(Myitem);
