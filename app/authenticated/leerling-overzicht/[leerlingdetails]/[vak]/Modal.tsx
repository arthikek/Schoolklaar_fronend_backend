'use client'
import { useSession } from "next-auth/react";
import { useState } from "react";




export default function Modal({props, toast} : any) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        inzicht: props.inzicht ?? "",
        kennis: props.kennis ?? "",
        werkhouding: props.werkhouding ?? "",
        extra: props.extra ?? "",
        datum: props.datum ?? "",
    });


    const { data: session } = useSession() as { data: ExtendedSession };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const token = session?.accessToken 
    const handleUpdate = async (id: Number) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL_MODEL_API}Login/api/sessies/${id}/`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                // Add authentication headers if necessary
              },
              body: JSON.stringify(formData),
            }
          );
    
          if (response.ok) {
            // Handle success (maybe notify the user and close the modal)
            setShowModal(false);
            window.location.reload();
            toast.success('Bericht Gestuurd!');
          } 
          else {
            // Handle the error response from the server
            const data = await response.json();
            toast.error(`Niet gelukt om gegevens te updaten: ${data}`);
            console.error(data);
          }
        } catch (error) {
          // Handle error (notify the user about the error)
          toast.error(`Niet gelukt om gegevens te updaten: ${error}`);
          console.error(error);
        }
      };

    return (
        <div>

            {!showModal && <button
                className='bg-quadrairy rounded-lg mt-4 w-1/4 py-2 px-4 items-center justify-center flex '
                onClick={() => setShowModal(true)}
            >
                Edit
            </button>
            }
            {showModal && (
                <div className="flex flex-col gap-1 mt-8">
                    <label htmlFor="inzicht" className="text-black">
                        Inzicht:
                    </label>
                    <input
                        className="border-quadrairy bg-white border p-2 rounded mb-2 placeholder-gray-400 text-black"
                        name="inzicht"
                        value={formData.inzicht}
                        onChange={handleInputChange}
                        placeholder="Enter inzicht"
                        title="Inzicht"
                    />

                    <label htmlFor="kennis" className="text-black">
                        Kennis:
                    </label>
                    <input
                        className="border-quadrairy bg-white border p-2 rounded mb-2 placeholder-gray-400 text-black"
                        name="kennis"
                        value={formData.kennis}
                        onChange={handleInputChange}
                        placeholder="Enter kennis"
                        title="Kennis"
                    />

                    <label htmlFor="werkhouding" className="text-black">
                        Werkhouding:
                    </label>
                    <input
                        className="border-quadrairy bg-white border p-2 rounded mb-2 placeholder-gray-400 text-black"
                        name="werkhouding"
                        value={formData.werkhouding}
                        onChange={handleInputChange}
                        placeholder="Enter werkhouding"
                        title="Werkhouding"
                    />

                    <label htmlFor="extra" className="text-black">
                        Extra:
                    </label>
                    <input
                        className="border-quadrairy bg-white border p-2 rounded mb-2 placeholder-gray-400 text-black"
                        name="extra"
                        value={formData.extra}
                        onChange={handleInputChange}
                        placeholder="Enter extra"
                        title="Extra"
                    />

                    <label htmlFor="datum" className="text-black">
                        Datum:
                    </label>
                    <input
                        className="border-quadrairy bg-white border p-2 rounded mb-2 placeholder-gray-400 text-black"
                        name="datum"
                        value={formData.datum}
                        onChange={handleInputChange}
                        placeholder="Enter datum"
                        title="Datum"
                    />
                    <button
                        className="bg-quadrairy text-white p-3 mt-2 rounded-xl"
                        onClick={() => handleUpdate(props.id)}
                    >
                        Sla wijzingen op
                    </button>
                    <button
                        className="border-quadrairy border text-dark p-3 mt-2 rounded-xl"
                        onClick={() => setShowModal(false)}
                    >
                        Annuleer
                    </button>
                </div>
            )}
        </div>
    )
}