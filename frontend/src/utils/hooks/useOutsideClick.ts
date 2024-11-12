import React, { RefObject } from 'react';
import { useEffect, useRef } from 'react';

// export const useOutsideClick = (callback: () => void) => {
//   // const ref = useRef<HTMLDivElement>(null);

//   // useEffect(() => {
//   //   const handleClickOutside = (event: MouseEvent | TouchEvent) => {
//   //     if (ref.current && !ref.current.contains(event.target as Node)) {
//   //       callback();
//   //     }
//   //   };

//   //   document.addEventListener("mouseup", handleClickOutside);
//   //   document.addEventListener("touchend", handleClickOutside);

//   //   return () => {
//   //     document.removeEventListener("mouseup", handleClickOutside);
//   //     document.removeEventListener("touchend", handleClickOutside);
//   //   };
//   // }, [callback]);

//   // return ref;

// };

// export const useOutsideClick = (initialValue: boolean) => {
//   const [isActive, setIsActive] = React.useState(initialValue);
//   const ref = useRef(null);

//   const handleClick = (e) => {
//     if (ref.current && !ref.current?.contains(e?.target)) {
//       setIsActive(!isActive);
//     }
//   };
//   console.log('click');
//   useEffect(() => {
//     document.addEventListener('click', handleClick);
//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   });

//   return { ref, isActive, setIsActive };
// };

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handleOnClickOutside(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handleOnClickOutside]);
};
