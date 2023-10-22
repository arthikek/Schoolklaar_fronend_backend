'use client'

import { Icons } from "@/components/icons";
import Typography from "@/components/typography";
import { fetchIndividualMaterial } from "@/hook/get_material/material";
import { poppins } from "@/lib/fonts";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CircularProgress } from '@mui/material';


export default async function Documents() {
    const slug = useParams().slug;
    const [individualMaterial, setIndividualMaterial] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        async function getMateriaal () {
          try {
              
              const materiaalfetch = await fetchIndividualMaterial(slug);
              
              setIndividualMaterial(materiaalfetch)
          }
          catch (error) {
      
            throw error
          }
          finally {
            setIsLoading(false); // Moved inside the function
          }
        }
        getMateriaal()
      }, [])


    return (
        <section className="min-h-screen w-full pb-20">
              <ToastContainer />
              <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Overzicht Les Materiaal</Typography>
              <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className}`}>Vink de vakken aan die jij volgt</Typography>
              <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
              
              <div className = 'mt-16'>
                {individualMaterial.map((item : any, index : number) => <CourseComponent key={index} item = {item}/> )}
              </div>
            {isLoading && <CircularProgress size={100}/>}
        </section>
      );
  }
  

  function CourseComponent({item} : any) {
    const [setLength, setSetLength] = useState<any>(50)
    
    function expandHandler () {
        if (setLength === 50) {
            setSetLength(10000)
        } else {
            setSetLength(50)
        }
    }


    return (
      <div className='flex flex-row justify-between items-center max-w-[1200px] border-b-[1px] border-[#CBCBCB]'>
        <div className='flex flex-row max-w-[800px] justify-center items-center py-8'>
          <Image
          src = '/Schoolklaar.png'
          alt = ''
          width = {130} 
          height = {190}
          />
          <div className='flex flex-col ml-12'>
            <Typography variant='muted' className='text-dark lg:text-2xl'>{item.titel}</Typography>
            <Typography variant='muted' className='text-sm lg:text-md text-[#605F5F]'>klas {item.klas}</Typography>
            <div onClick={expandHandler}>
                <Typography variant='muted' className='text-sm lg:text-md text-[#605F5F] hover:cursor-pointer'>{item.omschrijving.slice(0, setLength)}</Typography> 
            </div>
          </div>
        </div>
  
        <div className='border-[1px] border-[#CBCBCB] px-5 py-2 rounded-xl flex items-center justify-center'>
          {/* Download link */}
          <a href={process.env.NEXTAUTH_BACKEND_URL + item.bestand} download>
            <Typography variant = 'muted' className='text-dark'>
              <Icons.download />
            </Typography>
          </a>
        </div>
      </div>
    )
  }