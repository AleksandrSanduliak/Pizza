import Image from 'next/image';

import { useCardContext } from '../../../../model/context';

import styles from './CardImage.module.scss';

const CardImage = () => {
  const { product } = useCardContext();

  return (
    <Image
      src={product?.imageUrl}
      loader={() => product?.imageUrl}
      alt={product?.title}
      loading="lazy"
      width="250"
      height="250"
      className={styles.img}
    />
  );
};

export default CardImage;
