import Image from 'next/image';
import schoolklaar from '../../public/Schoolklaar.png';
import type {AppProps} from "next/app";
import { fetchStudentList } from '@/hook/allstudents-list';

export const dynamic = "force-dynamic"

export default async function Home({Component, pageProps}:AppProps) {

    const students  = await fetchStudentList()
  
    return (
      <section className="min-h-screen w-full">
        {students.map(student => (
          <div key={student.id} className= "bg-blue-300 p-3">
            {student.naam} {student.achternaam }
          </div>
        ))}
      </section>
    )
}
