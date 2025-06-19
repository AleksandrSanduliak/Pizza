import React from 'react';

import cn from 'classnames';

import Footer from 'organisms/Footer/Footer';

import cl from './CardItem.module.scss';
import CardImage from './Components/CardImage/CardImage';
import FooterWrapper from './Components/FooterWrapper/FooterWrapper';
import ImageWrapper from './Components/ImageWrapper/ImageWrapper';
import Text from './Components/Text/Text';

const CardItemCompound = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={() => {
        if (!onClick) return;
        onClick();
      }}
      className={cn(cl.item, className)}>
      {children}
    </div>
  );
};

CardItemCompound.Text = Text;
CardItemCompound.Image = CardImage;
CardItemCompound.ImageWrapper = ImageWrapper;
CardItemCompound.Footer = Footer;
CardItemCompound.FooterWrapper = FooterWrapper;

export default CardItemCompound;
