import React, { useCallback, useEffect, useMemo, useState,useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'components/templates/layout';
import { Section } from 'components/organisms/section';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Heading } from 'components/molecules/heading';
import { Sectionsub } from 'components/organisms/sectionsub';
import { users } from 'dummy/dummy';
import { Text } from 'components/atoms/text';
import Tabs from '@material-ui/core/Tabs';
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
import { ItemListMyItem } from 'components/organisms/itemListMyItem';
import Web3 from 'web3';
import ReactModal from 'react-modal';
import axios from 'axios';
import { closeConnectModal, getCommon, setAccount } from 'store/common';
// import { ExploreMenu } from 'components/organisms/exploreMenu';
import { Barmenu } from 'components/organisms/BarMenu';
import { Avatar } from 'components/organisms/Avatar';
import { Categories, createSchema, initialValue, Unit } from 'components/pages/create/form';
import Tab from '@material-ui/core/Tab';
import { getMediaType } from 'util/getMediaType';
import { Button } from 'components/atoms/button';
import { RouteComponentProps } from '@reach/router';
import { ViewMyitemTabs, ViewMyitemTabsType } from 'components/pages/view/constants';
// import { connectWallet, ethEnabled, handleClick } from 'lib/apiCommon';
import chart from 'assets/images/marketplace.png';
import chart2 from 'assets/images/chart2.png';
import {
  ExploreSchema,
  exploreSchema,
  ExtraProductCategories,
  MyItemCategories,
  Sort,
  SortDefaultValue,
} from 'components/pages/explore/form';
import { useWallet } from 'use-wallet';
import { useDispatch, useSelector } from 'react-redux';
import { CheckInputFormik } from 'components/atoms/checkInput';
import { approveNFT, createNFT, createTokenURI, getCreateStore, resetStore, sellNFT } from 'store/createNFT';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getExploreStore,getProductListM, GetProductListMReq } from 'store/explore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
    width:'100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width:'300px!important',
    alignItems:'flex-start',
  },
  tabpanel: {

  },
  tab:{
    width:'300px!important',
    display:'flex',
    alignItems:'flex-start!important',
  },
}));

export const Claim: React.FC<RouteComponentProps> = props => {
  const { errorMessage } = useSelector(getCommon);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const params = new URLSearchParams(props.location?.search);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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


  
 
  return (
    <div className="p-explore">
        <Formik initialValues={initialValue} validationSchema={exploreSchema} onSubmit={() => { }}>
          {({ values }) => {
  return (
<Form>
    <div className="p-explore">

      <div className="p-create">
        <Layout title="Create NFT">
          <Section className="p-explore_mainNotice">
            <div className="claim">
              <Grid
                container
                spacing={9}
                direction="row"
                justify="center"
                alignItems="stretch"
              >
                 <Grid item xs={4}>
                  <Text>
                  If you want to get CONT marketplace mining reward then you must make at least 1 NFT purchase or create at least 1 NFT on conteNFT
                  </Text>
                  <Text>
                  Your CONT marketplace mining reward will be calculated every Tuesday, meaning after Tuesday you can claim your previous CONT mining reward.
                  </Text>
                  <Text>
                  CONT mining reward will accumulate over time. You have to pay a network gas fee every time you claim CONT mining reward.
                  </Text>
                 </Grid>
                 <Grid item xs={4}>
                   <Text>
                   Every Tuesday 60.000 CONT tokens are distributed to uploaders(creators) and buyers who bought NFT during that week before. 50% to the NFT uploaders(creators) and 50% to the NFT buyers.
                   </Text>
                   <Text>
                    Uploaders and Buyers will be received 50% of the distributed amount. This allocated amount of tokens is divided by the total number of participants who upload or purchase NFT items on conteNFT and those with the most total quantity of Upload/ Purchase will receive more CONT.
                   </Text>
                 </Grid>  
              </Grid>
            </div>
            <div className="claim">
              <Grid
                container
                spacing={9}
                direction="row"
                justify="center"
                alignItems="stretch"
              >
                <Grid item xs={4}>
                  <div className="claim_historyReward">
                    <div className="claim_content">
                      <Grid  item xs={12}>
                          <Text size="24" modifiers="bold">
                            Your Claiming History 
                          </Text>
                          {/* <div>
                            <Text modifiers={['inline']}>
                            2021/11/2
                            </Text>
                            <Text modifiers="inline">
                            Claim 100 CONT
                            </Text>
                          </div>
                          <div>
                            <Text modifiers={['inline']}>
                            2021/9/2
                            </Text>
                            <Text modifiers="inline">
                            Claim 200 CONT
                            </Text>
                          </div> */}
                        </Grid>
                      </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="claim_totalReward">
                    <div className="claim_content">
                      <Grid  item xs={12}>
                        <Text size="24" modifiers="bold">
                          Total unclaimed reward
                        </Text>
                        <Text size="24" modifiers={['bold','inline']}>
                          2000
                        </Text>
                        <Text modifiers="inline">
                          CONT
                        </Text>
                        <Button disabled modifiers="totalClaim">
                          CLAIM
                        </Button>
                      </Grid>
                    </div>
                  </div>
                </Grid>  
              </Grid>
            </div>

            <div className="claim_content-detail1">
              <Grid
                container
                spacing={9}
                justify="center"
                alignItems="center"
                direction="column"
              >
                <Grid item xs={2}>
                  <div className="claim_break">
                  </div>
                </Grid>
                <Grid item xs={5}>
                  <Text>
                  Top 25 users with the highest total of NFT purchase times + volume will receive a total reward of 14,000 CONT from the total reward of 30,000 for the buyers. And users outside the top 25 get tokens by calculating: 16,000 CONT divided by the total number of users outside the top 25 that week.
                  </Text>
                  <Text>
                  The specific amount of CONT tokens that the top 25 users with the highest total of NFT purchase times + volume receive:
                  </Text>
                </Grid>
                <Grid item xs={2}>
                  <div className="claim_break">
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <Text>
                Outside top 25 = 16,000 CONT/Total number of users outside the top 25 that week Similarly, we have: Top 25 users with the highest total of NFT upload times will receive a total reward of 14,000 CONT from the total reward of 30,000 for the uploaders. And users outside the top 25 get tokens by calculating: 16,000 CONT divided by the total number of users outside the top 25 that week.
                  </Text>
                  <Text>
                  Note: To ensure that the amount of CONT tokens is properly allocated to users and attracts more users coming to our service:
                  </Text>
                  <ul className="claim_list">
                    <li>
                    If there are less than 25 NFT uploaders(minters) that week: Each user will receive up to 50 CONT tokens
                    </li>
                    <li>
                    If there are less than 25 NFT buyers that week: Each person will receive up to 50 CONT tokens
                    </li>
                    <li>
                    If there are less than 150 NFT uploaders(minters) that week: Each user outside the top 25 NFT uploaders will receive up to 50 CONT tokens
                    </li>
                    <li>
                    If there are less than 150 NFT buyers that week: Each user outside the top 25 NFT buyers will receive up to 50 CONT tokens
                    </li>
                  </ul>
                  <Text>
                  If one of these cases occurs, the balance after conteNFT reward the mining tokens for users will be returned to the Marketplace Mining System fund to be distributed to the next users in the future.
                  </Text>
                  <img className="claim_marketplaceIMG" src={chart} ></img>
                </Grid>
                <Grid item xs={2}>
                  <div className="claim_break">
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="claim">
              <Grid
                container
                spacing={9}
                direction="row"
                justify="center"
                alignItems="center"
                >
                <Grid item xs={7}>
                  <img src={chart2} />
                </Grid>
                <Grid item xs= {4}>
                  <Text>
                  We reserve a right to alter Marketplace mining process to ensure that any potential attempts to cheat the system and demolish the fairness of our process can be eliminated.
                  </Text>
                </Grid>
                <Grid item xs={12}>
                <Button anchor={{ href: '/' }} >Done</Button>
                </Grid>
              </Grid>
            </div>
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

export default hot(Claim);
