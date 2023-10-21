

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


export default function LogSession(){
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    // Handler function to update ratings state when a rating is changed
    const handleRatingChange = (subject: string, value: string) => {
        setRatings(prev => ({ ...prev, [subject]: value }));
    }


    const submitFormUserDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
           
        } catch (err) {
            toast.error(`Niet gelukt om gegevens te updaten: ${err}`);
        }
    };


    const vakken = generalContext?.vakken.map((vak : any) => vak.naam)
    const textInputOne = [
        {
            title: 'Leerling',
            placeHolder: 'Voor en Achternaam',
            type: 'text',

        }, 
        {
            title: 'Inzicht',
            placeHolder: 'Voeg een rating toe',
            type: 'numberInput',
        }, 
        {
            title: 'Kennis',
            placeHolder: 'Voeg een rating toe',
            type: 'numberInput',
        }, 
        {
            title: 'Vak',
            placeHolder: 'Selecteer het vak',
            type: 'customInput',
            iterable: vakken
        },       
    ]

    const textInputTwo = [
        {
            title: 'Werkhouding',
            placeHolder: 'Voeg een rating toe',
            type: 'numberInput',
        }, 
        {
            title: 'Extra',
            placeHolder: 'Schrijf hier commentaar',
            type: 'textArea',
        }, 
    ]

    return (
        <div>
            <ToastContainer />
            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Maak een logboek</Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className}`}>Vink de vakken aan die jij volgt</Typography>
            <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
            
            <div className="mt-16 max-w-[1200px]">
                <form className="flex flex-col lg:grid lg:grid-cols-2 gap-8 mt-10 gap-x-20" onSubmit={submitFormUserDetails}>
                    <div className="grid grid-cols-1 gap-4">
                        <TextInputContainer
                          input = {textInputOne}
                          handleInputChange = {handleInputChange}
                          handleRatingChange = {handleRatingChange}
                      /> 
                    </div>
                    <div className="flex flex-col gap-4">
                        <TextInputContainer
                          input = {textInputTwo}
                          handleInputChange = {handleInputChange}
                          handleRatingChange = {handleRatingChange}
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


