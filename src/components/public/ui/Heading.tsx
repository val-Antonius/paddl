// File: src/components/public/ui/Heading.tsx
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  gradient?: boolean;
  animate?: boolean;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', size = 'lg', gradient = false, animate = false, children, ...props }, ref) => {
    const sizes = {
      xs: 'text-xl md:text-2xl',
      sm: 'text-2xl md:text-3xl',
      md: 'text-3xl md:text-5xl',
      lg: 'text-4xl md:text-6xl lg:text-7xl',
      xl: 'text-5xl md:text-7xl lg:text-8xl',
      '2xl': 'text-6xl md:text-8xl lg:text-9xl',
      '3xl': 'text-7xl md:text-9xl'
    };

    const content = (
      <Component
        ref={ref}
        className={cn(
          'font-black uppercase leading-tight tracking-tight',
          gradient && 'bg-gradient-to-r from-moss-green to-moss-light bg-clip-text text-transparent',
          !gradient && 'text-moss-green',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content}
        </motion.div>
      );
    }

    return content;
  }
);

Heading.displayName = 'Heading';

export { Heading };