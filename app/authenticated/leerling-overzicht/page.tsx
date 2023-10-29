import Image from "next/image";
import schoolklaar from "../../public/Schoolklaar.png";
import type { AppProps } from "next/app";
import { fetchStudentList } from "@/hook/allstudents-list";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home({ Component, pageProps }: AppProps) {
  const students = await fetchStudentList();

  return (
<section className="min-h-screen w-full">
  {students.map(student => (
    <Link href={`/authenticated/leerling-overzicht/${student.id}`} key={student.id}>
      <div className="bg-blue-300 p-3 my-2 block">
        {student.naam} {student.achternaam}
      </div>
    </Link>
  ))}
</section>
  );
}
