'use client';

import { cn } from '@/lib/utils';
import { Detective } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import dynamic from 'next/dynamic';

const NavigationSignButton = dynamic(
  () => import('@/app/(base)/_components/ui/navigation-sign-button'),
  {
    ssr: false,
  },
);

const NavigationBar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        'flex h-fit w-full justify-between border-b-[1px] bg-white py-4',
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Detective className="h-8 w-8" />
          <p className="text-xl font-semibold">Quiiiz</p>
        </div>
        <NavigationSignButton />
      </div>
    </div>
  );
};

export default NavigationBar;
