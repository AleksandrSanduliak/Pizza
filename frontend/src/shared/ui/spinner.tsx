import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@shared/utils/shadcn-utils';

function Spinner({ className }: React.ComponentProps<'svg'>) {
  return (
    <Image
      src="icons/loading.svg"
      alt="Загрузка..."
      role="status"
      aria-label="Loading"
      width="20"
      height="20"
      className={cn('size-4 animate-spin', className)}
    />
  );
}

export { Spinner };
