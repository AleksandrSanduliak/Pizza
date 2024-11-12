export const stopBubling = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => {
  e.stopPropagation();
};
