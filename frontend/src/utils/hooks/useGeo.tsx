// import React from "react";
// import ReactDOM from "react-dom";
// import { getCookie } from "utils/funcs/cookie";
// // const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify");
// type TGeo = {
//   coords: {
//     latitude: number;
//     longitude: number;
//   };
// };

// const useGeo = () => {
//   const userCity = getCookie("location");
//   console.log("usercity", userCity);
//   // const { ymaps3 } = ymaps3Reactify;
//   const [position, setPosition] = React.useState({});
//   const [error, setError] = React.useState<null | string>(null);

//   const onError = (error: { message: string }) => {
//     setError(error.message);
//   };
//   // const maps = async () => {
//   //   ymaps3
//   //     .search({
//   //       text: [position.longitude, position.latitude],
//   //     })
//   //     .then((suggest) => {
//   //       console.log("sug", suggest);
//   //     });
//   // };
//   // maps();
//   // ymaps.ready(init);
//   // var myGeocoder = ymaps.geocode("Moscow");
//   // myGeocoder.then(
//   //   function (res) {
//   //     map.geoObjects.add(res.geoObjects);
//   //     // Выведем в консоль данные, полученные в результате геокодирования объекта.
//   //     console.log(
//   //       res.geoObjects.get(0).properties.get("metaDataProperty").getAll()
//   //     );
//   //   },
//   //   function (err) {
//   //     // Обработка ошибки.
//   //   }
//   // );

//   // const fn = async () => {
//   //   const data = await fetch(
//   //     `https://geocode-maps.yandex.ru/1.x/?apikey=ca13e5b7-6cd4-430e-9943-3a37419ee06e&geocode=${position.longitude},${position.latitude}&kind=locality&format=json`
//   //   );
//   //   let json = await data.json();
//   //   console.log(json);
//   // };
//   // fn();

//   const onChange = (pos: TGeo) => {
//     const latitude = pos?.coords?.latitude;
//     const longitude = pos?.coords?.longitude;

//     setPosition({ latitude, longitude });
//   };

//   React.useLayoutEffect(() => {
//     const geo = navigator.geolocation;

//     if (!geo) {
//       return setError("Геопозиция не поддерживается");
//     }

//     const watcher = geo.watchPosition(onChange, onError);

//     return () => geo.clearWatch(watcher);
//   }, []);
//   return { position, error };
// };

// export default useGeo;
