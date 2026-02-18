import styles from './ImageWrapper.module.scss';

interface IImageWrapper {
  children: React.ReactNode;
}
const ImageWrapper = ({ children }: IImageWrapper) => {
  return <div className={styles.imgWrapper}>{children}</div>;
};

export default ImageWrapper;
