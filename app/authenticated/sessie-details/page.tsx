

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
    const {generalContext } = useGeneralContext();
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


  //Iterables
    const vakken = generalContext?.vakken.map((vak : any) => vak.naam)
    const scholen = generalContext?.schools.map((school : any) => school.naam)
    const begeleiders = generalContext?.begeleiders.map((begeleider : any) => begeleider.gebruiker.username) || []
    const klassen = generalContext?.klassen.map((klas : any) => klas.naam)
    const niveaus = generalContext?.niveaus.map((niveau : any) => niveau.naam)

    const textInputOne = [
        {
            title: 'School',
            placeHolder: 'Selecteer een school',
            type: 'customInput',
            iterable: scholen
        }, 
        {
            title: 'Begeleider',
            placeHolder: 'Selecteer een begeleider',
            type: 'customInput',
            iterable: begeleiders
        }, 
        {
            title: 'Klas*',
            placeHolder: 'Selecteer een klas',
            type: 'customInput',
            iterable: klassen
        }, 
        {
            title: 'Niveau*',
            placeHolder: 'Selecteer een niveau',
            type: 'customInput',
            iterable: niveaus
        },      
        {
          title: 'Vak',
          placeHolder: 'Selecteer een vak',
          type: 'customInput',
          iterable: vakken
        },       
    ]

    return (
        <div>
            <ToastContainer />
            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Sessie Details</Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className}`}>Vink de vakken aan die jij volgt</Typography>
            <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
            
            <div className="mt-16 max-w-[1200px]">
                <form className="flex flex-col lg:grid lg:grid-cols-2 gap-4 gap-x-20 mt-10" onSubmit={submitFormUserDetails}>
                    <TextInputContainer
                          input = {textInputOne}
                          handleInputChange = {handleInputChange}
                          handleRatingChange = {handleRatingChange}
                      />  
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


