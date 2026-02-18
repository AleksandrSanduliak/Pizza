import cn from 'classnames';

import CardItemCompound from '@entities/card-item/ui/base-components/CardItemCompound';

import cmn from '../styles/Common.module.scss';
import cl from '../styles/Desktop.module.scss';

const DisabledCardItemDesktopView = () => {
  return (
    <CardItemCompound className={cn(cl.itemDesktop, cmn.disabled)}>
      <CardItemCompound.ImageWrapper>
        <CardItemCompound.Image />
      </CardItemCompound.ImageWrapper>
      <CardItemCompound.FooterWrapper>
        <CardItemCompound.Text />
      </CardItemCompound.FooterWrapper>
    </CardItemCompound>
  );
};

export default DisabledCardItemDesktopView;
