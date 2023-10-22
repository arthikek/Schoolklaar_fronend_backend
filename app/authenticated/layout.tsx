'use client'
import { Suspense, useEffect } from 'react';

import Navbar from '@/components/site-header';
import SideMenu from '@/components/side-menu/side-menu';
import { useGeneralContext } from '@/context/leerling-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { fetchStudent } from '@/hook/students-info';
import { signOut, useSession } from 'next-auth/react';
import { useReloaded } from '@/context/updated-provider';
import { fetchGeneralContext } from '@/hook/informatie-scholen';


interface Vak {
    id: number;
    naam: string;
    niveaus: number[];
}

interface VakRating {
    leerling: number;
    vak: Vak;
    cijfer: number;
    beschrijving: string;
}


interface Student {
    id: number;
    school: {
        id: number;
        naam: string;
        grootte: number;
    };
    vak_ratings: VakRating[];
    naam: string;
    achternaam: string;
    email: string;
    klas: number;
    niveau: number;
    gebruiker: number;
    vakken: number[];
}

type ExtendedSession = {
    accessToken?: string;
  };

export default function Layout({ children, params }: { children: React.ReactNode, params: any }) {
    const { setGeneralContext } = useGeneralContext();
    const { data: session } = useSession() as { data: ExtendedSession }; // Fetch the current session data using Next Auth's hook
    const {reloaded} = useReloaded();

    useEffect(() => {
        async function fetchStudentData() {
            try {
               
                const generalContext: any = await fetchGeneralContext();
                setGeneralContext(generalContext)
                // setStudent(leerling);

            } catch (error) {
                signOut({ callbackUrl: '/' });
                console.error("Error fetching student data:", error);
            }
        }
        fetchStudentData();

    }, [reloaded]);



    return (
        <div className="bg-white">
            <div className="flex flex-col lg:flex-row">
                <div className='hidden lg:inline-flex lg:fixed'>
                    <SideMenu />
                </div>
                <div className='lg:mx-auto  flex flex-col w-full'>
                    <Navbar />
                    <div className='mx-8 lg:ml-[390px] xl:ml-[540px] min-h-screen mt-12 lg:mt-16'>
                        <Suspense>{children}</Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
