

'use client'
import { signOut, useSession } from "next-auth/react";
import TextInputContainer from "@/components/textInputContainer";
import Typography from "@/components/typography";
import { useGeneralContext } from "@/context/leerling-provider";
import { useReloaded } from "@/context/updated-provider";
import { updateStudent } from "@/hook/students-info";
import { poppins } from "@/lib/fonts";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

type FormSessie = {
    Leerling: number,
    inzicht: number,
    kennis: number,
    vak: string,
    werkhouding: number,
    extra: string,
    
    [key: string]: string | number; 
  };
  
  type ExtendedSession = {
    accessToken?: string;
  };

  
export default function LogSession(){
    const [isLoading, setIsLoading] = useState(false);
    const [ratings, setRatings] = useState({}); // State to manage ratings of subjects


    const [formData, setFormData] = useState<FormSessie>(
        {
            Leerling: 2,
            inzicht: 0,
            kennis: 0,
            vak: '',
            werkhouding: 0,
            extra: '',

    });

    const {reloaded, setReloaded} = useReloaded();
    const {generalContext } = useGeneralContext();
    const { data: session } = useSession() as { data: ExtendedSession }; // Fetch the current session data using Next Auth's hook


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
        e.preventDefault(); // Prevent the default form submission behavior
    
        try {
          const formDataObj_2 = new FormData();
          // Append each form field to the FormData object
          Object.keys(formData).forEach((key) => {
            const value = formData[key];
            if (value !== null && value !== undefined) {
              if (typeof value === "string" || typeof value === "number") {
                formDataObj_2.append(key, String(value));
              }
            }
          });
    
    
    
          // If there's a file, append it to the FormData object
       
          console.log('form data submit', formDataObj_2)
          const response = await fetch(
            process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL_MODEL_API +
              "Login/api/add_sessie_2/",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session?.accessToken}`,
              },
              body: formDataObj_2, // Send the FormData object
            }
          );
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.text(); // Parse the response as JSON
          console.log(data)
          return data;
        } catch (err) {
          toast.error(`Niet gelukt om gegevens te updaten: ${err}`);
        }
      };

    const range_vakken=[1,2,3,4,5]

    const vakken = generalContext?.vakken.map((vak : any) => vak)

    const leerling_2 = generalContext?.leerlings.map((leerling : any) => leerling)

    const textInputOne = [
        {
            title: 'Leerling',
            placeHolder: 'Voor en Achternaam',
            type: 'customInput',
            iterable: leerling_2

        }, 
        {
            title: 'Inzicht',
            placeHolder: 'Voeg een rating toe',
            type: 'range',
            iterable: range_vakken
        }, 
        {
            title: 'Kennis',
            placeHolder: 'Voeg een rating toe',
            type: 'range',
            iterable: range_vakken
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
            type: 'range',
            iterable: range_vakken
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
            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Maak een Sessie</Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className} max-w-[1200px]`}>Op deze pagina kan je vertellen hoe een leerling zich gedraagt in de les
            Wat zijn de sterke punten en wat zijn de verbeterpunten? Hoe is de werkhouding, het inzicht en de kennis van de leerling?
            </Typography>
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


