import Head from 'next/head'
import HomeLayout from '@/components/layouts/Home'
import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import Loader from "@/components/utils/Loader";
import {Button, Modal} from "flowbite-react";

interface Error {
    date: string;
    startTime: string;
    endTime: string;
}

interface Visio {
    date: string;
    title: string;
    id: string;
    dateVisio: string;
}

export default function Master() {
    const [visio, setVisio] = useState<Visio[]>([])
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const supabase = useSupabaseClient();
    const [load, setLoad] = useState<boolean>(false);
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [displayModal, setDisplayModal] = useState<boolean>(false);
    const [idEvent, setIdEvent] = useState<string>('');
    const [globalError, setGlobalError] = useState<string>('');

    useEffect(() => {
        document.body.classList.add("bg-custom-light-orange");
        fetchData();
        setLoad(true);
    }, []);

    const fetchData = async () => {
        const {data: {session}} = await supabase.auth.getSession();

        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/visio/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token,
            },
        })
            .then(response => response.json())
            .then((data) => {
                setVisio(data);
                setIsLoad(false);
            }).catch((error) => {
            console.log(error);
        });
    }

    const handleEventClick = (id: string) => {
        setIdEvent(id);
        setDisplayModal(true);
    }

    const joinEvent = async () => {
        setIsLoader(true);
        const {data: {session}} = await supabase.auth.getSession();

        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/visio/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            },
            body: JSON.stringify({
                id: idEvent,
            })
        })
            .then(response => {
                const statusCode = response.status;

                return response.json();
            })
            .then((data) => {
                if (data.statusCode === 201) {
                    fetchData();
                    setDisplayModal(false);
                    setIsLoader(false);
                    setGlobalError('');
                } else {
                    if (data.response.message) {
                        setGlobalError(data.response.message);
                    } else {
                        setGlobalError("Une erreur est survenue.");
                    }
                    setIsLoader(false);
                }
            }).catch((error) => {
            console.log(error);
            setIsLoader(false);
        });
    }

    function renderEventContent(eventInfo: any) {
        const date = new Date(eventInfo.event._def.extendedProps.dateVisio);
        const today = new Date();
        return (
            <div
                className={`flex items-center justify-between ${eventInfo.event._def.extendedProps.checkoutVisio.length > 0 ? 'bg-custom-orange' : ''}`}>
                <i>{eventInfo.event.title}</i>
                {date >= today && eventInfo.event._def.extendedProps.checkoutVisio.length === 0 ?
                    <svg onClick={() => handleEventClick(eventInfo.event.id)} xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-5 h-5 hover:bg-[#1da1f2]/90 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
                    </svg>
                    :
                    null
                }
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Ludotter</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <HomeLayout>
                <section>
                    <div className="container">
                        {isLoad ?
                            <Loader/>
                            :
                            <>
                                <h2 className="mt-10 mb-3 ml-5 text-3xl font-semibold text-center">Disponibilités</h2>
                                <div className="w-full flex justify-center">
                                    <div className="w-3/4 mt-10">
                                        <div
                                            className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <FullCalendar
                                                plugins={[dayGridPlugin, interactionPlugin]}
                                                initialView="dayGridMonth"
                                                firstDay={1}
                                                locale="fr"
                                                headerToolbar={{
                                                    center: 'title',
                                                    left: '',
                                                }}
                                                buttonText={{
                                                    today: 'Aujourd\'hui',
                                                }}
                                                events={visio}
                                                eventContent={renderEventContent}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {load ?
                            <Modal
                                onClose={() => setDisplayModal(false)}
                                show={displayModal}
                                popup
                                size="lg"
                            >
                                <Modal.Header/>
                                <Modal.Body>
                                    <div className="text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="mx-auto mb-4 h-14 w-14 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                                        </svg>

                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Voulez-vous vraiment réserver ce créneau ?
                                        </h3>
                                        {isLoader ?
                                            <svg aria-hidden="true"
                                                 className="inline w-8 h-8 text-gray-200 animate-spin fill-gray-600"
                                                 viewBox="0 0 100 101" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"/>
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"/>
                                            </svg>
                                            :
                                            <>
                                                <div className="flex justify-center gap-4">
                                                    <Button
                                                        color="success"
                                                        onClick={joinEvent}
                                                    >
                                                        Oui, je suis sûr
                                                    </Button>
                                                    <Button
                                                        color="gray"
                                                        onClick={() => setDisplayModal(false)}
                                                    >
                                                        Non, annuler
                                                    </Button>
                                                </div>
                                                <p className="text-red-600">{globalError}</p>
                                            </>
                                        }
                                    </div>
                                </Modal.Body>
                            </Modal>
                            :
                            null
                        }
                    </div>
                </section>
            </HomeLayout>
        </>
    )
}