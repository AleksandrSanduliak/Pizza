import cn from 'classnames';

import CardItemCompound from 'molecules/CardItem/1_CompoundComponents/CardItemCompound';

import { ICardView } from '../CardView';
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
