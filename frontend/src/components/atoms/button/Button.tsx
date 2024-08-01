import React from "react";
import cl from "./button.module.scss";
import loading from "assets/icons/loading.svg";
import useMediaQuery from "utils/hooks/useMediaQuery";

const enum BtnTypes {
  Custom = "custom",
  Card = "card",
  Shopping = "shopping",
  Filter = "filter",
  CheckAdress = "checkAdress",
  OrderRight = "orderRight",
  OrderLeft = "orderLeft",
}

interface ButtonProps {
  primary: boolean;
  backgroundColor: string;
  children: React.ReactNode;
  isLoading: boolean;
  isSubmit: boolean;
  className: string;
  onClick: () => void;
  btnType:
    | "custom"
    | "card"
    | "shopping"
    | "checkAdress"
    | "orderRight"
    | "orderLeft";
  ref: string;
}
type TButton = Partial<ButtonProps>;

const btnTypeClasses = {
  custom: cl.custom,
  card: cl.cardBtn,
  shopping: cl.shoppingBtn,
  checkAdress: cl.checkAdressBtn,
  orderRight: `${cl.order} ${cl.orderRight}`,
  orderLeft: `${cl.order} ${cl.orderLeft}`,
};

export const Button = ({
  primary = true,
  children,
  isLoading = false,
  isSubmit = false,
  btnType,
  className,
  ...props
}: TButton) => {
  const mode = primary ? cl.primary : cl.secondary;
  const [isMobile] = useMediaQuery();
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={[
        cl.button,
        "normal",
        mode,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        btnTypeClasses[btnType!],
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading && (
        <img
          loading="lazy"
          className={`${cl.loading__img}  ${isLoading ? `${cl.loading}` : ""}`}
          src={loading}
          alt="Загрузка..."
        />
      )}

      {btnType === "checkAdress" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="15"
          viewBox="0 0 17 15"
          fill="none"
        >
          <path
            d="M15.0471 5.59419L2.13792 0.317409C1.59408 0.0950831 0.979671 0.192886 0.534515 0.572521C0.089357 0.952218 -0.0968307 1.53725 0.0486695 2.09928L1.1977 6.53817H6.82352C7.0824 6.53817 7.2923 6.74492 7.2923 6.99997C7.2923 7.25499 7.08243 7.46177 6.82352 7.46177H1.1977L0.0486695 11.9006C-0.0968307 12.4627 0.0893258 13.0477 0.534515 13.4274C0.980577 13.8078 1.59505 13.9044 2.13795 13.6825L15.0472 8.40574C15.6349 8.1755 17 7.62683 17 6.99997C17 6.3731 15.6349 5.8344 15.0471 5.59419Z"
            fill="white"
          />
        </svg>
      )}
      {!isMobile && btnType === "orderRight" && (
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_19984_415)">
            <path
              d="M5.62645 15.2728C5.79436 15.2728 5.96244 15.2081 6.09063 15.079L12.6562 8.46748C12.9128 8.20913 12.9128 7.79079 12.6562 7.53261L6.09063 0.921055C5.83408 0.662708 5.41865 0.662708 5.17226 0.921055C4.90587 1.1794 4.90571 1.59775 5.17226 1.85593L11.2637 8.00004L5.17226 15.1542C4.90571 15.4025 4.90571 15.8209 5.17226 15.079C5.29045 15.2081 5.45853 15.2728 5.62645 15.2728Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_19984_415"
              x="0.969727"
              y="0.727295"
              width="15.8789"
              height="22.5454"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_19984_415"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_19984_415"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      )}
      {!isMobile && btnType === "orderLeft" && (
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.3736 15.2728C11.2056 15.2728 11.0376 15.2081 10.9094 15.079L4.34378 8.46748C4.08723 8.20913 4.08723 7.79079 4.34378 7.53261L10.9094 0.921055C11.1659 0.662708 11.5814 0.662708 11.8377 0.921055C12.0941 1.1794 12.0943 1.59775 11.8377 1.85593L5.73634 8.00004L11.8377 14.1442C12.0943 14.4025 12.0943 14.8209 11.8377 15.079C11.7095 15.2081 11.5415 15.2728 11.3736 15.2728Z"
            fill="white"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

const ButtonContext = React.createContext<TButton>({
  primary: true,
  children: "",
  isLoading: false,
  isSubmit: false,
  btnType: "custom",
});

const ButtonProvider = ({
  primary = true,
  children,
  isLoading = false,
  isSubmit = false,
  btnType,
  className,
  ...props
}: TButton) => {
  return (
    <ButtonContext.Provider
      value={{ primary, isLoading, isSubmit, className, btnType }}
    >
      <button
        type={isSubmit ? "submit" : "button"}
        className={[
          cl.button,
          "normal",
          primary ? cl.primary : cl.secondary,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          btnTypeClasses[btnType!],
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </button>
    </ButtonContext.Provider>
  );
};

ButtonProvider.CheckAdress = function CheckAdress() {
  const { btnType } = React.useContext(ButtonContext);
  return (
    btnType === BtnTypes.CheckAdress && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="15"
        viewBox="0 0 17 15"
        fill="none"
      >
        <path
          d="M15.0471 5.59419L2.13792 0.317409C1.59408 0.0950831 0.979671 0.192886 0.534515 0.572521C0.089357 0.952218 -0.0968307 1.53725 0.0486695 2.09928L1.1977 6.53817H6.82352C7.0824 6.53817 7.2923 6.74492 7.2923 6.99997C7.2923 7.25499 7.08243 7.46177 6.82352 7.46177H1.1977L0.0486695 11.9006C-0.0968307 12.4627 0.0893258 13.0477 0.534515 13.4274C0.980577 13.8078 1.59505 13.9044 2.13795 13.6825L15.0472 8.40574C15.6349 8.1755 17 7.62683 17 6.99997C17 6.3731 15.6349 5.8344 15.0471 5.59419Z"
          fill="white"
        />
      </svg>
    )
  );
};
ButtonProvider.IsLoading = function IsLoading() {
  const { isLoading } = React.useContext(ButtonContext);
  return (
    isLoading && (
      <img
        loading="lazy"
        className={`${cl.loading__img}  ${isLoading ? `${cl.loading}` : ""}`}
        src={loading}
        alt="Загрузка..."
      />
    )
  );
};
ButtonProvider.OrderRight = function OrderRight() {
  const { btnType } = React.useContext(ButtonContext);
  return (
    btnType === BtnTypes.OrderRight && (
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_19984_415)">
          <path
            d="M5.62645 15.2728C5.79436 15.2728 5.96244 15.2081 6.09063 15.079L12.6562 
            8.46748C12.9128 8.20913 12.9128 7.79079 12.6562 7.53261L6.09063 0.921055C5.83408 
            0.662708 5.41865 0.662708 5.17226 0.921055C4.90587 1.1794 4.90571 1.59775 5.17226 
            1.85593L11.2637 8.00004L5.17226 15.1542C4.90571 15.4025 4.90571 15.8209 5.17226 
            15.079C5.29045 15.2081 5.45853 15.2728 5.62645 15.2728Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_19984_415"
            x="0.969727"
            y="0.727295"
            width="15.8789"
            height="22.5454"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_19984_415"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_19984_415"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    )
  );
};
ButtonProvider.OrderLeft = function OrderLeft() {
  const { btnType } = React.useContext(ButtonContext);
  return (
    btnType === BtnTypes.OrderLeft && (
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.3736 15.2728C11.2056 15.2728 11.0376 15.2081 10.9094 15.079L4.34378 8.46748C4.08723 8.20913 4.08723 7.79079 4.34378 7.53261L10.9094 0.921055C11.1659 0.662708 11.5814 0.662708 11.8377 0.921055C12.0941 1.1794 12.0943 1.59775 11.8377 1.85593L5.73634 8.00004L11.8377 14.1442C12.0943 14.4025 12.0943 14.8209 11.8377 15.079C11.7095 15.2081 11.5415 15.2728 11.3736 15.2728Z"
          fill="white"
        />
      </svg>
    )
  );
};

export const CompoundButton = (props: TButton) => {
  return (
    <ButtonProvider {...props}>
      <ButtonProvider.IsLoading />
      <ButtonProvider.OrderRight />
      <ButtonProvider.CheckAdress />
      {props.children}
    </ButtonProvider>
  );
};
