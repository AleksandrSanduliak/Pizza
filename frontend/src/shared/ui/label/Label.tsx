import cn from 'classnames';

import cl from './label.module.scss';

const labelTypes: string[] = ['NEW', 'ХИТ'];

type TLabel = {
  labelType: number;
};

const Label = ({ labelType }: TLabel) => {
  return <div className={cn('mini', cl.label)}>{labelTypes[labelType]}</div>;
};

export default Label;
