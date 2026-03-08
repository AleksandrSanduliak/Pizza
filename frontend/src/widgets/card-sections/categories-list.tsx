'use client';
import React from 'react';

import withHandleVisibility from '@shared/hoc/withHandleVisibility';
import HeaderNavigation from '@widgets/card-sections/header-navigation/header-navigation';

const EnchantedHeaderNavigation = withHandleVisibility(HeaderNavigation);
const CategoriesList = ({ data }) => {
  return <EnchantedHeaderNavigation data={data} />;
};

export default CategoriesList;
