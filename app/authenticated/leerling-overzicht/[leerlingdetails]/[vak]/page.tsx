
import LeerlingInformatie from '@/components/LeerlingInformatie';
import Typography from '@/components/typography';

import { fetchStudent, getStudent } from '@/hook/students-info';
import { poppins } from '@/lib/fonts';
import Link from 'next/link';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import SessieLeerling from './SessieLeerling';
import SessieBegeleider from './SessieBegeleider';

interface PageProps {
    params: { leerlingdetails : string, vak:  string };
}


export default async function Page ({params: {leerlingdetails, vak}} : PageProps ) {
    const studentDetails = await getStudent(leerlingdetails)

      

    // Assuming the slug is named "leerling-details" based on the filename
    
    const vak_rating = studentDetails.vak_ratings.find((rating : any) => rating.vak.naam === vak) || [] as any; 
    const sessie_vak = studentDetails.sessies.filter((sessie : any) => sessie.vak.naam === vak) || [] as any;

    if (!leerlingdetails) {
        // This handles the case where the slug is not available yet, e.g., during an initial load.
        return <div>Loading...</div>;
    }
    
    console.log('vak', vak)
    console.log('hist', vak_rating.histories)
    console.log('sessie_vak', sessie_vak)
    return (
        <section>
            <ToastContainer />

            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>
            
                <Link href = {`/authenticated/leerling-overzicht`} className='font-medium hover:text-quadrairy/80 mr-4'>Leerling Overzicht</Link>
                 / 
                 <Link href = {`/authenticated/leerling-overzicht/${leerlingdetails}`} className='font-medium hover:text-quadrairy/80 mx-4'>{studentDetails.naam} {studentDetails.achternaam}</Link> 
                 / 
                 <span className='ml-4'>{vak}</span>
            </Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className} max-w-[1200px]`}>
                Op deze pagina kan je vertellen hoe een leerling zich gedraagt in de les
                Wat zijn de sterke punten en wat zijn de verbeterpunten? Hoe is de werkhouding, het inzicht en de kennis van de leerling?
            </Typography>
            
            <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />

            <div className='grid grid-cols-1 gap-16 max-w-[1200px] mt-16'>
                <SessieBegeleider 
                    sessie_vak = {sessie_vak}
                    toast = {toast}
                />

                <SessieLeerling 
                    vak_rating = {vak_rating}
                />
             
            </div>
        </section>
    );
}

