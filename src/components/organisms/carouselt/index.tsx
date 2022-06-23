import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import ReactModal from 'react-modal';
import Grid from '@material-ui/core/Grid';
import { Text } from 'components/atoms/text';
import { Button } from 'components/atoms/button';
import { useSnackbar } from 'notistack';
import { Link } from 'gatsby';
import axios from 'axios';
// import setup_4 from 'assets/images/ccn_banner2.png';
import Carousel from 'react-material-ui-carousel'
type Modifier = 'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';

interface Props {
  link?:string;
}



export const Carouselt: React.FC<Props> = props => {
  // const [modalOpenShare, setModalOpenShare] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [reg, regSet] = useState(Array);
  const getBanner = async () =>{
    try{
      const listevent = await axios.get (`https://api.coconut.global/banner/paging?status=0&limit=99&offset=0`);
      const ListBanner = listevent.data.banners;
      console.log("listEvent",ListBanner)
      regSet(ListBanner);
      }catch {
        console.log("error get Banner")
      }
  }


  useEffect (()=> {
    getBanner()
  },[]);
  return (
    <div className="carousel_containt">
    
    <Carousel
     className="carousel"
     indicators= {true}
     activeIndicatorIconButtonProps={{
      style: {
          color: 'gray',
          fontSize:'10px' // 2
      }
  }}
     indicatorIconButtonProps={{
      style: {
          position:'relative',
          // bottom: '20px!important',    // 1
          color: 'white'     ,  // 3,
          fontSize: "10px",

      }
      
  }}
    //  autoPlay={true}
    >
    {
        reg?.map( (item, i) => 
        <Link to={item.link}>
        <img key={i} src={item.picture} />
        </Link>
         )
    }
</Carousel>
{/* </Link> */}
</div>
      // </Modal>
  
  ) 
};

export default hot(Carouselt);
