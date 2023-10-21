'use client'
import Link from "next/link";
import { Icons } from "../icons";
import Typography from "../typography";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";



export default function SettingsMenu() {

    const router = usePathname();
    const [activeRoute, setActiveRoute] = useState('');

    useEffect(() => {
        if (router.includes('instellingen')) {
            setActiveRoute('instellingen');
        } else {
            setActiveRoute('');
        }
    }, [router]);

    return (
        <div className=" mt-12 ">
            <Typography variant = 'muted' className="ml-10 lg:text-xl text-quadrairy mt-8">
                INSTELLINGEN
            </Typography>

            <div className={`${activeRoute === 'instellingen' ? 'border-primary border-l-[4px]' : 'ml-1'} h-[40px] mt-10`}>
                <Link href='/authenticated/instellingen'>
                    <Typography variant = 'muted' className={`ml-6 lg:ml-10 pl-7 ${activeRoute === 'instellingen' ? 'py-3 bg-tertairy w-[248px] lg:w-[280px]   rounded-xl' : 'py-3 '} 
                    lg:text-lg text-quadrairy  flex flex-row  mt-[-4px]`}>
                        <Icons.settings /> 
                        <span className="ml-10 mt-[-1px] hover:font-bold">
                            Instellingen
                        </span>
                    </Typography>
                </Link>
            </div>

            <div className={`h-[40px] mt-6 ml-[6px] hover:cursor-pointer`} onClick = {() => signOut({callbackUrl: '/'})}>
                    <Typography variant = 'muted' className={`ml-6 lg:ml-10 pl-7 py-3 } 
                    lg:text-lg text-quadrairy  flex flex-row  mt-[-4px]`}>
                        <Icons.logOut /> 
                        <span className="ml-10 mt-[-1px] hover:font-bold">
                            Log uit
                        </span>
                    </Typography>
            </div>
        
        </div>
    ) 
}