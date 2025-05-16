import CheckAdressIcon from 'assets/icons/button/compound/CheckAdressIcon';

import cl from './CheckAdressButton.module.scss';
import BaseButton from '../../BaseButton';

interface ICheckAdressButton {
  onClick: () => void;
}

const CheckAdressButton = ({ onClick }: ICheckAdressButton) => {
  return (
    <BaseButton onClick={onClick} className={cl.checkAdressBtn} buttonMode="primary" type="submit">
      <CheckAdressIcon />
      Проверить
    </BaseButton>
  );
};

export default CheckAdressButton;
