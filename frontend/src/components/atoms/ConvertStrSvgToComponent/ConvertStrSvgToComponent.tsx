interface IConvertStrSvg {
  strSvg: string;
}

interface IProps {
  alt: string;
  width: number;
  height: number;
  className: string;
  draggable: boolean;
}

const ConvertStrSvgToComponent: React.FC<IProps & IConvertStrSvg> = ({ strSvg, ...props }) => {
  return <img {...props} src={`data:image/svg+xml;utf8,${encodeURIComponent(`${strSvg}`)}`} />;
};

export default ConvertStrSvgToComponent;
