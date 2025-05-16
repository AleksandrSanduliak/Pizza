import cl from './ImageWrapper.module.scss';

interface IImageWrapper {
  children: React.ReactNode;
}
const ImageWrapper = ({ children }: IImageWrapper) => {
  return <div className={cl.imgWrapper}>{children}</div>;
};

export default ImageWrapper;
