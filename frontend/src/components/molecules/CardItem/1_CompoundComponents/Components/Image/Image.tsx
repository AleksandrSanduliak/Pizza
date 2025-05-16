import cl from './Image.module.scss';
import { useCardContext } from '../../../CompoundItemContext';

const Image = () => {
  const { foodItem } = useCardContext();

  return <img src={foodItem?.imageUrl} alt={foodItem?.title} loading="lazy" className={cl.img} />;
};

export default Image;
