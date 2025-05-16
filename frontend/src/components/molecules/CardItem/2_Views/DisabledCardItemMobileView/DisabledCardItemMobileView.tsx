import cn from 'classnames';

import CardItemCompound from 'molecules/CardItem/1_CompoundComponents/CardItemCompound';

import cmn from '../styles/Common.module.scss';
import cl from '../styles/Mobile.module.scss';

const DisabledCardItemMobileView = () => {
  return (
    <CardItemCompound className={cn(cl.itemMobile, cmn.disabled)}>
      <CardItemCompound.ImageWrapper>
        <CardItemCompound.Image />
      </CardItemCompound.ImageWrapper>
      <CardItemCompound.FooterWrapper>
        <CardItemCompound.Text />
      </CardItemCompound.FooterWrapper>
    </CardItemCompound>
  );
};

export default DisabledCardItemMobileView;
