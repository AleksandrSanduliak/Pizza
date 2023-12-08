import React from "react";

const useMediaQuery = () => {
  const matchMedia = window.matchMedia("(max-width: 768px)");
  const [isMobile, setIsMobile] = React.useState<boolean>(matchMedia.matches);
  React.useLayoutEffect(() => {
    const handler = () => setIsMobile(matchMedia.matches);
    console.log(matchMedia.matches);
    matchMedia.addEventListener("change", handler);
    return () => matchMedia.removeEventListener("change", handler);
  });
  return [isMobile];
};

export default useMediaQuery;
