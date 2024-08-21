import React, { ReactNode } from 'react';
import NavigationBar from './_components/ui/navigation-bar';
import { Copyright } from '@phosphor-icons/react/dist/ssr';

const Baselayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative h-fit w-full">
      <NavigationBar className="fixed top-0 z-50" />
      {children}
    </div>
  );
};

export default Baselayout;
