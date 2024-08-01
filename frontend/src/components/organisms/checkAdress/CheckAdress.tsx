import React from "react";
import cl from "./checkadress.module.scss";
import { Button } from "atoms/button/Button";
import { toast } from "react-toastify";
import useMediaQuery from "utils/hooks/useMediaQuery";
const CheckAdress = () => {
  type TResponseParams = {
    hl: [];
    text: string;
  };
  interface ISuggest {
    subtitle: TResponseParams;
    title: TResponseParams;
    type: string;
    value: string;
  }
  const [isMobile] = useMediaQuery();
  const [valueAdress, setValue] = React.useState<string>("");
  const [suggest, setSuggest] = React.useState<ISuggest[]>([]);
  const [click, setClick] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [showSubAdressInputs, setShowSubAdressInputs] = React.useState(false);

  // React.useEffect(() => {
  //   const script = document.createElement("script");

  //   const loadingScript = () => {
  //     document.body.appendChild(script);
  //     script.type = "text/javascript";
  //     script.src = `https://api-maps.yandex.ru/v3/?apikey=${
  //       import.meta.env.VITE_YANDEX_API
  //     }&lang=ru_RU`;

  //     script.onload = async () => {
  //       const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify");
  //       ymaps3.ready.then(() => {
  //         setLoading(true);
  //       });
  //       return ymaps3;
  //     };
  //   };
  //   if (click && !loading) {
  //     loadingScript();
  //   }
  //   if (!loading) return;
  //   ymaps3
  //     .suggest({
  //       text: valueAdress,
  //       limit: 10,
  //       type: "toponyms",
  //     })
  //     .then((suggest) => {
  //       setSuggest(suggest as ISuggest[]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("Ошибка запроса, повторите запрос еще раз", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     })
  //     .finally(() => {
  //       setClick((prev) => (prev = false));
  //     });
  //   ymaps3
  //     .search({
  //       text: [30.2625145, 59.9671604],
  //     })
  //     .then((suggest) => {
  //       console.log("sug", suggest);
  //     });
  //   return () => {
  //     setClick((prev) => (prev = false));
  //   };
  // }, [click, loading, valueAdress]);

  const setAddress = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (!e.target) return;
    setClick((prev) => (prev = false));

    const input = e.target as HTMLElement;
    setSuggest([]); // reset dropdown suggest
    setValue(input.innerText); // set input value
    setShowSubAdressInputs((showInputs) => (showInputs = true)); // show hidden inputs
  };

  return (
    <section className={cl.checkadress}>
      <div className="checkadress__container">
        <p className={`bigtext ${cl.title}`}>Проверить адрес доставки</p>
        <div className={cl.inputsWrapper}>
          <input
            type="text"
            id="suggest"
            value={valueAdress}
            placeholder="Адрес"
            className="normal"
            onChange={(e) => setValue(e.target.value)}
          />
          <ul className={cl.suggestArray}>
            {suggest &&
              suggest.map((suggest) => {
                return (
                  <li key={suggest.value} onClick={setAddress}>
                    {suggest.value}
                  </li>
                );
              })}
          </ul>
        </div>
        <Button
          onClick={() => setClick((prev: boolean) => (prev = true))}
          btnType={isMobile && "checkAdress"}
        >
          Проверить
        </Button>
      </div>
    </section>
  );
};
export default CheckAdress;
