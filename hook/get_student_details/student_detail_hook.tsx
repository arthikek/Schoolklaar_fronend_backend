'use client'
import { useState, useEffect } from 'react';
import { fetchIndividualLeerlingDetails } from './get_student_detail';

type Details = {
  detail: StudentParsed;
  sessions: Sessie[];
  ratings: VakRating[];
};

export const useIndividualLeerlingDetails = (slug: Number , session: ExtendedSession): [Details | null, boolean, Error | null] => {
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
  
  if (!session) return [null, loading, error];

  return [data, loading, error];
};
