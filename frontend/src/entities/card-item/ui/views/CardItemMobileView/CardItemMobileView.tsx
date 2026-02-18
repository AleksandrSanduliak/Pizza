import cn from 'classnames';

import { ICardView } from '../../../model/CardView';
import CardItemCompound from '../../base-components/CardItemCompound';
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
