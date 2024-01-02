import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { useSession } from "next-auth/react";



export const fetchIndividualLeerlingDetails = async (slug: Number, token: ExtendedSession): Promise<{ detail: StudentParsed, sessions: Sessie[], ratings: VakRating[] }> => {
    console.log('slug', slug)

    const session = token
   
    try {
        console.log('session', session)
    } catch (error) {
        throw new Error("Failed to fetch session");
    }

    if (!session || !session.accessToken) {
        throw new Error("No access token available");
    }
    const apiUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL_MODEL_API}Login/api/student_detail/${slug}`;

    let response: Response;
    try {
        response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
    } catch (error) {
        throw new Error(`Failed to fetch data: ${(error as Error).message}`);
    }

    if (!response.ok) {
        throw new Error(`API responded with status code: ${response.status}`);
    }

    const data = await response.json();

    const detail: StudentParsed = {
        id: data.gebruiker,
        naam: data.naam,
        achternaam: data.achternaam,
        email: data.email,
        school: {
            id: data.school.id,
            naam: data.school.naam,
            grootte: data.school.grootte,
            secret_code: data.school.secret_code
        },
        klas: data.klas,
        niveau: data.niveau,
        gebruiker: data.gebruiker
    };
    
    const sessions: Sessie[] = data.sessies.map((s: any) => ({
        id: s.id,
        Leerling: s.Leerling,
        begeleider: {
            id: s.begeleider.id,
            username: s.begeleider.username,
            email: s.begeleider.email
        },
        inzicht: s.inzicht,
        kennis: s.kennis,
        werkhouding: s.werkhouding,
        extra: s.extra,
        datum: s.datum,
        school: {
            id: s.school.id,
            naam: s.school.naam,
            grootte: s.school.grootte,
            secret_code: s.school.secret_code
        },
        vak: {
            id: s.vak.id,
            naam: s.vak.naam,
            niveaus: s.vak.niveaus
        }
    }));

    const ratings: VakRating[] = data.vak_ratings.map((vr: any) => ({
        leerling: vr.leerling,
        vak: {
            id: vr.vak.id,
            naam: vr.vak.naam,
            niveaus: vr.vak.niveaus
        },
        cijfer: vr.cijfer,
        beschrijving: vr.beschrijving,
        histories: vr.histories.map((h: any) => ({
            id: h.id,
            leerling_vak_rating: h.leerling_vak_rating,
            cijfer: h.cijfer,
            beschrijving: h.beschrijving,
            date_recorded: h.date_recorded
        }))
    }));


    return {
        detail: detail,
        sessions: sessions,
        ratings: ratings
    };

};