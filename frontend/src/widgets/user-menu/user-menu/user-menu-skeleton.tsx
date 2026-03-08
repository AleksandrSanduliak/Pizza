import React from 'react';

import { Skeleton } from '@shared/ui/skeleton';

const UserMenuSkeleton = () => {
  return (
    <div className="flex w-fit items-center data-[loaded=false]:animate-out">
      <Skeleton className="w-[1.25rem] h-[1.25rem] mr-[0.5rem] shrink-0 bg-gray-300 rounded-full" />
      <Skeleton className="h-4 w-[105px] bg-gray-300" />
    </div>
  );
};

export default UserMenuSkeleton;
