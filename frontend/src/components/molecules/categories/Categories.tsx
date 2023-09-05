import React from "react";
import cl from "./cartCategory.module.scss";
import stock from "../../../assets/icons/categories/stock.svg";
import { HashLink } from "react-router-hash-link";
import { categories } from "../../../utils/data/categories";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";
const Categories = () => {
  // const lastElem = React.useRef();
  // const observ = React.useRef();
  // console.log(lastElem, "lastelem");
  // console.log("categories render");
  // React.useEffect(() => {
  //   let options = {
  //     root: document,
  //     rootMargin: "0px",
  //     threshold: 1.0,
  //   };
  //   const callback = (entries, observ) => {
  //     if (entries[0].isIntresting) {
  //       console.log("элемент в зоне видимости");
  //     }
  //     console.log("123");
  //   };
  //   observ.current = new IntersectionObserver(callback, options);
  //   observ.current.observe(lastElem.current);
  // }, []);

  return (
    <section>
      <div className="categories__container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;

// {
//   categories.map((category) => {
//     return (
//       <li key={category.name}>
//         <SwiperSlide key={category.name}>
//           <HashLink
//             className={cl.cartCategory}
//             smooth
//             // activeStyle={{ color: "red"
//             to={`/#${category.path}`}
//           >
//             <img src={stock} alt="Иконка категории" />
//             <p>{category.name}</p>
//           </HashLink>
//         </SwiperSlide>
//       </li>
//     );
//   });
// }
