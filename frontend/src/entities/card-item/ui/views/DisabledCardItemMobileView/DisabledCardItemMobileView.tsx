import cn from 'classnames';

import CardItemCompound from '@entities/card-item/ui/base-components/CardItemCompound';

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
