// File: src/components/public/ui/Section.tsx
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'light' | 'dark';
  padded?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'dark', padded = true, children, ...props }, ref) => {
    const variants = {
      light: 'bg-ivory',
      dark: 'bg-black'
    };

    return (
      <section
        ref={ref}
        className={cn(
          variants[variant],
          padded && 'py-16 md:py-24 lg:py-32',
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };