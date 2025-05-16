import cn from 'classnames';

import CardItemCompound from '../../1_CompoundComponents/CardItemCompound';
import { ICardView } from '../CardView';
import cl from '../styles/Mobile.module.scss';

const CardItemMobileView = ({ headerSlot, footerSlot, className, onClick }: Partial<ICardView>) => {
  return (
    <CardItemCompound onClick={onClick} className={cn(cl.itemMobile, className)}>
      {headerSlot}
      <CardItemCompound.ImageWrapper>
        <CardItemCompound.Image />
      </CardItemCompound.ImageWrapper>
      <CardItemCompound.FooterWrapper>
        <CardItemCompound.Text />
        {footerSlot}
      </CardItemCompound.FooterWrapper>
    </CardItemCompound>
  );
};

export default CardItemMobileView;
