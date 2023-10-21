'use client';

import { HTMLAttributes } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import Typography from './ui/typography';

interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  pageTitle: string;
}

export default function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  const path = usePathname();
  let baseLink = '/';
  const slug =
    path?.includes('/portfolio/') ? (baseLink = '/portfolio', path?.split('/portfolio/')[1].replaceAll('-', ' ')) : 
    path?.includes('/technologie/') ? (baseLink = '/technologie', path?.split('/technologie/')[1].replaceAll('-', ' ')) :
    path?.includes('/blog/') ? (baseLink = '/blog', path?.split('/blog/')[1].replaceAll('-', ' ')) :
    null;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-[15px] text-sm font-medium text-slate-800',
        className,
        {}
      )}
      {...props}
      
    >
      <Link href={'/'}>Home</Link>
      <div>/</div>
      {slug ? (
        <Link href={baseLink} className="hover:text-zinc-500">
          {props.pageTitle}
        </Link>
      ) : (
        <div className="text-zinc-500">{props.pageTitle}</div>
      )}
      {slug && (
        <>
          <div>/</div> <div className="capitalize text-zinc-500">{slug}</div>{' '}
        </>
      )}
    </div>
  );
}