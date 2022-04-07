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
      {!isLoading ? <img src={props.src} loading="lazy" alt={props.alt} /> : <img src={logo} loading="lazy" alt={props.alt} />}
      {/* {!isLoading ? <img src={props.src} loading="lazy" alt={props.alt} /> : <Spinner />} */}
    </div>
  );
};

export default hot(Image);
