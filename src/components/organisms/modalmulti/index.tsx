import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import ReactModal from 'react-modal';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import {openModalCreate,openModalCreateMulti } from 'store/buyNFT';
import { useSnackbar } from 'notistack';
import { Icon } from 'components/atoms/icon';
import { Link } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
type Modifier = 'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';

interface Props {
  link?:string;
}


export const Modalmulti: React.FC<Props> = props => {
  // const [modalOpenShare, setModalOpenShare] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  return (
    <>
    <h2 className="modal_title_multi">{t("create.Title")}</h2>
    <span className="modal_title_multiD" > {t("create.TitleDetail1")}</span>
    <span className="modal_title_multiD" > {t("create.TitleDetail2")}
    </span>
      <Grid
        container
        spacing={3}
        // direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid className="buttonedit" item xs={5} >
          <ul>
            <button onClick= {() => dispatch(openModalCreate())}  className="multi-button" >
            <li><Icon modifiers="superlarge" iconName="single" /></li>
            <li className="span-header"><span > {t("create.Single")}</span></li>
            <li className="span-icon">
              <p> {t("create.SingleDetail1")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <p> {t("create.SingleDetail2")}
              </p>
            </li>
            </button>
            {/* <div className="span-commingsoon">
              <span>&nbsp;&#8212; Comming Soon &#8212;</span>
            </div> */}
          </ul>
        </Grid>
        <Grid className="buttonedit" item xs={5} >
          <ul>
            <button disabled onClick= {() => dispatch(openModalCreateMulti())}
            className="multi-button">
            <li><Icon modifiers="superlarge" iconName="multi" /></li>
            <li className="span-header"><span > {t("create.Multi")}</span></li>
            <li className="span-icon">
              <p >  {t("create.Multietail1")}</p>
              <p >  {t("create.Multietail2")}</p>
            </li>
            </button>
          </ul>
        </Grid>
      </Grid>
   </>
  
  ) 
};

export default hot(Modalmulti);
