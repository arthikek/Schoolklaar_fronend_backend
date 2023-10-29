import React, { useState } from 'react';



const SessieCard = ( props :Sessie ) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    inzicht: props.inzicht ?? '',
    kennis: props.kennis ?? '',
    werkhouding: props.werkhouding ?? '',
    extra: props.extra ?? '',
    datum: props.datum ?? ''
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

   
  
      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.Leerling?.naam ?? "N/A"}</h2>
      <p className="font-normal text-gray-500 dark:text-gray-400"> Naam begeleider: {props.begeleider?.username ?? "N/A"}</p>
      <p className="font-normal text-gray-500 dark:text-gray-400"> Inzicht: {props.inzicht ?? "N/A"}</p>
      <p className="font-normal text-gray-500 dark:text-gray-400"> Kennis: {props.kennis ?? "N/A"}</p>
      <p className="font-normal text-gray-500 dark:text-gray-400"> Werkhouding: {props.werkhouding ?? "N/A"}</p>
      <p className="font-normal text-gray-500 dark:text-gray-400"> Extra: {props.extra ?? "N/A"}</p>
      <p className="font-normal text-gray-500 dark:text-gray-400"> Vak: {props?.vak?.naam ?? "N/A"}</p>
      <p className="font-normal text-gray-500 dark:text-gray-400"> Datum: {props?.datum ?? "N/A"}</p>
      
      <button className="bg-blue-300 p-3 mt-2 rounded-xl" onClick={() => setShowModal(true)}>Edit</button>

{showModal && (
  <div>
    
    <label htmlFor="inzicht">Inzicht:</label>
    <input name="inzicht" value={formData.inzicht} onChange={handleInputChange} placeholder="Enter inzicht" title="Inzicht" />

    <label htmlFor="kennis">Kennis:</label>
    <input name="kennis" value={formData.kennis} onChange={handleInputChange} placeholder="Enter kennis" title="Kennis" />

    <label htmlFor="werkhouding">Werkhouding:</label>
    <input name="werkhouding" value={formData.werkhouding} onChange={handleInputChange} placeholder="Enter werkhouding" title="Werkhouding" />

    <label htmlFor="extra">Extra:</label>
    <input name="extra" value={formData.extra} onChange={handleInputChange} placeholder="Enter extra" title="Extra" />

    <label htmlFor="datum">Datum:</label>
    <input name="datum" value={formData.datum} onChange={handleInputChange} placeholder="Enter datum" title="Datum" />
   
    <button onClick={()=>handleUpdate(props.id)}>Save Changes</button>
    <button onClick={() => setShowModal(false)}>Cancel</button>
  </div>
)}
</div>
);
};

export default SessieCard