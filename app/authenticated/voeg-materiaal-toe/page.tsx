'use client'
import TextInputContainer from "@/components/textInputContainer";
import Typography from "@/components/typography";
import { useGeneralContext } from "@/context/leerling-provider";
import { useReloaded } from "@/context/updated-provider";
import { updateStudent } from "@/hook/students-info";
import { poppins } from "@/lib/fonts";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SessieDetails(){
    const [isLoading, setIsLoading] = useState(false);
    const [ratings, setRatings] = useState({}); // State to manage ratings of subjects


    const [formData, setFormData] = useState({
        leerling: '',
        inzicht: '',
        kennis: '',
        vak: '',
        werkhouding: '',
        extra: ''
    });

    const {reloaded, setReloaded} = useReloaded();
    const {generalContext} = useGeneralContext();
    // Handler function to update ratings state when a rating is changed
    const handleRatingChange = (subject: string, value: string) => {
        setRatings(prev => ({ ...prev, [subject]: value }));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const submitFormUserDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
           
        } catch (err) {
            toast.error(`Niet gelukt om gegevens te updaten: ${err}`);
        }
    };

    console.log('generalContext', generalContext)
    //Iterables
    const vakken = generalContext?.vakken.map((vak : any) => vak.naam)
    const leerlingen = generalContext?.leerlings.map((leerling : any) => leerling.naam + ' ' + leerling.achternaam)
    const klassen = generalContext?.klassen.map((klas : any) => klas.naam)
    const niveaus = generalContext?.niveaus.map((niveau : any) => niveau.naam)

    const textInputOne = [
        {
            title: 'Titel*',
            placeHolder: 'Geeft een titel',
            type: 'text',

        }, 
        {
            title: 'Klas*',
            placeHolder: 'Selecteer een klas',
            type: 'numberInput',
            iterable: klassen
        }, 
        {
            title: 'Bestand*',
            placeHolder: 'Selecteer een bestand',
            type: 'file',
        }, 
        {
            title: 'Niveau*',
            placeHolder: 'Selecteer een niveau',
            type: 'customInput',
            iterable: niveaus
        },      
        {
            title: 'Vak*',
            placeHolder: 'Selecteer een vak',
            type: 'customInput',
            iterable: vakken
        },       
        {
            title: 'Leerling',
            placeHolder: 'Selecteer een leerling',
            type: 'customInput',
            iterable: leerlingen
        }, 
    ]


    return (
        <div>
            <ToastContainer />
            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Upload Les Materiaal</Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className}`}>Vink de vakken aan die jij volgt</Typography>
            <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
            
            <div className="mt-16 max-w-[1200px]">
                <form className="flex flex-col mt-10" onSubmit={submitFormUserDetails}>
                    <div className="lg:grid lg:grid-cols-2 grid-cols-1 gap-4 gap-x-20 ">
                        <TextInputContainer 
                          input = {textInputOne}
                          handleInputChange = {handleInputChange}
                          handleRatingChange = {handleRatingChange}
                        /> 
                    </div>

                    <div>
                      <Typography variant='muted' className="my-2 font-medium mt-8">Omschrijving*</Typography>
                        <textarea 
                              name='omschrijving'
                              className="w-full border-2 bg-white border-[#C2C2C2] text-dark/60 p-4 rounded-xl"
                              placeholder='Schrijf de beschrijvingen zo uitgebreid mogelijk. We gaan dit later verwerken in een zoeksysteem.'
                              rows={8}
                              onChange={handleInputChange}
                          />
                    </div>        
                    <button 
                        type='submit' 
                        className="bg-quintary hover:bg-quintary/70 text-white text-lg font-bold py-3 w-full lg:w-[250px] rounded-xl transition duration-300 col-span-2 mt-8"
                        disabled={isLoading}
                    >
                            {isLoading ? 'Verwerken...' : 'Verstuur'}
                    </button>
                </form>
            </div>
        </div>
    )
}


