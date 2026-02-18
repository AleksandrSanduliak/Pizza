import dynamic from 'next/dynamic';

import { cityInfo } from '@shared/consts/cityInfo';
import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';

const CardSections = dynamic(() => import('@widgets/card-sections/card-sections'), {
  loading: () => <FullScreenLoader />,
  ssr: true,
});

export default function MainPage() {
  return (
    <>
      <CardSections />
    </>
  );
}

MainPage.getStaticPaths = () => {
  return {
    paths: cityInfo,
    fallback: false,
  };
};
