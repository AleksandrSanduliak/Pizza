import React from "react";
import cl from "./contacts.module.scss";

const Contacts = () => {
  return (
    <div className={cl.contacts}>
      <div className={cl.contacts__block}>
        <div className={cl.contacts__block_content}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4.05291 13.2947C6.03304 15.6527 8.41667 17.5093 11.1373 18.823C12.1731 19.3121 13.5583 19.8923 15.1017 19.9917C15.1974 19.9959 15.2889 20 15.3846 20C16.4204 20 17.2524 19.6436 17.9304 18.9101C17.9346 18.9059 17.9429 18.8976 17.9471 18.8893C18.1883 18.5993 18.4629 18.3382 18.7499 18.0605C18.9455 17.874 19.1451 17.6792 19.3365 17.4803C20.2226 16.5603 20.2226 15.3916 19.3282 14.5006L16.828 12.0099C16.4037 11.5707 15.8962 11.3386 15.3638 11.3386C14.8313 11.3386 14.3196 11.5707 13.8828 12.0058L12.3936 13.4894C12.2563 13.4107 12.1149 13.3402 11.9817 13.2739C11.8153 13.191 11.6614 13.1123 11.5241 13.0253C10.168 12.1674 8.93667 11.0485 7.75941 9.61044C7.16454 8.86034 6.76518 8.23042 6.48647 7.58807C6.8775 7.23581 7.24358 6.86697 7.59717 6.50642C7.72197 6.37795 7.85092 6.24948 7.97988 6.12101C8.42915 5.67344 8.67043 5.15541 8.67043 4.62909C8.67043 4.10278 8.43331 3.58475 7.97988 3.13717L6.74022 1.9022C6.59463 1.75715 6.45735 1.61625 6.31591 1.4712C6.04136 1.18939 5.75432 0.899296 5.47145 0.63821C5.04297 0.219644 4.53962 0 4.00715 0C3.47884 0 2.97133 0.219644 2.52622 0.642354L0.970403 2.19229C0.404653 2.75591 0.084338 3.4397 0.0177792 4.23125C-0.0612595 5.22172 0.121777 6.27435 0.596009 7.54662C1.324 9.51513 2.42222 11.3427 4.05291 13.2947ZM1.0328 4.31828C1.08272 3.76709 1.29488 3.30709 1.69423 2.90924L3.24172 1.36759C3.483 1.13552 3.74924 1.01533 4.00715 1.01533C4.26091 1.01533 4.51882 1.13552 4.75594 1.37588C5.03465 1.63282 5.29673 1.9022 5.5796 2.18815C5.72104 2.3332 5.86664 2.47824 6.01224 2.62743L7.25189 3.86241C7.50981 4.11935 7.64293 4.38044 7.64293 4.63738C7.64293 4.89432 7.50981 5.15541 7.25189 5.41235C7.12294 5.54082 6.99398 5.67344 6.86502 5.80191C6.47815 6.19146 6.11623 6.5603 5.71688 6.91256C5.70856 6.92085 5.7044 6.92499 5.69608 6.93328C5.35081 7.27725 5.40489 7.60464 5.48809 7.85329C5.49225 7.86573 5.49641 7.87402 5.50057 7.88645C5.82088 8.65313 6.26599 9.38251 6.9607 10.2528C8.20868 11.7862 9.52322 12.9755 10.9709 13.8914C11.1497 14.0075 11.3411 14.0986 11.52 14.1898C11.6864 14.2727 11.8403 14.3514 11.9776 14.4385C11.9942 14.4467 12.0067 14.455 12.0233 14.4633C12.1606 14.5338 12.2937 14.5669 12.4268 14.5669C12.7596 14.5669 12.976 14.3556 13.0467 14.2851L14.6025 12.7352C14.8438 12.4948 15.1058 12.3663 15.3638 12.3663C15.6799 12.3663 15.9378 12.5611 16.1001 12.7352L18.6085 15.23C19.1077 15.7273 19.1035 16.2661 18.596 16.7924C18.4213 16.9789 18.2383 17.1571 18.0427 17.3436C17.7516 17.6254 17.4479 17.9155 17.1733 18.2429C16.6949 18.7567 16.125 18.9971 15.3887 18.9971C15.318 18.9971 15.2431 18.993 15.1724 18.9888C13.8079 18.9018 12.5392 18.3713 11.5865 17.9196C8.99906 16.6722 6.72774 14.9026 4.8433 12.6564C3.29164 10.7957 2.2475 9.06341 1.55695 7.2068C1.12848 6.06714 0.966243 5.15126 1.0328 4.31828Z"
              fill="#FF7010"
            />
          </svg>
          <a href="tel:+7 (926) 223-10-11">+7 (926) 223-10-11</a>
        </div>
      </div>
      <div className={cl.contacts__block}>
        <div className={cl.contacts__block_content}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
          >
            <path
              d="M6.51463 19.7391C6.62282 19.9021 6.80497 20 7 20C7.19503 20 7.37718 19.9021 7.48537 19.7391C8.86589 17.6591 10.8993 15.0903 12.3162 12.4778C13.4492 10.3889 14 8.60727 14 7.03125C14 3.15422 10.8598 0 7 0C3.1402 0 0 3.15422 0 7.03125C0 8.60727 0.550783 10.3889 1.68377 12.4778C3.09968 15.0883 5.13695 17.6634 6.51463 19.7391ZM7 1.17188C10.2165 1.17188 12.8333 3.80039 12.8333 7.03125C12.8333 8.40641 12.3291 10.0046 11.2917 11.9171C10.0704 14.1691 8.32743 16.4534 7 18.3738C5.67276 16.4537 3.92972 14.1692 2.70826 11.9171C1.67094 10.0046 1.16667 8.40641 1.16667 7.03125C1.16667 3.80039 3.7835 1.17188 7 1.17188Z"
              fill="#FF7010"
            />
            <path
              d="M7 10.5469C8.9299 10.5469 10.5 8.96977 10.5 7.03125C10.5 5.09273 8.9299 3.51562 7 3.51562C5.0701 3.51562 3.5 5.09273 3.5 7.03125C3.5 8.96977 5.0701 10.5469 7 10.5469ZM7 4.6875C8.2866 4.6875 9.33333 5.73891 9.33333 7.03125C9.33333 8.32359 8.2866 9.375 7 9.375C5.7134 9.375 4.66667 8.32359 4.66667 7.03125C4.66667 5.73891 5.7134 4.6875 7 4.6875Z"
              fill="#FF7010"
            />
          </svg>
          <p>Москва, ул. Юных Ленинцев, д.99</p>
        </div>
      </div>
      <div className={cl.contacts__block}>
        <div className={cl.contacts__block_content}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 10.0559C0 15.0279 3.61111 19.162 8.33333 20L8.38896 19.9552C8.37042 19.9516 8.35188 19.948 8.33334 19.9442V12.8493H5.83334V10.056H8.33334V7.82134C8.33334 5.30737 9.94445 3.91073 12.2222 3.91073C12.9444 3.91073 13.7222 4.02246 14.4444 4.13419V6.70402H13.1667C11.9444 6.70402 11.6667 7.31854 11.6667 8.10067V10.056H14.3333L13.8889 12.8493H11.6667V19.9442C11.6481 19.948 11.6296 19.9516 11.611 19.9552L11.6667 20C16.3889 19.162 20 15.0279 20 10.0559C20 4.52513 15.5 0 10 0C4.5 0 0 4.52513 0 10.0559Z"
              fill="#FF7010"
            />
          </svg>
          <p>Facebook</p>
        </div>
        <div className={cl.contacts__block_content}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10.0042 0.00783266C7.28637 0.00783266 6.94456 0.020333 5.87745 0.0661675C4.81451 0.116169 4.08504 0.287006 3.45144 0.532846C2.78394 0.78416 2.17935 1.17806 1.67987 1.68704C1.17068 2.18633 0.776631 2.79069 0.525219 3.45792C0.275115 4.09127 0.108378 4.82045 0.0583576 5.88298C0.0125052 6.94967 0 7.29135 0 10.0081C0 12.7165 0.0125052 13.0623 0.0583576 14.1249C0.108378 15.1915 0.279283 15.9166 0.525219 16.5541C0.776631 17.2213 1.17068 17.8257 1.67987 18.325C2.17935 18.8339 2.78394 19.2278 3.45144 19.4792C4.08504 19.725 4.81451 19.8958 5.87745 19.9417C6.94456 19.9917 7.28637 20 10.0042 20C12.7136 20 13.0596 19.9917 14.1226 19.9417C15.1897 19.8917 15.915 19.725 16.5527 19.4792C17.2202 19.2278 17.8248 18.8339 18.3243 18.325C18.8335 17.8257 19.2275 17.2213 19.4789 16.5541C19.7249 15.9166 19.8958 15.1915 19.9416 14.1249C19.9917 13.0623 20 12.7207 20 10.0039C20 7.29135 19.9917 6.94967 19.9416 5.88298C19.8916 4.82045 19.7249 4.09127 19.4789 3.45792C19.2275 2.79069 18.8335 2.18633 18.3243 1.68704C17.8248 1.17806 17.2202 0.78416 16.5527 0.532846C15.915 0.28284 15.1897 0.116169 14.1226 0.0661675C12.7506 0.00688492 11.3772 -0.0125682 10.0042 0.00783266ZM10.0042 1.80788C12.6719 1.80788 12.9887 1.82038 14.0434 1.86621C15.0188 1.91205 15.544 2.07455 15.8983 2.21205C16.3652 2.39123 16.6986 2.6079 17.0488 2.96207C17.3813 3.28325 17.6377 3.67478 17.7991 4.10794C17.9325 4.46211 18.0992 4.99129 18.1409 5.96632C18.1909 7.02051 18.1992 7.33718 18.1992 10.0081C18.1992 12.6748 18.1909 12.9915 18.1409 14.0457C18.0992 15.0207 17.9325 15.5457 17.7991 15.8999C17.6382 16.3345 17.3818 16.7276 17.0488 17.0499C16.7263 17.3829 16.3331 17.6392 15.8983 17.7999C15.5481 17.9333 15.0188 18.1 14.0434 18.1416C12.9887 18.1916 12.6678 18.2 10 18.2C7.33222 18.2 7.01542 18.1916 5.95665 18.1416C4.98541 18.1 4.45602 17.9333 4.10171 17.7999C3.66689 17.6392 3.27373 17.3829 2.95123 17.0499C2.61817 16.7276 2.36176 16.3345 2.20092 15.8999C2.06753 15.5499 1.90496 15.0207 1.85911 14.0457C1.80039 12.6993 1.78093 11.3515 1.80075 10.0039C1.80075 7.33718 1.81326 7.02051 1.85911 5.96215C1.90496 4.99129 2.06753 4.46211 2.20509 4.10794C2.36593 3.67329 2.62234 3.28028 2.9554 2.95791C3.2767 2.6255 3.66839 2.36922 4.10171 2.20789C4.45602 2.07455 4.98541 1.91205 5.96082 1.86621C7.01542 1.82038 7.33222 1.80788 10.0042 1.80788ZM10.0042 4.87045C8.64216 4.87045 7.33593 5.4113 6.37284 6.37401C5.40975 7.33672 4.8687 8.64244 4.8687 10.0039C4.8687 11.3654 5.40975 12.6711 6.37284 13.6338C7.33593 14.5965 8.64216 15.1374 10.0042 15.1374C11.3662 15.1374 12.6724 14.5965 13.6355 13.6338C14.5986 12.6711 15.1396 11.3654 15.1396 10.0039C15.1396 8.64244 14.5986 7.33672 13.6355 6.37401C12.6724 5.4113 11.3662 4.87045 10.0042 4.87045ZM10.0042 13.3415C9.11974 13.3415 8.27154 12.9903 7.64616 12.3652C7.02078 11.74 6.66945 10.8922 6.66945 10.0081C6.66945 9.12401 7.02078 8.27614 7.64616 7.651C8.27154 7.02586 9.11974 6.67467 10.0042 6.67467C10.8886 6.67467 11.7368 7.02586 12.3622 7.651C12.9876 8.27614 13.3389 9.12401 13.3389 10.0081C13.3389 10.8922 12.9876 11.74 12.3622 12.3652C11.7368 12.9903 10.8886 13.3415 10.0042 13.3415ZM16.5402 4.67462C16.5402 4.35635 16.4137 4.05112 16.1886 3.82607C15.9635 3.60102 15.6581 3.47459 15.3397 3.47459C15.0213 3.47459 14.716 3.60102 14.4908 3.82607C14.2657 4.05112 14.1392 4.35635 14.1392 4.67462C14.1392 4.99288 14.2657 5.29812 14.4908 5.52317C14.716 5.74821 15.0213 5.87465 15.3397 5.87465C15.6581 5.87465 15.9635 5.74821 16.1886 5.52317C16.4137 5.29812 16.5402 4.99288 16.5402 4.67462Z"
              fill="#FF7010"
            />
          </svg>
          <p>Instagram</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;