

'use client'
import SessieCard from "@/components/SessieCard";
import Typography from "@/components/typography";
import { useGeneralContext } from "@/context/leerling-provider";
import { poppins } from "@/lib/fonts";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function SessieDetails(){

    useEffect(() => {
        ;
    }, []);



    const {generalContext } = useGeneralContext();
    // Handler function to update ratings state when a rating is changed
      //Iterables
  
    const Sessies:Sessie[] = generalContext?.sessies
    console.log(Sessies)

    return (
        <div>
            <ToastContainer />
            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Overzicht Sessies</Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className}`}>Alle sessies geregistreerd op jou locatie</Typography>
            <div className="grid grid-cols-2 md:grid-cols-4">{Sessies && Sessies.map((sessie: Sessie) => <SessieCard key={sessie.id} {...sessie} />)}</div>
            



            
           
        </div>
    )
}


