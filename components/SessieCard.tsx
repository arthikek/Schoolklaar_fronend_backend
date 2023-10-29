import React, { useState } from "react";
import { useSession } from "next-auth/react";

const SessieCard = (props: Sessie) => {
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
      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {props.Leerling?.naam ?? "N/A"}
      </h2>
      <p className="font-normal text-gray-500 dark:text-gray-400">
        {" "}
        Naam begeleider: {props.begeleider?.username ?? "N/A"}
      </p>
      <p className="font-normal text-gray-500 dark:text-gray-400">
        {" "}
        Inzicht: {props.inzicht ?? "N/A"}
      </p>
      <p className="font-normal text-gray-500 dark:text-gray-400">
        {" "}
        Kennis: {props.kennis ?? "N/A"}
      </p>
      <p className="font-normal text-gray-500 dark:text-gray-400">
        {" "}
        Werkhouding: {props.werkhouding ?? "N/A"}
      </p>
      <p className="font-normal text-gray-500 dark:text-gray-400">
        {" "}
        Extra: {props.extra ?? "N/A"}
      </p>
      <p className="font-normal text-gray-500 dark:text-gray-400">
        {" "}
        Vak: {props?.vak?.naam ?? "N/A"}
      </p>
      <p className="font-normal text-gray-500 dark:text-gray-400">
        {" "}
        Datum: {props?.datum ?? "N/A"}
      </p>

      <button
        className="bg-blue-300 p-3 mt-2 rounded-xl"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>

      {showModal && (
        <div>
          <label htmlFor="inzicht" className="text-black">
            Inzicht:
          </label>
          <input
            className="border-blue-500 border p-2 rounded mb-2 placeholder-gray-400 text-black"
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
            className="border-blue-500 border p-2 rounded mb-2 placeholder-gray-400 text-black"
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
            className="border-blue-500 border p-2 rounded mb-2 placeholder-gray-400 text-black"
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
            className="border-blue-500 border p-2 rounded mb-2 placeholder-gray-400 text-black"
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
            className="border-blue-500 border p-2 rounded mb-2 placeholder-gray-400 text-black"
            name="datum"
            value={formData.datum}
            onChange={handleInputChange}
            placeholder="Enter datum"
            title="Datum"
          />
          <button
            className="bg-blue-500 text-white p-3 mt-2 rounded-xl"
            onClick={() => handleUpdate(props.id)}
          >
            Save Changes
          </button>
          <button
            className="bg-blue-500 text-white p-3 mt-2 rounded-xl"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default SessieCard;
