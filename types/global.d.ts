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
    
    interface Leerling {
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
    
    interface Klas {
        id: number;
        naam: number;
    }
    
    interface Niveau {
        id: number;
        naam: string;
    }
    
    interface Sessie {
        id: number;
        Leerling: Leerling;
        begeleider: Gebruiker;
        inzicht: number;
        kennis: number;
        werkhouding: number;
        extra: string;
        datum: string;
        school: School;
        vak: Vak;
    }
    
}