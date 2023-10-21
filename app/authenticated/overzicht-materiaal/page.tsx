'use client'
import Image from 'next/image';
import schoolklaar from '../../public/Schoolklaar.png';
import type {AppProps} from "next/app";
import { ToastContainer } from 'react-toastify';
import Typography from '@/components/typography';
import { poppins } from '@/lib/fonts';
import { Icons } from '@/components/icons';
import { useEffect, useState } from 'react';
import { fetchMaterial } from '@/hook/get_material/material';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';

function processData(data: any[]): {
  uniqueKlasPerTitel: Record<string, string>,
  documentCountPerTitel: Record<string, number>,
  uniqueVakNames: string[]
} {
  const uniqueKlasMapping: { [key: string]: Set<number> } = {};
  const finalUniqueKlasMapping: Record<string, string> = {};
  const documentCountMapping: { [key: string]: number } = {};
  const uniqueVakNamesSet: Set<string> = new Set();  // Initialize the Set
  
  data.forEach(item => {
      // Add the vak name to the set (assuming vak is a string here)
      uniqueVakNamesSet.add(item.vak.toString()); // Convert vak to string before adding

      // Counting the documents for each vak
      if (!documentCountMapping[item.vak]) {
          documentCountMapping[item.vak] = 0;
      }
      documentCountMapping[item.vak]++;

      // Tracking unique klas values for each vak
      if (!uniqueKlasMapping[item.vak]) {
          uniqueKlasMapping[item.vak] = new Set();
      }
      uniqueKlasMapping[item.vak].add(item.klas);
  });

  // Convert the Sets into comma-separated strings
  for (const vak in uniqueKlasMapping) {
      finalUniqueKlasMapping[vak] = Array.from(uniqueKlasMapping[vak]).join(", ");
  }

  return {
      uniqueKlasPerTitel: finalUniqueKlasMapping,
      documentCountPerTitel: documentCountMapping,
      uniqueVakNames: Array.from(uniqueVakNamesSet)  // Convert set to array
  };
}


export default function CourseMaterial() {
    const [materiaal, setMateriaal] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
      setIsLoading(true)
      async function getMateriaal () {
        try {
            console.log('executed')
            const materiaalfetch = await fetchMaterial();
            console.log('materiaal', materiaalfetch)
            setMateriaal(materiaalfetch)
        }
        catch (error) {
          console.log('error', error)
          throw error
        }
        finally {
          setIsLoading(false); // Moved inside the function
        }
      }
      getMateriaal()
    }, [])

    const array = [
      'check', 'check', 'checl', '', ''
    ]

    const classPerSubject = processData(materiaal);
    console.log(classPerSubject); 

    return (
      <section className="min-h-screen w-full pb-20">
            {isLoading && <CircularProgress size={100}/>}
            <ToastContainer />
            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Overzicht Les Materiaal</Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className}`}>Vink de vakken aan die jij volgt</Typography>
            <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
            
            <div className = 'mt-16'>
              {classPerSubject.uniqueVakNames.map((item : any, index : number) => <CourseComponent classPerSubject={classPerSubject} key={index} item = {item}/> )}
            </div>
      </section>
    );
}



function CourseComponent({item, classPerSubject} : any) {
  const num = classPerSubject.documentCountPerTitel[item] 

  console.log('num', num)
  return (
    <div className='flex flex-row justify-between items-center max-w-[1200px] border-b-[1px] border-[#CBCBCB]'>

      <div className='grid grid-cols-2 justify-center items-center py-8'>
        <Image 
        src = '/Schoolklaar.png'
        alt = ''
        width = {130} 
        height = {190}
        />
        <div className='flex flex-col ml-4'>
          <Typography variant='muted' className='text-dark lg:text-2xl'>{item}</Typography>
          <Typography variant='muted' className='text-sm lg:text-md text-[#605F5F]'>klassen: {classPerSubject.uniqueKlasPerTitel[item]}</Typography> 
          <div className='flex flex-row gap-4'>
            <Icons.formSecond className='text-[#605F5F] mt-1'/>
            <Typography variant='muted' className='text-sm lg:text-md text-[#605F5F]'>{num}</Typography>
          </div>
        </div>
      </div>

      <div onClick = {() => console.log('clicked')} className='border-[1px] border-[#CBCBCB] px-5 py-2 rounded-xl flex items-center justify-center hover:font-bold'>
        <Link href = {`/authenticated/overzicht-materiaal/${item}`}>
          <Typography variant = 'muted' className='text-dark hover:font-bold'>Bekijk documenten</Typography>
        </Link>
      </div>
    </div>
  )
}