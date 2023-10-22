import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

interface Student {
    id: number;
    school: School;
    vak_ratings: VakRating[];
    naam: string;
    achternaam: string;
    email: string;
    klas: number;
    niveau: number;
    gebruiker: number;
    vakken: number[];
}

interface School {
    id: number;
    naam: string;
    grootte: number;
}

interface VakRating {
    leerling: number;
    vak: Vak;
    cijfer: number;
    beschrijving: string;
}

interface Vak {
    id: number;
    naam: string;
    niveaus: number[];
}


interface Session {
    accessToken: string;
    refresh_token: string;
  }

  export const fetchStudentList  = async (): Promise<Student[]> => {
    let session: Session | null = null;
    try {
        session = await getServerSession(authOptions);
    } catch (error) {
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch session");
    }
    const token = session?.accessToken;
  
    if (!token) {
        throw new Error("Access token not found");
    }
  
    const response = await fetch(
      process.env.NEXTAUTH_BACKEND_URL_MODEL_API + "Login/api/student/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
  }
  
    const data: Student[] = await response.json();
  
    return data;
  };