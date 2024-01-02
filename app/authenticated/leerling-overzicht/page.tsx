import Image from "next/image";
import schoolklaar from "../../public/Schoolklaar.png";
import type { AppProps } from "next/app";
import { fetchStudentList } from "@/hook/allstudents-list";
import Link from "next/link";
import Typography from "@/components/typography";
import { poppins } from "@/lib/fonts";
import SearchBar from "@/components/searchbar";

export const dynamic = "force-dynamic";

export default async function Home({ Component, pageProps }: AppProps) {
  const students = await fetchStudentList();

 
  return (
    //TODO add standard screen when no subjects are selected for a student

    //TODO add a section where standard sessions are rendered for a student (VAak:Algemeen)
      <section className="min-h-screen w-full">
        <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>Leerling Overzicht</Typography>
        <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className} max-w-[1200px]`}>Op deze pagina kan je vertellen hoe een leerling zich gedraagt in de les
        Wat zijn de sterke punten en wat zijn de verbeterpunten? Hoe is de werkhouding, het inzicht en de kennis van de leerling?
        </Typography>
        <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
        
        <SearchBar className = 'mt-10'
        students={students}
        ></SearchBar>
        <div className="mt-6 max-w-[1200px]">
          {students.map(student => (
            <div className="py-3 " key={student.id}>{
               //TODO add more styling to the student card and make the rendering of the subjects resonsive
            }
              <Link href={`/authenticated/leerling-overzicht/${student.id}`} key={student.id}>  
                <StudentCard
                  id={student.id}
                  naam={student.naam}
                  achternaam={student.achternaam}
                  klas={student.klas}
                  vak_ratings={student.vak_ratings}
                />
              </Link>
            </div>
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
    <div className="flex flex-row border border-quadrairy rounded-xl justify-between items-center py-8 px-8 w-[1200px]">
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