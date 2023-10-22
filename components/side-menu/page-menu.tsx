'use client'

import Link from "next/link";
import { Icons } from "../icons";
import Typography from "../typography";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function PageMenu() {
    const router = usePathname();
    const [activeRoute, setActiveRoute] = useState('');

    useEffect(() => {
        if (router.includes('log-sessie')) {
            setActiveRoute('log-sessie');
        } else if (router.includes('voeg-leerling-toe')) {
            setActiveRoute('voeg-leerling-toe');
        } else if (router.includes('leerling-details')) {
            setActiveRoute('leerling-details');
        } else if (router.includes('sessie-details')) {
            setActiveRoute('sessie-details');
        } else if (router.includes('overzicht-materiaal')) {
            setActiveRoute('overzicht-materiaal');
        } else if (router.includes('voeg-materiaal-toe')) {
            setActiveRoute('voeg-materiaal-toe');
        } 
        else {
            setActiveRoute('');
        }
    }, [router]);

    return (
        <div className="grid grid-cols-1 gap-8 mt-16 mb-16">

            <MenuLink 
                activeRoute={activeRoute}
                route="log-sessie"
                link="/authenticated/log-sessie"
                icon={<Icons.scrollText className = 'text-[#62C8F4]'/>}
                text="Log Sessie"
            />

            {/* <MenuLink 
                activeRoute={activeRoute}
                route="voeg-leerling-toe"
                link="/authenticated/voeg-leerling-toe"
                icon={<Icons.userPlus  className = 'text-[#62C8F4]'/>}
                text="Voeg Leerling Toe"
            /> */}

            <MenuLink 
                activeRoute={activeRoute}
                route="Overzicht leerlingen"
                link="/authenticated/leerling-details"
                icon={<Icons.contact className = 'text-[#62C8F4]'/>}
                text="Leerling Details"
            />

            <MenuLink 
                activeRoute={activeRoute}
                route="sessie-details"
                link="/authenticated/sessie-details"
                icon={<Icons.shell className = 'text-[#62C8F4]'/>}
                text="Sessie Details"
            />

            <MenuLink 
                activeRoute={activeRoute}
                route="overzicht-materiaal"
                link="/authenticated/overzicht-materiaal"
                icon={<Icons.layers className = 'text-[#62C8F4]'/>}
                text="Overzicht Materiaal"
            />

            <MenuLink 
                activeRoute={activeRoute}
                route="voeg-materiaal-toe"
                link="/authenticated/voeg-materiaal-toe"
                icon={<Icons.folderPlus className = 'text-[#62C8F4]'/>}
                text="Voeg Materiaal Toe"
            />

            <MenuLink 
                activeRoute={activeRoute}
                route=""
                link="/"
                icon={<Icons.logOut className = 'text-[#62C8F4]'/>}
                text="Log Uit"
            />

        </div>
    )
}

function MenuLink({ activeRoute, route, link, icon, text } : any) {
    return (
        <div className={`${activeRoute === route ? 'border-primary border-l-[4px]' : 'ml-1'} h-[40px] flex flex-row items-center `}>
            <div className={` ${activeRoute === route ? 'py-2 bg-tertairy w-[280px] ml-6 pl-10 rounded-xl' : 'ml-16'}`}>
                <Link href={link}>
                    <div className="flex items-center ">
                        {icon}
                        <Typography variant='muted' className="hover:font-bold text-quadrairy lg:text-[16px] ml-12 mt-[1px]">{text}</Typography>
                    </div>
                </Link>
            </div>
        </div>
    )
}