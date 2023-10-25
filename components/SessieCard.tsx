import React, { useState } from 'react';



const SessieCard = ( props :Sessie ) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    inzicht: '',
    kennis : '',
    werkhouding : '',
    extra : '',
    datum :'',,
   
  });

  

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id : Number ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}Login/api/sessies/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if necessary
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle success (maybe notify the user and close the modal)
        setShowModal(false);
      } else {
        // Handle the error response from the server
        const data = await response.json();
        console.error(data);
      }
    } catch (error) {
      // Handle error (notify the user about the error)
      console.error(error);
    }
  };
  return (
    <div className="max-w-sm p-6 m-4 rounded-2xl bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">

   
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.Leerling.naam}</h2>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Naam begeleider: {props.begeleider.username}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Inzicht: {props.inzicht}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Kennis: {props.kennis}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Werkhouding: {props.werkhouding}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Extra: {props.extra}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Vak: {props.vak.naam}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Datum: {props.datum}</p>
   
    
        <button onClick={() => setShowModal(true)}>Edit</button>

{showModal && (
  <div>
    {/* This is a simple modal, you can replace with a fancier UI if you prefer */}
    <input name="inzicht" value={formData.inzicht} onChange={handleInputChange} />
    <input name="kennis" value={formData.kennis} onChange={handleInputChange} />
    <input name="werkhouding" value={formData.werkhouding} onChange={handleInputChange} />
    <input name="extra" value={formData.extra} onChange={handleInputChange} />
    <input name="datum" value={formData.datum} onChange={handleInputChange} />
    <button onClick={()=>handleUpdate(props.id)}>Save Changes</button>
    <button onClick={() => setShowModal(false)}>Cancel</button>
  </div>
)}
</div>
);
};

export default SessieCard