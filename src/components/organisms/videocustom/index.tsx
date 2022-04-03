import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import PropTypes from "prop-types";
import { hot } from 'react-hot-loader/root';
import { useDispatch, useSelector } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from 'components/atoms/button';
import IconButton from "@material-ui/core/IconButton";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import { resetStore } from 'store/createNFT';
import Grid from "@material-ui/core/Grid";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import { Icon } from 'components/atoms/icon';
import logo from 'assets/images/censored.png';
import { Modalcensored } from 'components/organisms/modalcensored';
import { Modal } from 'components/organisms/modal';
import { ModalHeader } from 'components/molecules/modalHeader';
import { videoMute,videoUnmute } from 'store/buyNFT';
import { commonStart } from 'store/common';


const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    // visibility: "visible",
    position: "absolute",
    // top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // height: "30px",
    // background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    '&:hover': {
      visibility: "visible",
   },
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    // "&:hover": {
    //   color: "#fff",
    // },
  },
  bottomIconsRight: {
    color: "white!important",
    marginLeft:"200px",
    marginBottom:"50px",
    // "&:hover": {
    //   color: "#fff",
    // },
  },
  bottomIconsRightCensored: {
    color: "white!important",
    marginLeft:"80px",
    // "&:hover": {
    //   color: "#fff",
    // },
  },

  volumeSlider: {
    width: 100,
  },
}));

// Controls.propTypes = {
//   onPlayPause: PropTypes.func,
//   onMute: PropTypes.func,
//   playing: PropTypes.bool,
//   played: PropTypes.number,
//   muted: PropTypes.bool,
// };
interface Props {
  onPlayPause: any,
  onMute: any,
  ref:any;
  playing: any,
  played: any,
  muted: any,
  volume: any,
  visible?: boolean,
  status?:any,
}

export const Controls: React.FC<Props> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalOpenCensored, setModalOpenCensored] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    useEffect(() => {
      if (!modalOpenCensored) {
        dispatch(resetStore());
        // currentStep.number === CreateSteps.length && navigate('/');
      }
  
    }, [dispatch, modalOpenCensored]);
  return(
       <div ref={props.ref} className={classes.controlsWrapper}>
        <Grid
          container
          direction="column"
          justify="space-between"
          style={{ flexGrow: 1 }}
        >
          {/* bottom controls */}
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ padding: 16 }}
          >

            <Grid item> 
              { props.status == "1"? (
                 <Grid container alignItems="center">
          
                 <div
                   className={classes.bottomIcons}
                 >
                   <Button modifiers="transparent" handleClick={() => setModalOpenCensored(true)}>
                    <img height="30px" width="140px" src={logo} loading="lazy" />
                   </Button>
                 </div>
              { !props.muted ? (
                 <IconButton
                 style={{visibility:'visible'}}
                   // onClick={() => setState({ ...state, muted: !state.muted })}
                   onClick={() => {dispatch(commonStart({ nextAction: videoMute() }))}}
                  //  onClick={props.onMute}
                   className={`${classes.bottomIconsRightCensored}`}
                 >
                   {props.muted ? (
                     <VolumeMute fontSize="large" />
                   ) : props.volume > 0.5 ? (
                     <VolumeUp fontSize="large" />
                   ) : (
                     <VolumeDown fontSize="large" />
                   )}
                 </IconButton>
              ) : (
                 <IconButton
                 style={{visibility:'visible'}}
                   // onClick={() => setState({ ...state, muted: !state.muted })}
                   onClick={() => {dispatch(commonStart({ nextAction: videoUnmute() }))}}
                  //  onClick={props.onMute}
                   className={`${classes.bottomIconsRightCensored}`}
                 >
                   {props.muted ? (
                     <VolumeMute fontSize="large" />
                   ) : props.volume > 0.5 ? (
                     <VolumeUp fontSize="large" />
                   ) : (
                     <VolumeDown fontSize="large" />
                   )}
                 </IconButton>
              )}
               </Grid>
              ): (
              <Grid container alignItems="center">
          
                {/* <div
                  className={classes.bottomIcons}
                >
                  <img height="30px" width="140px" src={logo} loading="lazy" />
                </div> */}
                {/* <IconButton
                style={{visibility:'visible'}}
                  // onClick={() => setState({ ...state, muted: !state.muted })}
                  onClick={props.onMute}
                  className={`${classes.bottomIconsRight}`}
                >
                  {props.muted ? (
                    <VolumeMute fontSize="large" />
                  ) : props.volume > 0.5 ? (
                    <VolumeUp fontSize="large" />
                  ) : (
                    <VolumeDown fontSize="large" />
                  )}
                </IconButton> */}
                { !props.muted ? (
                 <IconButton
                 style={{visibility:'visible'}}
                   // onClick={() => setState({ ...state, muted: !state.muted })}
                   onClick={() => {dispatch(commonStart({ nextAction: videoMute() }))}}
                  //  onClick={props.onMute}
                   className={`${classes.bottomIconsRight}`}
                 >
                   {props.muted ? (
                     <VolumeMute fontSize="large" />
                   ) : props.volume > 0.5 ? (
                     <VolumeUp fontSize="large" />
                   ) : (
                     <VolumeDown fontSize="large" />
                   )}
                 </IconButton>
              ) : (
                 <IconButton
                 style={{visibility:'visible'}}
                   // onClick={() => setState({ ...state, muted: !state.muted })}
                   onClick={() => {dispatch(commonStart({ nextAction: videoUnmute() }))}}
                  //  onClick={props.onMute}
                   className={`${classes.bottomIconsRight}`}
                 >
                   {props.muted ? (
                     <VolumeMute fontSize="large" />
                   ) : props.volume > 0.5 ? (
                     <VolumeUp fontSize="large" />
                   ) : (
                     <VolumeDown fontSize="large" />
                   )}
                 </IconButton>
              )}
              </Grid>
              )}
            </Grid>

            
          </Grid>
        </Grid>
        <Modal modifiers="claim" isOpen={modalOpenCensored} handleClose={() => setModalOpenCensored(false)}>
        <ModalHeader title="" handleClose={() => setModalOpenCensored(false)} />
        <Modalcensored />
      </Modal>
      </div>
  );
};
// const Controls = forwardRef(({
//       onPlayPause,
//       playing,
//       played,
//       onMute,
//       muted,
//       volume,
//     },
//     ref
//   ) => {
//     const classes = useStyles();
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const handleClick = (event) => {
//       setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//       setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? "simple-popover" : undefined;

//     return (
//       <div ref={ref} className={classes.controlsWrapper}>
//         <Grid
//           container
//           direction="column"
//           justify="space-between"
//           style={{ flexGrow: 1 }}
//         >
//           {/* bottom controls */}
//           <Grid
//             container
//             direction="row"
//             justify="space-between"
//             alignItems="center"
//             style={{ padding: 16 }}
//           >

//             <Grid item>
//               <Grid container alignItems="center">
//                 <IconButton
//                   onClick={onPlayPause}
//                   className={classes.bottomIcons}
//                 >
//                   {playing ? (
//                     <PauseIcon fontSize="large" />
//                   ) : (
//                     <PlayArrowIcon fontSize="large" />
//                   )}
//                 </IconButton>

//                 <IconButton
//                   // onClick={() => setState({ ...state, muted: !state.muted })}
//                   onClick={onMute}
//                   className={`${classes.bottomIcons} ${classes.volumeButton}`}
//                 >
//                   {muted ? (
//                     <VolumeMute fontSize="large" />
//                   ) : volume > 0.5 ? (
//                     <VolumeUp fontSize="large" />
//                   ) : (
//                     <VolumeDown fontSize="large" />
//                   )}
//                 </IconButton>
//               </Grid>
//             </Grid>

            
//           </Grid>
//         </Grid>
//       </div>
//     );
//   }
// );


// export default Controls;
export default hot(Controls);
