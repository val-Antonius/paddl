// File: src/components/public/ui/Card.tsx
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  featured?: boolean;
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, featured = false, hoverable = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { y: -10 } : undefined}
        className={cn(
          'border-2 p-8 transition-all duration-300',
          featured
            ? 'bg-moss-green border-moss-light'
            : 'bg-black/80 border-moss-green',
          hoverable && 'hover:border-moss-light',
          className
        )}
        {...props as any}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export { Card };