import DisabledCardItemDesktopView from 'molecules/CardItem/2_Views/DisabledCardItemDesktopView/DisabledCardItemDestopView';
import DisabledCardItemMobileView from 'molecules/CardItem/2_Views/DisabledCardItemMobileView/DisabledCardItemMobileView';
import useMediaQuery from 'utils/hooks/ui/useMediaQuery';

const DisabledCard = () => {
  const isMobile = useMediaQuery();

  return isMobile ? <DisabledCardItemMobileView /> : <DisabledCardItemDesktopView />;
};

export default DisabledCard;
