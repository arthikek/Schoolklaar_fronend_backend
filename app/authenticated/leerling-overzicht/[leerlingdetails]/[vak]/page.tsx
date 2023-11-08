
import LeerlingInformatie from '@/components/LeerlingInformatie';
import Typography from '@/components/typography';

import { fetchStudent, getStudent } from '@/hook/students-info';
import { poppins } from '@/lib/fonts';
import Link from 'next/link';

interface PageProps {
    params: { leerlingdetails : string, vak:  string };
}


export default async function Page ({params: {leerlingdetails, vak}} : PageProps ) {
    const studentDetails = await getStudent(leerlingdetails)

    console.log('studentDetails', studentDetails)
    // Assuming the slug is named "leerling-details" based on the filename
    
    const vak_rating = studentDetails.vak_ratings.find((rating : any) => rating.vak.naam === vak) || [] as any; 

    if (!leerlingdetails) {
        // This handles the case where the slug is not available yet, e.g., during an initial load.
        return <div>Loading...</div>;
    }
    
    console.log('hist', vak_rating.histories)
    console.log('student', studentDetails)
    return (
        <section>
            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>
            
                <Link href = {`/authenticated/leerling-overzicht`} className='font-medium hover:text-quadrairy/80 mr-4'>Leerling Overzicht</Link>
                 / 
                 <Link href = {`/authenticated/leerling-overzicht/${leerlingdetails}`} className='font-medium hover:text-quadrairy/80 mx-4'>{studentDetails.naam} {studentDetails.achternaam}</Link> 
                 / 
                 <span className='ml-4'>{vak}</span>
            </Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className} max-w-[1200px]`}>Op deze pagina kan je vertellen hoe een leerling zich gedraagt in de les
            Wat zijn de sterke punten en wat zijn de verbeterpunten? Hoe is de werkhouding, het inzicht en de kennis van de leerling?
            </Typography>
            <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
            <div className='grid grid-cols-2 gap-8 max-w-[1200px] mt-16'>
                <>
                    {vak_rating.histories.map((item : any) => (
                        <div className='border-2 border-quadrairy rounded-xl px-4 py-6'>
                        <div className='flex justify-between  '>
                            <Typography variant = 'muted' className='text-muted'  >Gemiddelde Cijfer: <span style={{ color: getGradeColor(item.leerling_vak_rating) }}>{item.leerling_vak_rating}</span></Typography>
                            <Typography variant = 'muted' className='text-muted'>Datum: {item.date_recorded}</Typography>
                        </div>
                        <Typography variant = 'muted' className='text-bold text-dark'>Extra:</Typography>
                        <Typography variant = 'muted'>{item.beschrijving}</Typography>
                    </div>
                    ))}
                </>
                <>
                    {studentDetails.sessies.map((item : any) => (
                        <div className='border-2 border-quadrairy rounded-xl px-4 py-6'>
                        <div className='flex justify-between  '>
                            <Typography variant = 'muted' className='text-muted'  >Gemiddelde Cijfer: <span style={{ color: getGradeColor(item.leerling_vak_rating) }}>{item.leerling_vak_rating}</span></Typography>
                            <Typography variant = 'muted' className='text-muted'>Datum: {item.date_recorded}</Typography>
                        </div>
                        <Typography variant = 'muted' className='font-bold text-dark'>Extra:</Typography>
                        <Typography variant = 'muted'>{item.beschrijving}</Typography>
                    </div>
                    ))}
                </>
            </div>
        </section>
    );
}


function getGradeColor(grade : number) {
    if (grade > 6.5) return 'green';
    if (grade >= 5.5 && grade <= 6.5) return 'orange';
    return 'red';
}