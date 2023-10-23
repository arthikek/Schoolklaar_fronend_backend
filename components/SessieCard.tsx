
import React from 'react'

const SessieCard = ( props: Sessie) => {
  return (
    <div class="max-w-sm p-6 m-4 rounded-2xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

   
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.Leerling.naam}</h2>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Naam begeleider: {props.begeleider.username}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Inzicht: {props.inzicht}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Kennis: {props.kennis}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Werkhouding: {props.werkhouding}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Extra: {props.extra}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Vak: {props.vak.naam}</p>
        <p className="font-normal text-gray-500 dark:text-gray-400"> Datum: {props.datum}</p>
   
    
</div>

  )
}

export default SessieCard