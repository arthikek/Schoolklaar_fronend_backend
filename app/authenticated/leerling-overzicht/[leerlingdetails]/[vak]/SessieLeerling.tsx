




import Typography from "@/components/typography";



export default function SessieLeerling({vak_rating} : any) {


    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between mx-2'>
                <Typography variant='muted' className='font-bold'>Sessie Leerling</Typography>
                <Typography variant='muted' className='font-medium'>filter</Typography>
            </div>
            {vak_rating?.histories.length > 0 ? (vak_rating?.histories?.map((item : any, index: number) => (
                <div key={index} className='border-2 border-quadrairy rounded-xl px-4 py-6'>
                    <div className='flex justify-between  '>
                        <Typography variant = 'muted' className='text-muted'  >
                            <span className='text-dark font-bold'>Gemiddelde Cijfer:</span> 
                            <span style={{ color: getGradeColor(item.leerling_vak_rating) }}>{item.leerling_vak_rating}</span></Typography>
                        <Typography variant = 'muted' className='text-muted/70'>{item.date_recorded}</Typography>
                    </div>
                    <Typography variant = 'muted' className='font-bold text-dark'>Extra:</Typography>
                    <Typography variant = 'muted'>{item.beschrijving}</Typography>
                </div>
            ))
        ): (
            <Typography variant='muted' className='font-regular ml-2'>Er zijn nog geen leerling sessies gemaakt voor dit vak...</Typography>
        )}
        </div>
    )
}

function getGradeColor(grade : number) {
    if (grade > 6.5) return 'green';
    if (grade >= 5.5 && grade <= 6.5) return 'orange';
    return 'red';
}