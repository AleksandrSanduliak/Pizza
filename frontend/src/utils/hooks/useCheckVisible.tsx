import { RefObject, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAccount from './useAccount';
import useMediaQuery from './useMediaQuery';
export default function useCheckVisible(
  ref?: RefObject<HTMLElement>,
  rootMargin = '0px',
) {
  const loc = useLocation();
  const { isBurgerClick } = useAccount();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobile] = useMediaQuery();

  // console.log('loc', loc);
  useEffect(() => {
    if (loc.pathname !== '/') {
      setIsVisible((prev) => (prev = true));
      // console.log('hook', isVisible);
      return;
    }
    if (isMobile && isBurgerClick) return;
    if (ref?.current == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry.isIntersecting);
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin },
    );
    observer.observe(ref.current);

    return () => {
      if (ref.current == null) return;

      observer.unobserve(ref?.current);
    };
  }, [rootMargin, isBurgerClick, ref, isMobile, loc.pathname, isVisible]);

  return [isVisible, setIsVisible];
}
