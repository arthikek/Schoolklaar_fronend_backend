"use client"

import { StudentProvider } from "@/context/leerling-provider"
import { ReloadedProvider } from "@/context/updated-provider"
import { SessionProvider } from "next-auth/react"



export default function Provider({ children, session } : any) {
    return (
        
        <SessionProvider session={session} >
            <ReloadedProvider>
                <StudentProvider>
                    {children}
                </StudentProvider>
            </ReloadedProvider>
        </SessionProvider>
       
    )
}