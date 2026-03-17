import React, { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@shared/ui/dialog';

const ChangeCityModal = ({
  isOpen = false,
  setIsOpen,
  buttonSlot,
  listSlot,
}: {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  buttonSlot?: React.ReactNode;
  listSlot: ReactNode;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen && setIsOpen}>
      {buttonSlot}
      <DialogContent className="min-h-[15rem] bg-white">
        <DialogHeader>
          <DialogTitle className="mt-4">
            <p className="h1 text-center">Выберите город</p>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {listSlot}
      </DialogContent>
    </Dialog>
  );
};

export default ChangeCityModal;
