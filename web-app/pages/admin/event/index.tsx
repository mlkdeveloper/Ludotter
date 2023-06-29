import Head from 'next/head'
import AdminLayout from "@/components/layouts/Admin";
import Modal from "@/components/Modal";
import 'flowbite';
import { useCallback, useEffect, useState } from 'react';

interface Event {
    name: string;
    description: string;
    id: string;
    date: string;
    time: string;
    company:Company;
    status:number;
}

interface Company{
    name:string
}

export default function Event() {

    const [events, setEvents] = useState([]);
    const [name, setName] = useState("")
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventSelected, setEventSelected] = useState<Event | undefined>(undefined);


    const getEvents = useCallback( () => {
        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/event/getEventsAdmin`,{
            method:'GET',
        })
        .then(response => response.json())
        .then( (data) => {
            setEvents(data)
            
        }).catch( (error) =>{
            console.log(error);
            
        });
    },[])

    useEffect( () => {
        getEvents();
    },[]);

    const save = useCallback( async (e:any) => {

        e.preventDefault();

        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/event/save`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:name})
        })
        .then(response => response.json())
        .then( (data) => {
            
            if (data.statusCode === 201){
                setSuccess("L'événement a bien été créé.")
                setError("")
            }else{
                setError(data.response.message)
                setSuccess("")
            }

            setShowModal(false);
         
        }).catch( (error) =>{
            console.log(error);  
        });
                

    },[name])


    const cancelEvent = useCallback( async () => {
        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/event/${eventSelected?.id}`,{
            method:'DELETE',
        })
        .then(response => response.json())
        .then( (data) => {
            getEvents()
            setShowDeleteModal(false);
         
        }).catch( (error) =>{
            console.log(error);  
        });

    },[eventSelected])


    const openModal = useCallback( async (event:Event, isUpdate : boolean) => {
        isUpdate ? setShowUpdateModal(true) :  setShowDeleteModal(true);
        setEventSelected(event);
    },[])


    return (
        <>
             <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <AdminLayout>
                <div className="p-4 sm:ml-64">
                    <div className="p-4 mt-14">

                        {showDeleteModal ? (
                            <>
                            <Modal setShowModal={setShowDeleteModal}>
                                <h3 className="mb-5 text-lg font-normal text-gray-500">Voulez-vous vraiment annuler cet évènement ?</h3>
                                <div className="flex justify-end">
                                    <button onClick={() => cancelEvent()} type="button" className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                                        Supprimer
                                    </button>
                                </div>
                            </Modal>
                            </>
                        ) : null}

                

                  
                        <div className="flex justify-end">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Créer un événement</button>
                        </div>

                        <div className="relative overflow-x-auto mt-5">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="border-b">
                                        <th scope="col" className="px-6 py-4">
                                            Nom
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Descritpion
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Date
                                        </th>
                                       
                                        <th scope="col" className="px-6 py-4">
                                            Entreprise
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Statut
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                { 
                                    events.map( (event:Event,index) => {
                                        return (

                                            <tr key={index} className={index % 2 == 0 ? ' bg-white' : ' bg-gray-50'}>
                                                <td scope="row" className="px-6 py-3 text-gray-900">
                                                   {event.name}
                                                </td>
                                                <td scope="row" className="px-6 py-3 text-gray-900">
                                                   {event.description}
                                                </td>
                                                <td scope="row" className="px-6 py-3 text-gray-900">
                                                   {event.date} {event.time}
                                                </td>
                                                <td scope="row" className="px-6 py-3 text-gray-900">
                                                    {event?.company?.name}
                                                </td>
                                                 <td scope="row" className="px-6 py-3 text-gray-900">
                                                
                                                    {event.status == -1 &&
                                                        <span
                                                            className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-red-100">Annulé</span>
                                                    }
                                                    {event.status == 1 &&
                                                        <span
                                                            className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-green-100">Publié</span>
                                                    }
                                                </td>
                                                    
                                                <td className="px-6 py-3 flex">

                                                {event.status == 1 &&
                                                    <svg onClick={ () => openModal(event, true)} className="w-6 h-6 stroke-blue-500 cursor-pointer" fill="none" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                }
                                                {event.status == 1 &&
                                                    <svg onClick={ () => openModal(event, false)}  fill="none" className="w-6 h-6 stroke-red-500 cursor-pointer" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                }
                            
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}


