import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import Logo from 'atoms/logo/Logo';
import Contacts from 'molecules/contacts/Contacts';
import { TDataItem, footerCategories } from 'utils/data/footerCategories';
import useMediaQuery from 'utils/hooks/ui/useMediaQuery';

import cl from './Footer.module.scss';

const FooterCategories = () => {
  return Object.values(footerCategories).map((category) => {
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
  });
};

const CopyRight = () => {
  return <p className={cn('normal', cl.copyright)}>© Copyright 2024 — Куда Пицца</p>;
};

const Footer = () => {
  const isMobile = useMediaQuery();

  return (
    <footer className={cl.footer}>
      <div className="footer__container">
        <div className={cl.footerInner}>
          <div className={cl.footerLogo}>
            <Logo logoType="footer" />
            {!isMobile && <CopyRight />}
          </div>
          <FooterCategories />
          <div>
            <p className={cn('h4', cl.footer__title)}>Контакты</p>
            <Contacts />
          </div>
          {isMobile && <CopyRight />}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
