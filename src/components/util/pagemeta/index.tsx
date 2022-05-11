import React from 'react';
import { Helmet } from 'react-helmet';
import logo from 'assets/images/ccn_logoOF.png';
interface Props {
  title: string;
}

export const Pagemeta: React.FC<Props> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon"  href={logo} sizes="16x16" />
      <meta name="naver-site-verification" content="fff5aa1d2ca09aa8ce9da616973fc4ef96f97734"></meta>
    </Helmet>
  );
};
