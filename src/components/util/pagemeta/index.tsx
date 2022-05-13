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
      <meta name="naver-site-verification" content="fff5aa1d2ca09aa8ce9da616973fc4ef96f97734" ></meta>
      <meta name="description" content="Coconut Global - The best global short video NFT Marketplace"></meta>
      <meta name="title" content="Coconut Global NFT Marketplace"></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:title" content="Coconut Global NFT Marketplace"></meta>
      <meta property="og:description" content="Coconut Global - The best global short video NFT Marketplace"></meta>
      <meta property="og:image" content="https://app.coconut.global/ccn_logoOF.png"></meta>
      <meta property="og:url" content="https://app.coconut.global"></meta>
    </Helmet>
  );
};
