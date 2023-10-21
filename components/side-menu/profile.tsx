'use client'
import { useStudent } from "@/context/leerling-provider";
import { Images } from "../images";
import Typography from "../typography";






export default function Profile() {
    const {student} = useStudent();

    return (
        <div className="grid grid-cols-2">
            <div>
                <Images.profile/>
            </div>
            <div className="flex flex-col justify-center ml-[-4px]">
                <Typography variant = 'muted' className="lg:text-lg text-[#121212]">
                    {student?.naam} {student?.achternaam}
                </Typography>
                <Typography variant = 'muted' className="lg:text-md text-quadrairy">
                    Klas {student?.klas}
                </Typography>
            </div>
        </div>
    )
}