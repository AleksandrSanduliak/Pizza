import Logo from 'atoms/logo/Logo';
import Contacts from 'molecules/contacts/Contacts';
import { NavLink } from 'react-router-dom';
import { TDataItem, footerCategories } from 'utils/data/footerCategories';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cl from './footer.module.scss';
const Footer = () => {
  const isMobile = useMediaQuery();

  return (
    <footer className={cl.footer}>
      <div className="footer__container">
        <div className={cl.footer__inner}>
          <div className={cl.footer__logo}>
            <Logo logoType="footer" />
            {!isMobile && (
              <p className={`normal ${cl.copyright}`}>
                © Copyright 2024 — Куда Пицца
              </p>
            )}
          </div>
          {Object.values(footerCategories).map((category) => {
            return (
              <div key={category.title}>
                <p className={`h4 ${cl.footer__title} `}>{category.title}</p>
                <ul className={cl.footerlist}>
                  {category.data.map((el: TDataItem) => {
                    return (
                      <li className="normal" key={el.anchor}>
                        <NavLink to={el.anchor}>{el.text}</NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div>
            <p className={`h4 ${cl.footer__title}`}>Контакты</p>
            <Contacts />
          </div>
          {isMobile && (
            <p className={`normal ${cl.copyright}`}>
              © Copyright 2024 — Куда Пицца
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
