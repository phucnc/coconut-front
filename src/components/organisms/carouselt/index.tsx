import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import ReactModal from 'react-modal';
import Grid from '@material-ui/core/Grid';
import { Text } from 'components/atoms/text';
import { Button } from 'components/atoms/button';
import { useSnackbar } from 'notistack';
import { Link } from 'gatsby';
import setup_1 from 'assets/images/ccn_banner1.png';
import setup_2 from 'assets/images/ccn_banner2.png';
import setup_3 from 'assets/images/ccn_banner3.png';
// import setup_4 from 'assets/images/ccn_banner2.png';
import Carousel from 'react-material-ui-carousel'
type Modifier = 'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';

interface Props {
  link?:string;
}

var items = [
  {
      src: setup_1
  },
  {
      src: setup_2
  },
  {
    src: setup_3
},
// {
//   name: "Random Name #1",
//   description: "Probably the most random thing you have ever seen!",
//   src: setup_4
// },
]
export const Carouselt: React.FC<Props> = props => {
  // const [modalOpenShare, setModalOpenShare] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  return (
    <div className="carousel_containt">
      <Link to="/notice">
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
        items.map( (item, i) => 
       
        <img key={i} src={item.src} />
       
         )
    }
</Carousel>
</Link>
</div>
      // </Modal>
  
  ) 
};

export default hot(Carouselt);
