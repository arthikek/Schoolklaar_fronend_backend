import Image from "next/image";
import schoolklaar from "../../public/Schoolklaar.png";
import type { AppProps } from "next/app";
import { fetchStudentList } from "@/hook/allstudents-list";
import Link from "next/link";
import Typography from "@/components/typography";
import { poppins } from "@/lib/fonts";
import SearchBar from "@/components/searchbar";
import { Icons } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function Home({ Component, pageProps }: AppProps) {
  const students = await fetchStudentList();

  //TODO: ADD FILTER FUNCTION
  // NEED TO SPLIT UP COMPONENT INTO SMALLER COMPONENTS AND MODIFY students
  return (
      <section className="min-h-screen w-full">
        <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Leerling Overzicht</Typography>
        <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className} max-w-[1200px]`}>Op deze pagina kan je vertellen hoe een leerling zich gedraagt in de les
        Wat zijn de sterke punten en wat zijn de verbeterpunten? Hoe is de werkhouding, het inzicht en de kennis van de leerling?
        </Typography>
        <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
        
        <div className="flex flex-row justify-between mt-10 max-w-[1200px]">
          <SearchBar 
          students={students}
          ></SearchBar>
          <div className="flex flex-row gap-8 mt-4 mr-4">
            <Typography variant="muted" className="flex flex-row">Filter <Icons.arrowDown className="mt-2 ml-2"/></Typography>
            <Typography variant="muted" className="flex flex-row">Sorteer Op <Icons.arrowDown className="mt-2 ml-2"/></Typography>
          </div>
        </div>
        <div className="mt-6 max-w-[1200px] flex flex-col">
          {students.map(student => (
            <Link href={`/authenticated/leerling-overzicht/${student.id}`} key={student.id}>
              <StudentCard 
                id={student.id}
                naam={student.naam}
                achternaam={student.achternaam}
                klas={student.klas}
                vak_ratings={student.vak_ratings}
              />
            </Link>
          ))}
        </div>
      </section>
  );
}


interface Student {
  id: number;
  naam: string;
  achternaam: string;
  klas: number;
  vak_ratings: VakRating[];
} 

function StudentCard({ naam, achternaam, klas, vak_ratings, id }: Student) {
  return (
    <div className="flex flex-col lg:flex-row border border-quadrairy rounded-xl justify-between items-center my-4 py-8 px-8 max-w-[1200px]">
      <div className="flex flex-col">
        <Typography variant='muted' className="text-dark lg:text-lg text-lg">Leerling: {naam} {achternaam}</Typography>
        <Typography variant='muted' className="text-muted lg:text-[16px] text-sm mt-2">Klas: {klas}</Typography>
      </div>
      <div className="grid grid-cols-5 gap-y-0 items-center justify-center text-center">
        {vak_ratings.map((vak_rating, index) => (
          // Apply left border starting from the second item
          <Link href = {`/authenticated/leerling-overzicht/${id}/${vak_rating.vak.naam}`} key={id} className={`flex-1 ${index % 5 > 0 ? 'border-l border-primary' : ''} ${index < vak_ratings.length - 5 ? 'border-b border-primary' : ''}`}>
            <Typography variant='muted' className="text-muted lg:text-[14px] text-sm px-4 text-md mt-2 truncate text-center">
              {vak_rating.vak.naam}: {vak_rating.cijfer}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  )
}