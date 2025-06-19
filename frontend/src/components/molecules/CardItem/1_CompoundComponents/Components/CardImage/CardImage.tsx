import Image from 'next/image';

import cl from './CardImage.module.scss';
import { useCardContext } from '../../../CompoundItemContext';

const CardImage = () => {
  const { foodItem } = useCardContext();
  // <Image
  //   src={foodItem?.imageUrl}
  //   loader={() => foodItem?.imageUrl}
  //   alt={foodItem?.title}
  //   loading="lazy"
  //   className={cl.img}
  //   width="100"
  //   height="100"
  // />;
  return <img src={foodItem?.imageUrl} alt={foodItem?.title} loading="lazy" className={cl.img} />;
};

export default CardImage;
