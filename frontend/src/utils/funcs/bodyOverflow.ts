const scrollDiv = document.createElement("div");
scrollDiv.style.cssText =
  "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
document.body.appendChild(scrollDiv);
const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
document.body.removeChild(scrollDiv);

export const addOverflowBody = () => {
  document.body.style.overflowY = "hidden";
  document.body.style.overscrollBehavior = "contain";
  document.body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
};

export const removeOverflowBody = () => {
  document.body.style.overflowY = "";
  document.body.style.overscrollBehavior = "";
  document.body.style.setProperty("--scrollbar-width", ``);
};
