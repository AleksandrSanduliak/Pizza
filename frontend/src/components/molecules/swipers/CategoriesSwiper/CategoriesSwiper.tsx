import Logo from 'atoms/logo/Logo';
import cn from 'classnames';
import SVG from 'react-inlinesvg';
import { NavHashLink } from 'react-router-hash-link';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { A11y, Scrollbar } from 'swiper/modules';
import { categories, categoriesType } from 'utils/data/categories';
import { useAppSelector } from 'utils/hooks/redux';
import useUserLocation from 'utils/hooks/useUserLocation';
import CustomSwiper from '../CustomSwiper/CustomSwiper';
import cl from './CategoriesSwiper.module.scss';

const сategoriesSwiperSettings = () => {
  return {
    slidesPerView: 'auto' as const,
    spaceBetween: 20,
    modules: [Scrollbar, A11y],
    scrollbar: { draggable: true },
    wrapperClass: cl.swiperWrapper,
    className: cn(cl.swiper),
  };
};

const CategoriesSlide = ({ item }: { item: categoriesType }) => {
  const { appHash } = useUserLocation();
  const colorActiveCategory = appHash === item.path;

  return (
    <NavHashLink
      smooth
      to={item.path}
      className={cn(cl.slideLink, { [cl.activelink]: colorActiveCategory })}>
      <SVG
        description={`Иконка категории ${item.name}`}
        onError={(error) => console.log(error.message)}
        title={item.path}
        src={`${item.img}`}
        className={cl.slideImage}
      />
      <p className={cn('bigtext', cl.slideText)}>{item.name}</p>
    </NavHashLink>
  );
};

const CategoriesSwiper = () => {
  const { isUrlMainPage } = useUserLocation();
  const visible = useAppSelector((store) => store.reducer.isVisible.isVisible);
  const categoriesSlicedLastElem = categories.slice(0, -1);

  const isHiddenNav = !visible;
  const swiperSettings = сategoriesSwiperSettings();
  return (
    <>
      {isUrlMainPage && (
        <section
          className={cn('categoriesSwiper__container', cl.swiperContainer)}>
          <div
            className={cn(cl.swiperInner, {
              'fixed-header': isHiddenNav,
            })}>
            {isHiddenNav && ( // доступен если произошел скролл ниже categoriesSwiper, без logoLetters
              <Logo
                logoType="fixedHeader"
                isHidden={true}
                targetToHidden="logoLetters"
              />
            )}
            <CustomSwiper<categoriesType>
              swiperSettings={swiperSettings}
              list={categoriesSlicedLastElem}
              Slide={CategoriesSlide}
              slideClass={cl.slide}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default CategoriesSwiper;
