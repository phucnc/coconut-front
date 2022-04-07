import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import { Spinner } from 'components/atoms/spinner';
import logo from 'assets/images/ccn_logoOF.png';
import setup_1 from 'assets/images/logo/logo1.png';
import setup_2 from 'assets/images/logo/logo2.png';
import setup_3 from 'assets/images/logo/logo3.png';
import setup_4 from 'assets/images/logo/logo4.png';
import setup_5 from 'assets/images/logo/logo5.png';
import setup_6 from 'assets/images/logo/logo6.png';
import setup_7 from 'assets/images/logo/logo7.png';
import setup_8 from 'assets/images/logo/logo8.png';
import setup_9 from 'assets/images/logo/logo9.png';
import setup_10 from 'assets/images/logo/logo10.png';
import setup_11 from 'assets/images/logo/logo11.png';
import setup_12 from 'assets/images/logo/logo12.png';
import setup_13 from 'assets/images/logo/logo13.png';
import setup_14 from 'assets/images/logo/logo14.png';
import setup_15 from 'assets/images/logo/logo15.png';
import setup_16 from 'assets/images/logo/logo16.png';
import setup_17 from 'assets/images/logo/logo17.png';
import setup_18 from 'assets/images/logo/logo18.png';
import setup_19 from 'assets/images/logo/logo19.png';
import setup_20 from 'assets/images/logo/logo20.png';
type Modifier = 'small' | 'big';


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
  {
    src: setup_4
  },
  {
    src: setup_5
  },{
    src: setup_6
  },
  {
    src: setup_7
  },
  {
    src: setup_8
  },
  {
    src: setup_9
  },
  {
    src: setup_10
  },
  {
    src: setup_11
  },
  {
    src: setup_12
  },
  {
    src: setup_13
  },
  {
    src: setup_14
  },
  {
    src: setup_15
  },
  {
    src: setup_16
  },
  {
    src: setup_17
  },
  {
    src: setup_18
  },
  {
    src: setup_19
  },
  {
    src: setup_20
  },
]
export interface ImageProps {
  modifiers?: Modifier | Modifier[];
  src: string;
  alt?: string;
  // spinner: {};
}

export const Image: React.FC<ImageProps> = props => {
  const [isLoading, setIsLoading] = useState(true);
  const item = items[Math.floor(Math.random()*items.length)];
  useEffect(() => {
    const item = items[Math.floor(Math.random()*items.length)];
    console.log("item",item)
    const img = new window.Image();
    img.src = props.src;
    const onLoad = () => {
      setIsLoading(false);
    };
    img.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={mapModifiers('a-image', props.modifiers)}>
      {!isLoading ? <img src={props.src} loading="lazy" alt={props.alt} /> : <img src={item.src} loading="lazy" alt={props.alt} />}
      {/* {!isLoading ? <img src={props.src} loading="lazy" alt={props.alt} /> : <Spinner />} */}
    </div>
  );
};

export default hot(Image);
