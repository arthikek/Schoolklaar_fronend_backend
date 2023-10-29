export {}

declare global {
    
    interface Data {
        schools: School[];
        begeleiders: Begeleider[];
        teamleiders: any[]; // Empty array in the provided data
        vakken: Vak[];
        leerlings: Leerling[];
        klassen: Klas[];
        niveaus: Niveau[];
        sessies: Sessie[];
    }

    interface School {
        id: number;
        naam: string;
        grootte: number;
        secret_code?: string; // It was present in the JSON data.
    }
    
    interface Gebruiker {
        id: number;
        username: string;
        email: string;
    }

    interface Begeleider {
        id: number;
        gebruiker: Gebruiker;
        scholen: School[];
    }

    interface Klas {
        id: number;
        naam: number;  // Is 'naam' supposed to be a number?
    }
    
    interface Niveau {
        id: number;
        naam: string;
    }
    
    interface Vak {
        id: number;
        naam: string;
        niveaus: number[];
    }

    interface VakRatingHistory {
        id: number;
        leerling_vak_rating: number;
        cijfer: number;
        beschrijving: string;
        date_recorded: string;
    }

    interface VakRating {
        leerling: number;
        vak: Vak;
        cijfer: number;
        beschrijving: string;
        histories: VakRatingHistory[];
    }

    interface Leerling {
        id: number;
        naam: string;
        achternaam: string;
        email: string;
        school: School;
        klas: number;
        niveau: number;
        gebruiker: number;
        vakken: number[];
        vak_ratings: VakRating[];
    }
    
    interface Sessie {
        id: number;
        Leerling: Leerling;  // Typically, properties start with a lowercase letter in TypeScript.
        begeleider: Gebruiker;
        inzicht: number;
        kennis: number;
        werkhouding: number;
        extra: string;
        datum: string;
        school: School;
        vak: Vak;
    }

    interface Session {
        accessToken: string;
        refresh_token: string;
    }
    

    
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

    type ExtendedSession = {
        accessToken?: string;
      };
      
    interface StudentParsed {
        id: number;
        school: School;
       
        naam: string;
        achternaam: string;
        email: string;
        klas: number;
        niveau: number;
        gebruiker: number;
        
    }
}
