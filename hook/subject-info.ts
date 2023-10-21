'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

interface Session {
    accessToken: string;
    refresh_token: string;
}


interface course {
    id: number;
    name: string;
}


export const getSubjects = async (): Promise<course[]> => {
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
      process.env.NEXTAUTH_BACKEND_URL_MODEL_API + "Login/api/vakken/",
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
  
    const data: course[] = await response.json();
  
    return data;
};
