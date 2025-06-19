'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import FullScreenLoader from 'atoms/Loaders/FullScreenLoader/FullScreenLoader';
import { cityInfo } from 'utils/consts/cityInfo';

import useAppLogic from './appLogic/useAppLogic';

const CardBlock = dynamic(() => import('organisms/CardBlock/CardBlock'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});

export default function MainPage() {
  useAppLogic();
  return (
    <>
      <CardBlock />
    </>
  );
}

MainPage.getStaticPaths = () => {
  return {
    paths: cityInfo,
    fallback: false,
  };
};
