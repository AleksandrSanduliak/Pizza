import DisabledCardItemDesktopView from '@entities/card-item/ui/views/CardItemDesktopView/CardItemDesktopView';
import DisabledCardItemMobileView from '@entities/card-item/ui/views/DisabledCardItemMobileView/DisabledCardItemMobileView';
import useMediaQuery from '@shared/hooks/ui/useMediaQuery';

const DisabledCard = () => {
  const isMobile = useMediaQuery();

  return isMobile ? <DisabledCardItemMobileView /> : <DisabledCardItemDesktopView />;
};

export default DisabledCard;
