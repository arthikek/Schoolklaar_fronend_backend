

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
import TextInputCheckBox from "./TextInputCheckBox";
import SendAddStudent from "@/hook/add_student/add_student";
import { useSession } from "next-auth/react";


type ExtendedSession = {
  accessToken?: string;
};


export default function AddStudent(){
    const [isLoading, setIsLoading] = useState(false);
    const {reloaded, setReloaded} = useReloaded();
    const { data: session } = useSession() as { data: ExtendedSession };
    const [formData, setFormData] = useState({
        naam: '',
        achternaam: '',
        email: '',
        school: '',
        gebruiker: '',
        klas: '',
        niveau: '',
        vakken: [],

    });
    const {generalContext } = useGeneralContext();
    const scholen = generalContext?.schools
    const klassen = generalContext?.klassen.map((klas : any) => klas.naam)
    const niveaus = generalContext?.niveaus.map((niveau : any) => niveau.naam)
    const vakken = generalContext?.vakken.map((vak : any) => vak.naam)
    const begeleiders = generalContext?.begeleiders.map((begeleider : any) => begeleider.gebruiker.username) || []
    const teamleiders = generalContext?.teamleiders.map((teamleider : any) => teamleider.gebruiker.username) || []
    const gebruikers = [...begeleiders, ...teamleiders];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
          setFormData((prevState : any ) => {
              if (checked && !prevState.vakken.includes(id)) {
                  return { ...prevState, vakken: [...prevState.vakken, id] };
              } else {
                  return { ...prevState, vakken: prevState.vakken.filter((vak : any ) => vak !== id) };
              }
          });

    };

    const submitFormUserDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        try {
            await SendAddStudent(formData, session?.accessToken || '');
            toast.success('Bericht Gestuurd!');
        } 
        catch (err) {
     
            toast.error(`Niet gelukt om gegevens te updaten: ${err}`);
        }
        setIsLoading(false);
        setReloaded(!reloaded);
    };


    const textInputOne = [ 
        {
            title: 'Naam*',
            placeHolder: 'Voornaam',
            type: 'text',

        }, 
        {
            title: 'Achternaam*',
            placeHolder: 'Achternaam',
            type: 'text',
        }, 
        {
            title: 'Email*',
            placeHolder: 'email address',
            type: 'text',
        }, 
        {
            title: 'School*',
            placeHolder: 'Selecteer een school',
            type: 'customInput',
            iterable: scholen

        },      
        {
          title: 'Gebruiker',
          placeHolder: 'Kies soort gebruiker',
          type: 'customInput',
          iterable: gebruikers
      },     
    ]

    const textInputTwo = [
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
          title: 'Vakken*',
          placeHolder: 'Selecteer vakken',
          type: 'checkbox',
          iterable: vakken
      }, 
    ]

    
    return (
        <div>
            <ToastContainer />
            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Maak een nieuwe leerling aan</Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className}`}>Vink de vakken aan die jij volgt</Typography>
            <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
            
            <div className="mt-16 max-w-[1200px]">
                <form className="flex flex-col lg:grid lg:grid-cols-2 gap-8 mt-10 gap-x-20" onSubmit={submitFormUserDetails}>
                    <div className="grid grid-cols-1 gap-4">
                      <TextInputContainer 
                          input = {textInputOne}
                          handleInputChange = {handleInputChange}
                        /> 
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:max-h-[400px]">
                      <TextInputCheckBox 
                          input = {textInputTwo}
                          handleInputChange = {handleInputChange}
                          handleCheckboxChange = {handleCheckboxChange}
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


