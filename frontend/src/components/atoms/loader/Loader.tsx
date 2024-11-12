import cl from './loader.module.scss';

type TLoaderVariants = {
  type?: 'absolute' | 'static';
};

const LoaderVariants = {
  absolute: cl.loader_absolute,
  static: cl.loader_static,
};

const Loader = (type = 'static'): { type: TLoaderVariants } => {
  return (
    <div
      className={`${cl.loader} ${
        LoaderVariants[type as keyof typeof LoaderVariants]
      }`}
    />
  );
};

export default Loader;
