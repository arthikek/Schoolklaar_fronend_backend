import { HtmlHTMLAttributes } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Icons } from './icons';
import { Images } from './images';
import { inter } from '@/lib/fonts';

interface CompType {}

export default function Brand({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLAnchorElement> & CompType) {
  return (
    <Link href={'/'} {...props} className={cn('ml-4 text-black hidden lg:inline-flex', {}, className)}>
      <Images.logo /> <span className={cn(`mt-2 ml-4 font-bold uppercase ${inter.className} hidden lg:inline text-primary`)}>School Klaar</span>
    </Link>
  );
}
