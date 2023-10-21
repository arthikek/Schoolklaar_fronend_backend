import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {inter, spaceGrotesk} from '@/lib/fonts';


const typographyVariants = cva('', {
  variants: {
    textColor: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
    },
    variant: {
      special:'text-base md:text-lg text-muted leading-relaxed md:leading-9',
      default: '${inter.className}',
      heading: `text-2xl md:text-3xl font-bold  xl:leading-[69px] ${spaceGrotesk.className}`,
      title: `font-spaceGrotesk text-xl md:text-2xl font-bold  leading-[30px] lg:leading-[68px] ${spaceGrotesk.className}`,
      muted: `text-base md:text-lg text-muted leading-relaxed md:leading-9 ${inter.className} text-[#121212]`,
      paragraph: ''
    },
    size: {
      sm: 'text-xs md:text-sm lg:text-base',
      lg: 'text-base md:text-lg lg:text-xl',
    },
  },
  defaultVariants: {
    textColor: 'default',
    variant: 'default',
  },
});

interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
  textColor?: "default" | "primary" | "secondary";
  variant: 'heading' | 'title' | 'default' | 'special' | 'muted' | 'paragraph';
  size?: "sm" | "lg";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const headings: Record<number, keyof JSX.IntrinsicElements> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

const Typography = forwardRef<HTMLParagraphElement | HTMLHeadingElement, TypographyProps>(
  ({ className, textColor, variant, size, level, ...props }, ref) => {
    const computedClassNames = cn(typographyVariants({ textColor, variant, size, className }));

    if (variant === 'heading' || variant === 'title' || variant === 'special') {
      const Tag = headings[level ?? 1];

    return React.createElement(Tag as any, {
    className: computedClassNames,
    ref: ref as any,
    ...props
  }, props.children);
      
    } else {
      return (
        <p className={computedClassNames} ref={ref as React.Ref<HTMLParagraphElement>} {...props}>
          {props.children}
        </p>
      );
    }
  }
);

export default Typography;
Typography.displayName = 'Typography';
export { Typography, typographyVariants };
