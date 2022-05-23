import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import ReactModal from 'react-modal';
import Grid from '@material-ui/core/Grid';
import { Modal } from 'components/organisms/modal';
import { useClipboard } from "use-clipboard-hook";
import { useTranslation } from "react-i18next";
import { useSnackbar } from 'notistack';
type Modifier = 'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';
import {  Icon } from 'semantic-ui-react'
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
} from "react-share";
import { useDispatch, useSelector } from 'react-redux';
interface Props {
  link:string;
}


export const Modalshare: React.FC<Props> = props => {
  // const [modalOpenShare, setModalOpenShare] = useState(false);
  const message = 'Copied';
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addressbase = `https://app.coconut.global${props.link}`
  const { ref, copy } = useClipboard({
    onSuccess: (text) => enqueueSnackbar(message, {
      variant: 'success',
    }),
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  return (
    
        <Grid
          container
          spacing={2}
          // direction="column"
          // alignItems="center"
          justify="center"
        >
          <Grid className="buttonedit" item xs={3} >
            <ul>
              <button className="share-button">
                <TwitterShareButton
                  url={addressbase}
                  title="#CoconutGlobal , #NFT"
                  className="Demo__some-network__share-button">
                  <li><Icon className="i-icon" size='big' name='twitter' /></li>
                  <li className="span-icon"><span > Twitter</span></li>
                </TwitterShareButton>
              </button>
            </ul>

          </Grid>
          <Grid className="buttonedit" item xs={3} >

            <ul>
              <button className="share-button" >
                <FacebookShareButton
                  url={addressbase}
                  title="#CoconutGlobal , #NFT"
                  className="Demo__some-network__share-button">
                  <li>
                    <Icon className="i-icon" size='big' name='facebook' /></li>
                  <li className="span-icon"><span > Facebook</span></li>
                </FacebookShareButton>

              </button>
            </ul>

          </Grid>
          <Grid className="buttonedit" item xs={3} >

            <ul>
              <button className="share-button">
                <TelegramShareButton
                  url={addressbase}
                  title="#CoconutGlobal , #NFT"
                  className="Demo__some-network__share-button">
                  <li>
                    <Icon className="i-icon" size='big' name='telegram plane' /></li>
                  <li className="span-icon"><span > Telegram</span></li>
                </TelegramShareButton>

              </button>
            </ul>

          </Grid>
          <Grid className="buttonedit" item xs={3} >
            <button onClick={() => copy()} className="share-button" >
              <ul>
                <li>
                  {/* <Icon className="i-icon" size='big' name='share' /> */}
                  <span className="a-icon a-icon-shareicon a-icon-medium"></span>
                </li>
                <span ref={ref} defaultValue={props.link} className="hidden">{addressbase}</span>
                <li className="span-iconCopy"><span > {t("sharepopup.Copy")}</span></li>
              </ul>
            </button>
          </Grid>
        </Grid>
      // </Modal>
  
  ) 
};

export default hot(Modalshare);
