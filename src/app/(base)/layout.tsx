import React, { ReactNode } from 'react';
import NavigationBar from './_components/ui/navigation-bar';
import { Copyright } from '@phosphor-icons/react/dist/ssr';

const Baselayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative h-fit w-full">
      <NavigationBar className="fixed top-0 z-50" />
      {children}
      <div className="bg-slate-900">
        <div className="container flex justify-center py-4 text-white">
          <div className="flex items-center gap-2 text-sm font-light tracking-tight">
            © copyright 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baselayout;
