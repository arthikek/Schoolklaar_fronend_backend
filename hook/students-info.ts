'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from 'next-auth/react';

interface Vak {
    id: number;
    naam: string;
    niveaus: number[];
}

interface VakRating {
    leerling: number;
    vak: Vak;
    cijfer: number;
    beschrijving: string;
}



interface Session {
  accessToken: string;
  refresh_token: string;
}

export const fetchStudent = async (): Promise<Student> => {
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
      process.env.NEXTAUTH_BACKEND_URL_MODEL_API + "Login/api/student_detail/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
  }
  
    const data: Student = await response.json();
  
    return data;
};

export const getStudent = async (leerlingdetails : any): Promise<Student> => {
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
    process.env.NEXTAUTH_BACKEND_URL_MODEL_API + "Login/api/student_detail/"  + leerlingdetails,
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

  const data: Student = await response.json();

  return data;
};

export const updateStudent = async (updatedStudentData: Student): Promise<Student> => {
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
      process.env.NEXTAUTH_BACKEND_URL_MODEL_API + "Login/api/student_detail/",
      {
        method: "PUT",  // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedStudentData)  // Send the updated student data as the request body
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Student = await response.json();

    return data;
};