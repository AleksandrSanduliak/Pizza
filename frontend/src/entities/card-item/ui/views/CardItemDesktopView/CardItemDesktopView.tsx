import cn from 'classnames';

import CardItemCompound from '@entities/card-item/ui/base-components/CardItemCompound';

import { ICardView } from '../../../model/CardView';
import cl from '../styles/Desktop.module.scss';

const DisabledCardItemDesktopView = ({
  headerSlot,
  footerSlot,
  className,
  onClick,
}: Partial<ICardView>) => {
  return (
    <CardItemCompound onClick={onClick} className={cn(cl.itemDesktop, className)}>
      {headerSlot}
      <CardItemCompound.ImageWrapper>
        <CardItemCompound.Image />
        <CardItemCompound.Text />
      </CardItemCompound.ImageWrapper>
      <CardItemCompound.FooterWrapper>{footerSlot}</CardItemCompound.FooterWrapper>
    </CardItemCompound>
  );
};

export default DisabledCardItemDesktopView;
