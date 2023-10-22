
'use client'
import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import axios from 'axios';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
  } from "@fortawesome/free-solid-svg-icons";
import { cn } from '@/lib/utils';
import { inter } from '@/lib/fonts';

interface SearchResult {
    node: {
        title: string;
        handle: string;
    }
    // other fields you expect, like slug
  }

export default function SearchBar({ className }: any) {
  const [query, setQuery] = useState('')
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false)

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


  return (
    <div className='mt-0 hidden lg:inline-flex' ref={searchBarRef}>
            <div
                className={cn(
                    'border-[1px] p-4 py-3 border-primary rounded-xl min-w-[150px] lg:min-w-[400px] max-w-[600px] flex-row flex items-center justify-between',
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
                    placeholder="Zoek Op School ..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Added onChange handler here
                />

        </div>
        
        {results[0]?.node && <ul className=' absolute lg:mt-[18px] bg-white shadow p-6 py-4 min-w-[200px] max-w-[550px] z-[100]'>
            {results.slice(0, 5).map((result, index) => (
                <>
                <li key={index} className={`py-4 text-[#121212] hover:text-dark/50 ${inter.className}`}>
                    <Link href={`/shop/filterable-collection/${result.node.handle}`}>
                        {result.node.title}
                    </Link>
                </li>
                
                </>
            ))}
        </ul>
        }
    </div>
  )
}


