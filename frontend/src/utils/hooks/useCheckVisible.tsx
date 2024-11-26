import { RefObject, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { visibleStatus } from 'store/slices/categoriesSlice';
import useAccount from './useAccount';
import useMediaQuery from './useMediaQuery';
import useUserLocation from './useUserLocation';

export default function useCheckVisible(
  ref?: RefObject<HTMLElement>,
  rootMargin = '0px',
) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery();
  const { isBurgerClick } = useAccount();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isUrlMainPage } = useUserLocation();

  useEffect(() => {
    if (ref?.current == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('visible1', entry.isIntersecting);
        setIsVisible(entry.isIntersecting);
        dispatch(visibleStatus(isVisible));
      },
      { rootMargin },
    );
    observer.observe(ref.current);

    return () => {
      if (ref.current == null) return;

      observer.unobserve(ref?.current);
    };
  }, [dispatch, isVisible, ref, rootMargin]);

  return [isVisible, setIsVisible];
}
