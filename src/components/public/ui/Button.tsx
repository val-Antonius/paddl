// File: src/components/public/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-moss-green text-ivory border-2 border-moss-dark hover:bg-moss-dark',
      secondary: 'bg-ivory text-moss-green border-2 border-moss-green hover:bg-cream',
      outline: 'border-2 border-moss-green text-ivory hover:bg-moss-green/10',
      ghost: 'text-ivory hover:bg-moss-green/10'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-8 py-3 text-base',
      lg: 'px-12 py-4 text-lg'
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'font-black uppercase tracking-wider transition-all duration-300',
          'shadow-[6px_6px_0px_rgba(26,37,27,1)] hover:shadow-[3px_3px_0px_rgba(26,37,27,1)]',
          'hover:translate-x-[3px] hover:translate-y-[3px]',
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };