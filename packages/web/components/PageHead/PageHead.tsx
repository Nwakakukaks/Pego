import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

interface PageHeadProps {
  title?: string;
}

const PageHead = ({ title }: PageHeadProps) => (
  <Head>
    <title>{title ?? 'Zhelp - Blockchain Smart Contracts Manager'}</title>
    <link rel="icon" href="/favicon.ico" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossOrigin="anonymous"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito&family=Poppins&family=Roboto&display=swap"
      rel="stylesheet"
    ></link>
  </Head>
);

export default PageHead;
