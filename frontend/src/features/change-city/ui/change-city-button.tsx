'use client';
import Image from 'next/image';

import { Button } from '@shared/ui/button/button';
import { DialogTrigger } from '@shared/ui/dialog';
import { cn } from '@shared/utils/shadcn-utils';
import logo from 'public/icons/isLogo.svg';

import styles from './change-city-button.module.scss';

const ChangeCityButton = ({
  setIsOpen,
  cityName,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cityName: string;
}) => {
  return (
    <DialogTrigger asChild onClick={() => setIsOpen((prev: boolean) => !prev)}>
      <Button>
        <div className="flex items-center">
          <Image src={logo.src} alt="Иконка локации" width={24} height={24} className="icon" />
          <span className={cn('bigtext', styles.location)}>{cityName ?? 'Выберите город'}</span>
        </div>
      </Button>
    </DialogTrigger>
  );
};
export default ChangeCityButton;
