import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Button3dProps {
  className?: string;
  classNameShadow?: string;
  classNameFrame?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button3d = ({
  className,
  classNameShadow,
  classNameFrame,
  children,
  disabled,
  onClick,
  type,
}: Button3dProps) => {
  return (
    <div className={cn('relative', classNameFrame)}>
      <div
        className={cn(
          'absolute h-full w-full rounded-md',
          classNameShadow,
          disabled && 'bg-slate-600',
        )}
      ></div>
      <motion.button
        className={cn(
          'h-10 rounded-md px-4 font-bold tracking-wider text-white',
          className,
          disabled && 'bg-slate-500',
        )}
        initial={{
          y: -6,
        }}
        whileTap={{
          y: 0,
        }}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
      </motion.button>
    </div>
  );
};

export default Button3d;
