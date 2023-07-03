import Head from 'next/head'
import React, {useCallback, useEffect, useState} from "react";
import HomeLayout from "@/components/layouts/Home";
import {useRouter} from "next/router";
import DisplayImages from "@/components/announcement/DisplayImages";
import {Button, Modal} from "flowbite-react";
import Link from "next/link";
import Loader from "@/components/utils/Loader";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

interface Announcement {
    id: string;
    name: string;
    description: string;
    firstImage: string;
    base64Images: string[];
    type: string;
    announcementCategories: AnnouncementCategory[];
    status: number;
    price: number;
}

interface AnnouncementCategory {
    category: Category;
}

interface Category {
    name: string;
}

interface Checkout {
    id: string;
    announcementId: Announcement;
    price: number;
    startDate: string;
    endDate: string;
    status: number;
}


export default function OrderingDetails() {
    const [checkout, setCheckout] = useState<Checkout[]>([]);
    const router = useRouter();
    const supabase = useSupabaseClient();

    useEffect(() => {
        document.body.classList.add("bg-custom-light-orange");
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        const {id} = router.query;
        if (typeof id === 'string') {
            const fetchData = async () => {
                const {data: {session}} = await supabase.auth.getSession();

                fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/ordering/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + session?.access_token
                    },
                })
                    .then(response => {
                        const statusCode = response.status;
                        if (statusCode === 404) {
                            router.push('/me/ordering');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        setCheckout(data)
                    }).catch((error) => {
                    console.log(error);

                });
            }
            fetchData();
        }
    }, [router.isReady]);

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
                    <div className="container mx-auto pt-10">
                        {checkout.length > 0 ?
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-4/6">
                                <DisplayImages images={checkout[0].announcementId.base64Images}/>
                                <div className="md:col-span-7 relative">
                                    <div
                                        className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <div
                                            className="flex justify-end">
                                            {checkout[0].status === -1 &&
                                                <span
                                                    className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-md border border-red-100">
                                                                        Réservation refusée
                                                                    </span>
                                            }
                                            {checkout[0].status === 0 &&
                                                <span
                                                    className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-md border border-yellow-100">
                                                                        En attente d'approbation
                                                                    </span>
                                            }

                                            {checkout[0].status === 1 &&
                                                <span
                                                    className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-md border border-green-100">
                                                                        Réservation acceptée
                                                                    </span>
                                            }
                                        </div>
                                        <h2 className="mb-2 font-semibold leading-none text-gray-900 text-4xl">{checkout[0].announcementId.name}</h2>
                                        <div className="flex items-center justify-between mt-5">
                                            {checkout[0].announcementId.type === 'location' ?
                                                <>
                                                                    <span
                                                                        className="bg-purple-100 text-purple-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Location</span>
                                                    <div>
                                                        <p className="font-semibold text-lg text-gray-700 text-right">{checkout[0].price} €</p>
                                                        <p className="font-base italic text-sm text-gray-700">Du {new Date(checkout[0].startDate).toLocaleDateString('fr-FR')} au {new Date(checkout[0].endDate).toLocaleDateString('fr-FR')}</p>
                                                    </div>
                                                </>

                                                :
                                                <>
                                                                    <span
                                                                        className="bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">En vente</span>
                                                    <p className="font-semibold text-lg text-gray-700">{checkout[0].price} €</p>
                                                </>
                                            }
                                        </div>

                                        <dl className="mt-10">
                                            <dt className="mb-2 font-semibold leading-none text-gray-900 text-xl">Description
                                                :
                                            </dt>
                                            <dd className="text-xl text-gray-800 mb-5">{checkout[0].announcementId.description}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            :
                            <Loader/>
                        }
                    </div>
                </section>
            </HomeLayout>
        </>
    )
}