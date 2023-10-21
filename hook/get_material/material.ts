'use server'



import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

interface Session {
    accessToken: string;
    refresh_token: string;
  }

  
export const fetchMaterial = async (): Promise<any> => {
    let session: Session | null = null;
    try {
        session = await getServerSession(authOptions);
    } catch (error) {
        throw new Error("Failed to fetch session");
    }
    const token = session?.accessToken;

    if (!token) {
        signOut({ callbackUrl: "/" })
        throw new Error("Access token not found");
    }

    const apiUrl = process.env.NEXTAUTH_BACKEND_URL_MODEL_API + "Login/api/materiaal_all/";
    console.log('apiUrl', apiUrl)


    let response: any;
    try {
        response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }
    catch (error) {
        console.log('error', error)
    }

    if (!response.ok) {
        signOut({ callbackUrl: "/" })
        console.log('response', response.status)
        throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
};


export const fetchIndividualMaterial = async (slug : any): Promise<any> => {
    let session: Session | null = null;
    try {
        session = await getServerSession(authOptions);
    } catch (error) {
        throw new Error("Failed to fetch session");
    }
    const token = session?.accessToken;

    if (!token) {
        signOut({ callbackUrl: "/" })
        throw new Error("Access token not found");
    }

    const apiUrl = `${process.env.NEXTAUTH_BACKEND_URL_MODEL_API}Login/api/materiaal_ind/?vak_slug=${slug}`;
    console.log('apiUrl', apiUrl)

    
    let response: any;
    try {
        response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }
    catch (error) {
        console.log('error', error)
    }

    if (!response.ok) {
        signOut({ callbackUrl: "/" })
        console.log('response', response.status)
        throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
};