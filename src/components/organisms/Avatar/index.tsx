import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useDispatch, useSelector } from 'react-redux';
import avatar from 'assets/images/noneAvatar.svg';
import TextField from '@material-ui/core/TextField';
import { Toast } from 'components/molecules/toast';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import avatar1 from 'assets/images/icon/camera.svg';
import { Modal } from 'components/organisms/modal';
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";
import { useWallet } from 'use-wallet';
import { Epic, combineEpics } from 'redux-observable';
import { createTokenURI, createNFT, approveNFT, sellNFT } from 'store/createNFT';
import { State } from 'store';
import { Form, Formik } from 'formik';
import { FileInput } from 'components/atoms/fileinput';
import { commonStart } from 'store/common';
import { Categories, createSchema, initialValue, Unit } from 'components/pages/create/form';
// import { approveNFT, createNFT, createTokenURI,createTokenURIsub, getCreateStore, sellNFT } from 'store/createNFT';
import { useClipboard } from "use-clipboard-hook";
import axios from 'axios';
import { Fieldrow } from 'components/molecules/fieldrow';
import { useSnackbar } from 'notistack';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Link } from 'components/atoms/link';
import { ModalHeader } from 'components/molecules/modalHeader';
import { resetStore } from 'store/createNFT';
// import Button from '@material-ui/core/Button';
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";
type Modifier = 'nobackground' | 'nopadding' | 'nomargin';

interface Props {
  modifiers?: Modifier | Modifier[];
  className?: string;
  useDiv?: boolean;
  username?: string;
  address?: any;
  infoBio?: any;
  wallet?: any;
  avatar?: any;
  cover?:any;
  resultaddress:any;
}
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
        backgroundColor:"transparent",

      },
    },
    root1: {
      '& > *': {
        margin: theme.spacing(2),
        width: 400,
        marginBottom: 10,
      },
    },
    font_basic: {
      '& > *': {
        fontFamily: 'Cabin',
        fontStyle: 'normal',
        fontWeight: 'bold',
      },
    },
    font: {
      '& > *': {
        fontFamily: 'Cabin',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: '#797979',
        marginBottom: 30,
      },
    },
    buttonUp: {
      '& > *': {
        backgroundColor: 'linear-gradient(100.93deg, #D565C3 -13.26%, #ABD3EA 101.12%)',


      },
    },
  }),
);
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow: 'none',
    backgroundColor:"transparent"
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  textField: {
    backgroundColor: '#E9E9E9',
  },
  pos: {
    marginBottom: 12,
  },
});
const defaultProps = {
  bgcolor: 'white',
  m: 1,
  border: 0.1,
  style: { width: '15rem', height: '15rem', border: 'dashed' },
  // image: 'assets/images/uploadim.svg',
};
const defaultProps1 = {
  bgcolor: 'white',
  m: 1,
  border: 0.1,
  style: { width: '20rem', height: '12rem', border: 'dashed' },
  image: 'assets/images/uploadim.svg',
};
export const Avatar: React.FC<Props> = (props) => {
  const [style, setStyle] = useState({ display: 'none', transform: `none`, transition: `none` });
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const classes = useStyles();
  const classes1 = useStyles1();
  const [modalOpenShare, setModalOpenShare] = useState(false);
  const [modalOpenProfile, setmodalOpenProfile] = useState(false);
  const [modalOpenReport, setmodalOpenReport] = useState(false);
  const message = 'Copied';
  const wallet = useWallet();
  const [datas, dataSet] = useState<any>(Array)
  const { t } = useTranslation();
  const { ref, copy } = useClipboard({
    onSuccess: (text) => enqueueSnackbar(message, {
      variant: 'success',
    }),
  });
  const [datacover, datacoverSet] = useState<any>(Array)
  const [dataddress, dataddressSet] = useState<any>(Array)
  const [datauserinfo, datauserinfoSet] = useState<any>(Array)
  const [dataid, dataidSet] = useState<any>(Array)
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingavatar, setloadingavatar] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('I love hooks');
  }
  const refresh = async () => {
    const query = window.location.href
    const result = query?.substring(query.indexOf("="));
    const profile = await axios.get(`${process.env.ADDRESS_API}/account?id${result}`)
    const userAva = profile.data.avartar.String
    const userCover = profile.data.cover.String
    const useraddress = profile.data.address
    const userinfo = profile.data.info.String
    const usernameid = profile.data.username.String
    console.log("profile",profile)
    dataSet(userAva)
    datacoverSet(userCover)
    dataddressSet(useraddress)
    dataidSet(usernameid)
    datauserinfoSet(userinfo)
    // } catch {
    //   console.log("Fail avatar")
    // }
  }
  useEffect(() => {
    refresh()
  }, [loading]);
  useEffect(() => {
    refresh()
  }, [loadingavatar]);
  useEffect(() => {
    if (!modalOpen) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpen]);

  useEffect(() => {
    if (!modalOpenProfile) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpenProfile]);
  useEffect(() => {
    if (!modalOpenReport) {
      dispatch(resetStore());
      // currentSt.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpenReport]);

  useEffect(() => {
    if (!modalOpenShare) {
      dispatch(resetStore());
      // currentStep.number === CreateSteps.length && navigate('/');
    }

  }, [dispatch, modalOpenShare]);
  // console.log ("props.resultaddress",ref)
  // console.log ("props.username",props.username)
  return (
    // style="background-image: url(datacover);"
    <section className='o-section1'
    style={{
      backgroundColor:"#E6E6E6",
      backgroundImage: `url(${datacover})`
    }}
      onMouseEnter={e => {
        setStyle({ display: 'block', transform: `translateY(-20px)`, transition: `transform 250ms` });
      }}
      onMouseLeave={e => {
        setStyle({ display: 'none', transform: `none`, transition: `none` })
      }}>
      <label className='Change-avatar' htmlFor="icon-button-file" style={style}>
        <Button circular onClick={() => setModalOpen(true)} className="IconCopy" icon='photo'>
        </Button>
      </label>
     

     
      <Modal isOpen={modalOpenReport} handleClose={() => setmodalOpenReport(false)}>
        <ModalHeader title={t("reportpopup.Title")} handleClose={() => setmodalOpenReport(false)} />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
        </Grid>
        <Typography align="center" >
          <form className={classes1.root1} >
            <span className="font-bio">Describe why you think this item should be removed from marketplace.</span>
          </form>
        </Typography>
        <Typography align="center" >
                    <form className={classes1.root1} >
                      <TextField
                      name="name"
                      className={classes.textField}
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Tell us some detail"
                        inputProps={{ maxLength: 500 }}
                      ></TextField>
                    </form>
                    <p className="limitletter">{count}/500</p>
                  </Typography>
        <Typography align="center" >
          <Button  onClick={() => setmodalOpenReport(false)} className={classes1.buttonUp} color='black' size='big'>Report</Button>
        </Typography>
      </Modal>
      {/* ///////////////////// UPLOAD COVER //////////////////////////////
 ////////////////////////////////////////////////////////////////////// */}
      <Modal isOpen={modalOpen} handleClose={() => setModalOpen(false)}>
        <ModalHeader title="Upload cover photo" handleClose={() => setModalOpen(false)} /><Formik
          initialValues={initialValue}
          validationSchema={createSchema}
          onSubmit={async values => {
            const data = new FormData();
            data.append('upload_file', values.file);
            // dispatch(commonStart({ nextAction: createTokenURIsub.started({ data: values }) }));
            // await axios.put(`https://api.contenft.com/account?id=1&username=luthien`
            // )
          }}
          validateOnMount
        >
          {({ values, isValid, setTouched, touched }) => {
            const previewSrc = URL && values.file ? URL.createObjectURL(values.file) : '';
            const previewType = values.file && values.file.type;
            // console.log("values file", values);
            // const [password, setPassword] = useState('');

            // const handleClickk = () => {
            //   console.log(password);
            // };
            const [value, setValues] = React.useState({
              bio: '',
              name:'',

            });
            const onClickBtn = () => {
              console.log(value.name);
            };
            const handleChangeForm = name => event => {
              setValues({ ...value, [name]: event.target.value });
            };
            const handleChangeFormname = bio => event => {
              setValues({ ...value, [bio]: event.target.value });
            };
            

            const updateCover = async () => {

              const data = new FormData()
              data.append('upload_file', values.file);
              // data.append('username', values.username);
              if(previewSrc){
              try {
            const uploadPass=    await axios.put(`${process.env.ADDRESS_API}/account/cover?id=${dataddress}`, data, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
              }
              catch{
                console.log('Error loaidng rejected data');
              }
              }
              // window.location.reload(); 
              // refresh()
              setLoading(false);
              setModalOpen(false)
            }
            return (
              <Form className="p-create_form">
                <Grid
                  // className="avatar-user"
                  container
                  spacing={3}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                
                 {previewSrc? (<div></div>):(<FileInput
                    name="file"
                    // label=""
                    setTouched={() => !touched.file && setTouched({ ...touched, file: true })}
                  />)}
                  <img className={
                    previewSrc ? `ImgReview` : ``
                  } src={previewSrc}></img>
                  <Card className={classes.root}>
                    <CardContent >
                      <Typography align="center" >
                        <span className="font-bio">Upload new cover for your profile page. We recommend to upload images in 1440x260 resolution</span>
                      </Typography>
                    </CardContent>
                  </Card>
                  <Typography align="center" >
                    <Button onClick={() => updateCover()} type="submit" className={classes1.buttonUp} color='pink' size='big'>Upload</Button>
                  </Typography>
                </Grid>


              </Form>
            );
          }}
        </Formik>
      </Modal>

      {/* ////////////////////////////// Share /////// */}
      <Modal isOpen={modalOpenShare} handleClose={() => setModalOpenShare(false)}>
        <ModalHeader title={t("sharepopup.share")} handleClose={() => setModalOpenShare(false)} />
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
                  url={window.location.href}
                  title="#COCONUT , #NFT"
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
                  url={window.location.href}
                  title="#COCONUT , #NFT"
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
                  url={window.location.href}
                  title="#COCONUT , #NFT"
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
                  <Icon className="i-icon" size='big' name='share' /></li>
                <span ref={ref} defaultValue={window.location.href} className="hidden">{window.location.href}</span>
                <li className="span-icon"><span > {t("sharepopup.Copy")}</span></li>
              </ul>
            </button>
          </Grid>
        </Grid>
      </Modal>
      {/* ///////////////////////////////////////// */}
      {/* <Modal1/> */}
      <Modal isOpen={modalOpenProfile} handleClose={() => setmodalOpenProfile(false)}>
      {success ? (
                    <Toast handleClose={() => setmodalOpenProfile(false)}>Done !</Toast>
                  ) : (
                    <>
        <ModalHeader title={t("Myitem.Editprofile")} handleClose={() => setmodalOpenProfile(false)} />
        <Formik
          initialValues={initialValue}
          validationSchema={createSchema}
          onSubmit={ values => {
            const data = new FormData();
            data.append('upload_file', values.file);
            console.log("passe")
            // dispatch(commonStart({ nextAction: createTokenURIsub.started({ data: values }) }));
            // await axios.put(`https://api.contenft.com/account?id=1&username=luthien`
       
            // )
          }}
          validateOnMount
        >
          {({ values, isValid, setTouched, touched }) => {
            const previewSrc = URL && values.file ? URL.createObjectURL(values.file) : '';
            const previewType = values.file && values.file.type;
            const [value, setValues] = React.useState({
              bio: '',
              name:'',

            });
            const [previewSrcc, setImgPreview] = useState<any | null>(null);
            const onClickBtn = () => {
              console.log(value.name);
            };
            const handleChangeForm = name => event => {
              setValues({ ...value, [name]: event.target.value });
            };
            const handleChangeFormname = bio => event => {
              setValues({ ...value, [bio]: event.target.value });
            };
            console.log("value name",value)
            const updateAvatar = async () => {
              
              const data = new FormData()
              data.append('upload_file', values.file);
            
              if(previewSrc){
              try {
                await axios.put(`${process.env.ADDRESS_API}/account/avatar?id=${props.address}`, data, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                setSuccess(!success)
              }
              catch{
                console.log('Error loaidng rejected data');
              }
              }
              if(value.name.length > 0 && value.bio.length > 0){
                try {
                await axios.put(`${process.env.ADDRESS_API}/account?id=${props.address}&username=${value.name}&info=${value.bio}`)
                // window.location.reload();
                console.log("value done",value)
                setSuccess(!success) 
              }
              catch{
                console.log('Error loaidng rejected data');
              }
              } else if (value.bio.length == 0 && value.name.length > 0){
                try {
                await axios.put(`${process.env.ADDRESS_API}/account?id=${props.address}&username=${value.name}&info=${props.infoBio}`)
                // window.location.reload(); 
                console.log("value name",value)
                setSuccess(!success)
              }
              catch{
                console.log('Error loaidng rejected data');
              }
              }else if (value.bio.length > 0 && value.name.length == 0){
                try {
                await axios.put(`${process.env.ADDRESS_API}/account?id=${props.address}&username=${props.username}&info=${value.bio}`)
                setSuccess(true)
              }
              catch{
                console.log('Error loaidng rejected data');
              }
                // window.location.reload(); 
              } else {
                console.log("FAIL")
              }
              setloadingavatar(false)
              setLoading(!loading)
              setmodalOpenProfile(false)
            }
            console.log('value.name.length',value.name.length)
            console.log('value.bio.length',value.bio.length)
            console.log("props.address",props.address)
            return (
              <Form className="p-create_form">
                <Grid
                  // className="avatar-user"
                  container
                  spacing={3}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                 {previewSrc? (<div></div>):(<FileInput
                    name="file"
                    // label="PNG, GIF, WEBP, MP4 or MP3. Max 50mb. "
                    setTouched={() => !touched.file && setTouched({ ...touched, file: true })}
                  />)}
                  <img className={
                    previewSrc ? `ImgReview` : ``
                  } src={previewSrc}></img>
                  {/* <img className="ImgReview" src={previewSrc}></img> */}
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography align="center" >
                        <span className="font-bio">{t("Myitem.recommend")}</span>
                      </Typography>
                      <Typography align="center" >
                        <form className={classes1.root} noValidate autoComplete="off">
                          <TextField placeholder="enter your name"  inputProps={{min: 0, style: { textAlign: 'center' }}} onChange={handleChangeForm("name")} id="standard-basic" label={t("create.Name")} defaultValue={dataid} ></TextField>
                        </form>
                      </Typography>
                    </CardContent>
                  </Card>
                  <Typography align="center" >
                    <form className={classes1.root1} >
                      <TextField
                      name="name"
                      className={classes.textField}
                      placeholder="Tell us your detail"
                        id="outlined-multiline-static"
                        label={t("Myitem.Bio")}
                        multiline
                        rows={4}
                        onChange={handleChangeFormname("bio")}
                        // value={props.infoBio}
                        variant="outlined"
                        defaultValue={datauserinfo}
                        // onChange={e => setCount(e.target.value.length)}
                        inputProps={{ maxLength: 500 }}
                      ></TextField>
                    </form>
                    <span className="limitletter">{count}/500</span>
                    <Button onClick={() => {updateAvatar();setSuccess(!success)}}  className={classes1.buttonUp} color='pink' size='big'>{t("Myitem.Upload")}</Button>
                  </Typography>
                </Grid>

                {/* <button type="submit" onClick={() => updateAvatar()}>lelealalaflfl</button>
                <button type="submit" onClick={() => onClickBtn()}>test button</button> */}

              </Form>
            );
          }}
        </Formik>
        </>
                  )}
      </Modal>

      {/* ////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////// */}
      <Grid
        className="avatar-user"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <img className="avatar-display" src={datas ? datas : avatar}
        />
        {/* <img className='avatar-display' src={datas} onMouseOver={e => e.currentTarget.src = datas}
          onMouseOut={e => e.currentTarget.src = avatar}
        /> */}
        <Grid item xs={10} >

          <Card className={classes.root}>
            <CardContent >
              <Typography className={classes1.font_basic} align="center" variant="h5" >
                <span>{dataid}</span>
              </Typography>
              <Typography gutterBottom className={classes1.font_basic} align="center" >
                <span ref={ref} className="font-id" >{dataddress}</span>
                {/* <span ref={ref} defaultValue={id_number} className="hidden">{id_number}</span> */}
                <Button circular onClick={() => copy()} className="IconCopy" icon='copy outline'>
                </Button>
                {/* </div> */}
              </Typography>
              <Typography gutterBottom className={classes1.font} align="center" variant="h5" component="h2">
                <span >{datauserinfo}</span>
              </Typography>

              <Grid
                className="button-handle"
                container
                spacing={3}
                // direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid className="buttonedit" item xs={6} >
                  <button className="user-button" onClick={() =>{setSuccess(false); setmodalOpenProfile(true)}}>
                    {/* <Link href="/profile">My Item</Link> */}
                    <Icon className={classes1.font_basic} size='small' name='edit' /> {t("Myitem.Edit")}
                  </button>
                </Grid>
                <Grid className="buttonedit" item xs={6} >
                  <button className="user-button" onClick={() => setModalOpenShare(true)} >
                    <Icon className={classes1.font_basic} size='small' name='share' />  {t("Myitem.Share")}
                </button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </section>


  );
};

export default hot(Avatar);
