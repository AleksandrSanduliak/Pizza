import React from "react";

const useMediaQuery = () => {
  const matchMedia = window.matchMedia("(max-width: 768px)");
  const [isMobile, setIsMobile] = React.useState<undefined | boolean>(
    matchMedia.matches
  );
  const onChange = React.useCallback(() => {
    setIsMobile(matchMedia.matches);
  }, [matchMedia]);
  React.useEffect(() => {
    matchMedia.addEventListener("change", onChange);
    return () => matchMedia.removeEventListener("change", onChange);
  }, [matchMedia, onChange]);
  return [isMobile];
};

export default useMediaQuery;
