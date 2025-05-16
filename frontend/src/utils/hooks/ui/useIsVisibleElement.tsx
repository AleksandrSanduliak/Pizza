import { RefObject, useEffect, useState } from 'react';
type IUseCheckVisibleArgs = {
  ref: RefObject<HTMLElement | null>;
  rootMargin?: string;
  cb?: (status: boolean) => void;
};

type IUseCheckVisible = (
  args: IUseCheckVisibleArgs,
) => [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const useIsVisibleElement: IUseCheckVisible = ({ ref, cb, rootMargin = '0px' }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const currentRef = ref?.current;
    console.log('isVisible', isVisible);
    if (!currentRef) return;

    console.log('work');
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = !entry.isIntersecting;
        setIsVisible(isVisible);

        if (cb) cb(isVisible);
      },
      { rootMargin },
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [cb, isVisible, ref, rootMargin]);

  return [isVisible, setIsVisible];
};

export default useIsVisibleElement;
