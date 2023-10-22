"use client";
import TextInputContainer from "@/components/textInputContainer";
import Typography from "@/components/typography";
import { useGeneralContext } from "@/context/leerling-provider";
import { useReloaded } from "@/context/updated-provider";
import { updateStudent } from "@/hook/students-info";
import { poppins } from "@/lib/fonts";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut, useSession } from "next-auth/react";

type FormMateriaal = {
  titel: string;
  klas: string;
  bestand: File | null; // <-- Change this from just null
  niveau: string;
  vak: string;
  leerling: string;
  omschrijving: string;
  [key: string]: string | File | null; // <-- Add this
};

type ExtendedSession = {
  accessToken?: string;
};

export default function AddMaterialForm() {
  const { data: session } = useSession() as { data: ExtendedSession }; // Fetch the current session data using Next Auth's hook
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormMateriaal>({
    titel: "",
    klas: "",
    bestand: null,
    niveau: "",
    vak: "",
    leerling: "",
    omschrijving: "",
  });

  const { generalContext } = useGeneralContext();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevState) => ({
      ...prevState,
      bestand: file,
    }));
  };

  const submitFormUserDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const formDataObj = new FormData();

      // Append each form field to the FormData object
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (value !== null && value !== undefined) {
          if (typeof value === "string" || value instanceof File) {
            formDataObj.append(key, value);
          }
        }
      });



      // If there's a file, append it to the FormData object
      if (formData.bestand) {
        formDataObj.append("bestand", formData.bestand);
      }

      const response = await fetch(
        process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL_MODEL_API +
          "Login/api/add_materiaal/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: formDataObj, // Send the FormData object
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse the response as JSON

      return data;
    } catch (err) {
      toast.error(`Niet gelukt om gegevens te updaten: ${err}`);
    }
  };

  //Iterables
  const vakken = generalContext?.vakken.map((vak: any) => vak);
  const leerlingen = generalContext?.leerlings.map((leerling: any) => leerling);
  const klassen = generalContext?.klassen.map((klas: any) => klas);
  const niveaus = generalContext?.niveaus.map((niveau: any) => niveau);
  const klassen_sorted_1 = klassen
  const klassen_sorted = klassen_sorted_1?.sort((a: any, b: any) => Number(a.naam) - Number(b.naam));





  const textInputOne = [
    {
      title: "Titel*",
      placeHolder: "Geeft een titel",
      type: "text",
    },
    {
      title: "Klas*",
      placeHolder: "Selecteer een klas",
      type: "customInput",
      iterable: klassen_sorted,
    },
    {
      title: "Bestand*",
      placeHolder: "Selecteer een bestand",
      type: "file",
    },
    {
      title: "Niveau*",
      placeHolder: "Selecteer een niveau",
      type: "customInput",
      iterable: niveaus,
    },
    {
      title: "Vak*",
      placeHolder: "Selecteer een vak",
      type: "customInput",
      iterable: vakken,
    },
    {
      title: "Leerling",
      placeHolder: "Selecteer een leerling",
      type: "nameInput",
      iterable: leerlingen,
    },
  ];

  return (
    <div>
      <ToastContainer />
      <Typography
        variant="title"
        className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}
      >
        Upload Les Materiaal
      </Typography>
      <Typography
        variant="muted"
        className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className}`}
      >
        Vink de vakken aan die jij volgt
      </Typography>
      <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />

      <div className="mt-16 max-w-[1200px]">
        <form className="flex flex-col mt-10" onSubmit={submitFormUserDetails}>
          <div className="lg:grid lg:grid-cols-2 grid-cols-1 gap-4 gap-x-20 ">
            <TextInputContainer
              input={textInputOne}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
            />
          </div>

          <div>
            <Typography variant="muted" className="my-2 font-medium mt-8">
              Omschrijving*
            </Typography>
            <textarea
              name="omschrijving"
              className="w-full border-2 bg-white border-[#C2C2C2] text-dark/60 p-4 rounded-xl"
              placeholder="Schrijf de beschrijvingen zo uitgebreid mogelijk. We gaan dit later verwerken in een zoeksysteem."
              rows={8}
              required
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-quintary hover:bg-quintary/70 text-white text-lg font-bold py-3 w-full lg:w-[250px] rounded-xl transition duration-300 col-span-2 mt-8"
            disabled={isLoading}
          >
            {isLoading ? "Verwerken..." : "Verstuur"}
          </button>
        </form>
      </div>
    </div>
  );
}
