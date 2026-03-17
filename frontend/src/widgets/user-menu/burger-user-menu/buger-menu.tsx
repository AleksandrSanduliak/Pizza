'use client';

import { Button } from '@shared/ui/button/button';
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle, Dialog } from '@shared/ui/dialog';
import BurgerButton from '@widgets/user-menu/burger-user-menu/burger-button/burger-button';
import BurgetContent from '@widgets/user-menu/burger-user-menu/burger-content';

const BurgerMenu = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BurgerButton />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-white fixed !max-w-none !max-h-none w-full h-screen"
        showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Заголовок панели пользователя</DialogTitle>
        </DialogHeader>
        <BurgetContent />
      </DialogContent>
    </Dialog>
  );
};

export default BurgerMenu;
