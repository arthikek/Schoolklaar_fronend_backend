
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import axios from 'axios';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
  } from "@fortawesome/free-solid-svg-icons";
import { cn } from '@/lib/utils';
import { inter } from '@/lib/fonts';

export default function SearchBar({ className, students }: any) {
  const [query, setQuery] = useState('')
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const [results, setResults] = useState<Leerling[]>(students);
  const [isLoading, setIsLoading] = useState(false)

  const filterStudents = debounce((query) => {
    if (!query) {
      setResults([]);
      return;
    }
    const lowercasedQuery = query.toLowerCase();
    const filteredStudents = students.filter((student : Leerling) =>
      student.naam.toLowerCase().includes(lowercasedQuery) || 
      student.achternaam.toLowerCase().includes(lowercasedQuery)
    );
    setResults(filteredStudents);
  }, 300);

  useEffect(() => {
    filterStudents(query);
  }, [query]);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Step 3: Check if the click was outside the search bar container
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setResults([]); // Close the search bar by clearing the results
      }
    }

    // Step 2: Add an event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Step 4: Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log('results', results);

  return (
    <div className='relative mt-0 hidden lg:inline-flex' ref={searchBarRef}>
      <div
        className={cn(
          'border-[1px] p-4 py-3 border-quadrairy rounded-xl min-w-[150px] lg:min-w-[400px] max-w-[600px] flex-row flex items-center justify-between',
          className
        )}
      >
        <FontAwesomeIcon
          icon={faSearch}
          className='text-primary mr-3 h-4 w-4'
        />
        <input 
          type="text" 
          className='w-full text-dark bg-white ml-3'
          placeholder="Zoek op leerling..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      {results.length > 0 && (
        <ul className='absolute lg:mt-[90px] bg-white shadow p-6 py-4 min-w-[400px] max-w-[600px] z-[100]'>
          {results.slice(0, 5).map((result, index) => (
            <React.Fragment key={result.id}> {/* Updated key to use student ID */}
              <li className={`py-4 text-[#121212] hover:text-dark/50 ${inter.className}`}>
                <Link href={`/authenticated/leerling-overzicht/${result.id}`} className='flex justify-between'>
                  <div>
                    {result.naam} {result.achternaam} 
                  </div>
                  <div>
                    Klas: {result.klas}
                  </div>
                </Link>
              </li>
              {index < results.length - 1 && <hr />} {/* Conditionally render <hr> */}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  )
}