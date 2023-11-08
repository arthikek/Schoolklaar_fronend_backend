import Typography from "@/components/typography";
import Modal from "./Modal";





export default function SessieBegeleider({sessie_vak, toast} : any) {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between mx-2'>
                <Typography variant='muted' className='font-bold'>Sessie Leerling</Typography>
                <Typography variant='muted' className='font-medium'>filter</Typography>
            </div>
            {sessie_vak.length > 0 ? (
                sessie_vak.map((item : any, index: number) => (
                <div key={index} className='border-2 border-quadrairy rounded-xl px-4 py-6'>
                    <div className='flex justify-between  '>
                        <Typography variant = 'muted' className='text-muted' ><span className='text-dark font-bold'>Begeleider:</span> {item.begeleider.username}</Typography>
                        <Typography variant = 'muted' className='text-muted/70'>{item.datum}</Typography>
                    </div>
                    <div className='flex flex-row gap-10 my-4'>
                        <Typography variant = 'muted' className='text-muted'>Inzicht: {item.inzicht}</Typography>
                        <Typography variant = 'muted' className='text-muted'>Kennis: {item.kennis}</Typography>
                        <Typography variant = 'muted' className='text-muted'>Werkhouding: {item.werkhouding}</Typography>
                    </div>
                    <Typography variant = 'muted' className='font-bold text-dark'>Extra:</Typography>
                    <Typography variant = 'muted'>{item.extra}</Typography>
                    <Modal 
                        toast={toast}
                        props = {item}
                    />
                </div>
                ))
            ) : (
                <Typography variant='muted' className='font-regular ml-2'>Er zijn nog geen begeleider sessies gemaakt voor dit vak...</Typography>
            )
            }
        </div>
    )
}