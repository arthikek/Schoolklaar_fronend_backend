import React, { FC } from 'react';

import LeerlingInformatie from '@/components/LeerlingInformatie';

interface PageProps {
    params: { leerlingdetails : string };
}


const Page: FC<PageProps> = ({params: {leerlingdetails}} ) => {
    
    // Assuming the slug is named "leerling-details" based on the filename
    

    if (!leerlingdetails) {
        // This handles the case where the slug is not available yet, e.g., during an initial load.
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            
            <LeerlingInformatie slug={Number(leerlingdetails)} />
        </div>
    );
}

export default Page;
