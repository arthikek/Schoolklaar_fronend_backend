"use client";
import { useIndividualLeerlingDetails } from "@/hook/get_student_details/student_detail_hook";
import React from "react";
import { useSession } from "next-auth/react";
import { fetchIndividualLeerlingDetails } from "@/hook/get_student_details/get_student_detail";
import { useEffect } from "react";
import { useState } from "react";

interface Props {
  slug: Number;
}


type Details = {
  detail: StudentParsed;
  sessions: Sessie[];
  ratings: VakRating[];
};

const LeerlingInformatie: React.FC<Props> = ({ slug }) => {
  const { data: session } = useSession() as { data: ExtendedSession };
  const [data, setData] = useState<Details | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchIndividualLeerlingDetails(slug, session);
        console.log(result) 
        setData(result);
      } catch (err) {
        console.log(err)
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div className="bg-blue-300 rounded-2xl flex-col p-6 space-y-4">
      <h1 className="text-2xl font-bold text-black">LeerlingInformatie</h1>
      <h2 className="text-xl text-black">
        {data?.detail.naam} {data?.detail.achternaam}
      </h2>
      <p className="text-black">Email: {data?.detail.email}</p>
      <p className="text-black">Klas: {data?.detail.klas}</p>
      <p className="text-black">Niveau: {data?.detail.niveau}</p>

      <h2 className="text-xl font-medium text-black mt-4">Vak Ratings:</h2>
      {data?.ratings.map((rating) => (
        <div
          key={rating.vak.id}
          className="bg-blue-500 p-4 rounded mt-2 space-y-4"
        >
          <p className="text-black">Vak: {rating.vak.naam}</p>
          <p className="text-black">Cijfer: {rating.cijfer}</p>
          <p className="text-black">Beschrijving: {rating.beschrijving}</p>

          {/* Histories section */}
          <div>
            <h3 className="text-lg font-medium text-black">History:</h3>
            {rating.histories.map((history) => (
              <div
                key={history.id}
                className="bg-blue-600 p-3 rounded mt-2 space-y-2"
              >
                <p className="text-sm text-black">
                  Date: {history.date_recorded}
                </p>
                <p className="text-sm text-black">Cijfer: {history.cijfer}</p>
                <p className="text-sm text-black">
                  Beschrijving: {history.beschrijving}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2 className="text-xl font-medium text-black mt-4">Vak Ratings:</h2>
      {data?.ratings.map((rating) => (
        <div key={rating.vak.id} className="bg-blue-500 p-4 rounded mt-2">
          <p className="text-black">Vak: {rating.vak.naam}</p>
          <p className="text-black">Cijfer: {rating.cijfer}</p>
          <p className="text-black">Beschrijving: {rating.beschrijving}</p>
          {/* Add other rating details here */}
        </div>
      ))}
      {/* Add other details you want to display */}
    </div>
  );
};

export default LeerlingInformatie;
