// import React from 'react';
// import { hot } from 'react-hot-loader/root';
// import { mapModifiers } from 'lib/component';
// import ReactModal from 'react-modal';
// import { Modal } from 'components/organisms/modal';
// type Modifier = 'price'|'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';
// import { Section } from 'components/organisms/section';

// interface Props {
//   modifiers?: Modifier | Modifier[];
//   isOpen: boolean;
//   handleClose: () => void;
// }
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     padding: '0',
//     background: 'transparent',
//     border: 0,
//   },
// };

// export const ModalUser: React.FC<Props> = props => {
//   return props.isOpen ? (
//     <Modal isOpen={modalOpen} handleClose={() => setModalOpen(false)}>
//         <ModalHeader title="Upload cover photo" handleClose={() => setModalOpen(false)} />
//         <Grid
//           // className="avatar-user"
//           container
//           spacing={0}
//           direction="column"
//           alignItems="center"
//           justify="center"
//         >
//           {/* <Box display="flex" justifyContent="center">
//           <Box borderColor="primary.main" {...defaultProps} />
//         </Box> */}
//           <Button  {...defaultProps1} display="flex" justifyContent="center" ></Button>
//           <Grid item xs={8} >
//           </Grid>
//         </Grid>
//         <Typography align="center" >
//           <form className={classes1.root1} >
//             <span className="font-bio">Upload new cover for your profile page. We recommend to upload images in 1440x260 resolution</span>
//           </form>
//         </Typography>
//         <Typography align="center" >
//           <Button className={classes1.buttonUp} color='pink' size='big'>Upload</Button>
//         </Typography>
//       </Modal>
//   ) : null;
// };

// export default hot(ModalUser);
