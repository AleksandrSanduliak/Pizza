// import React from 'react';

// import NotificationFacade from 'utils/funcs/facades/NotificationFacade';

// type TAddToCartOptions<T, R> = {
//   guestAddItemMethod: (foodItem: T) => void;
//   authUserAddItemMethod: R;
//   notifications: () => void;
//   isAuth: boolean;
// };

// const addItemDTO = (foodItem: T) => {
//   return {
//     id: foodItem.id,
//     category: foodItem.category,
//     desc: foodItem.desc,
//     title: foodItem.title,
//     sizes: foodItem?.sizes && foodItem.sizes[1],
//     // types: pizzaTypes?.[foodItem.types?.[0]] ?? null
//     price: foodItem?.price[1] ?? foodItem?.price[0],
//     imageUrl: foodItem.imageUrl,
//     nutrition_facts: {
//       // ...foodItem.nutrition_facts,
//       // weight: foodItem?.weightTypes?.[foodItem.types?.[0]]?.[foodItem.sizes?.[1]],
//     },
//   };
// };

// const useAddToCard = <T, R>({
//   guestAddItemMethod,
//   authUserAddItemMethod,
//   notifications,
//   isAuth,
// }: TAddToCartOptions<T, R>) => {
//   notifications();
// const addToCart = React.useCallback(
//   (e: React.MouseEvent<Element, MouseEvent>, foodItem: T) => {
//     // const data = addItemDTO(foodItem);
//     e.stopPropagation();
//     if (isAuth) {
//       authUserAddItemMethod(foodItem);
//     } else {
//       guestAddItemMethod(foodItem);
//       NotificationFacade.toastSuccess({
//         message: `Добавлено: ${foodItem.title as string}`,
//       });
//     }
//   },
//   [authUserAddItemMethod, guestAddItemMethod, isAuth],
// );

//   return addToCart;
// };

// export default useAddToCard;
