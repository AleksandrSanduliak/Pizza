import cn from 'classnames';

import cl from './AccountButton.module.scss';

const AccountButton = ({
  title,
  isActive,
  onClickCb,
}: {
  title: string;
  isActive: boolean;
  onClickCb?: () => void;
}) => {
  const handleClick = () => {
    if (onClickCb) {
      onClickCb();
    }
  };

  return (
    <p
      className={cn('standartText', cl.header, {
        [cl.activeHeader]: isActive,
      })}
      onClick={handleClick}>
      {title}
    </p>
  );
};
export default AccountButton;
