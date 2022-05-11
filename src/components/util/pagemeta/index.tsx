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
      {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}
    </Helmet>
  );
};
