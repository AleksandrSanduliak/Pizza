import cn from 'classnames';
import React from 'react';

import FooterWrapper from '@entities/card-item/ui/base-components/ui/FooterWrapper/FooterWrapper';
import Footer from '@widgets/footer/footer';

import cl from './CardItem.module.scss';
import CardImage from './ui/CardImage/CardImage';
import ImageWrapper from './ui/ImageWrapper/ImageWrapper';
import Text from './ui/Text/Text';

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
