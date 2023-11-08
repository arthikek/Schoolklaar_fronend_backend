'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import Brand from './brand';
import { Icons } from './icons';
import SearchBar from './searchbar';
import { useGeneralContext } from '@/context/leerling-provider';
import SideMenu from './side-menu/side-menu';
import { Images } from './images';
import Typography from './typography';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const { push } = useRouter();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true); // New state for header visibility
  const [hasScrolled, setHasScrolled] = useState(false); 
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const { generalContext } = useGeneralContext();

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setHeaderVisible(false);
      } else {
        // Scrolling up
        setHeaderVisible(true);
      }

      setLastScrollTop(currentScrollTop);
    };

    const handleOutsideClick = (event : any) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        }
    };


     // Add the outside click handler
     document.addEventListener("mousedown", handleOutsideClick);


    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.pageYOffset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.section
      initial="hidden"
      animate={headerVisible ? "visible" : "hidden"}
      variants={headerVariants}
      transition={{ duration: 0.5 }}
      className={cn('relative lg:ml-[350px] border-b-[1px] border-gray-200 ', {
      })}
    >

      <nav ref = {mobileMenuRef} className={cn(" lg:ml-[40px] xl:ml-[150px] py-6 max-w-[1270px] ", {
      })}>
          <div  className='mx-8 flex flex-row justify-between gap-6'>
              {!isMenuOpen && (
              <Icons.menu
                onClick={() => setIsMenuOpen(true)}
                size={30}
                className="cursor-pointer text-primary lg:hidden mt-[6px] mr-1"
              />
              ) }
              <div className='flex flex-row'>
                <Images.school_logo />
                <Typography variant = 'muted' className='ml-4 mt-2 '>Admin Portaal</Typography>
              </div>
              {/* <SearchBar /> */}

          </div>   
        {isMenuOpen && <NavContentMob setIsMenuOpen={setIsMenuOpen} currentPath={path || ''} />}
      </nav>

    </motion.section>
  );
}

const NavContent = ({currentPath} : {currentPath: string}) => {
  const path = usePathname();
  return (
    <>
      <ul className="ml-16 flex items-center gap-12 max-lg:hidden ">
        {siteConfig.nav.map((_) => (
          <li
          key={_.title}
          className={cn('', {
            '': _.href === '/' ? path === '/' : path?.includes(_.href),
          })}
          >
            <h3 className={`text-lg capitalize ${currentPath === _.href ? 'text-primary/50' : 'text-dark'}`}>
              <Link href={_.href}>{_.title}</Link>
            </h3>
          </li>
        ))}
      </ul>
    </>
  );
};


const NavContentMob = ({ setIsMenuOpen, currentPath }: { setIsMenuOpen: Function, currentPath: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="z-[10] absolute h-screen top-0 flex flex-col lg:hidden"
    >
     <SideMenu />
    </motion.div>
  );
};