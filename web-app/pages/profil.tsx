import Head from 'next/head'
import React, { useEffect, useRef, useState } from "react";
import HomeLayout from "@/components/layouts/Home";
import Link from "next/link";
import { useUser } from '@supabase/auth-helpers-react';

interface party {
    name: string;
    description: string;
    id: string;
    status: number;
    zipcode: string;
    location: string;
    dateParty: string;
    owner: string;
}

export default function Profil() {
    const containerRef = useRef<HTMLDivElement>(null);

    const user = useUser();

    useEffect(() => {
        document.body.classList.add("bg-custom-light-orange");
    });

    return (
        <>
            <Head>
                <title>Ludotter</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeLayout>
                <section>
<div className="">
	
	<div className="w-full">
		<div className="flex flex-col">
		</div>
		<div className="w-full">
		<div className="flex flex-col">
			<div className="bg-white border border-white shadow rounded p-4 m-4">
				<div className="flex-none sm:flex">
					<div className=" relative h-32 w-32   sm:mb-0 mb-3">
						<img src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg" alt="aji" className=" w-32 h-32 object-cover rounded-2xl"/>
					</div>
					<div className="flex-auto sm:ml-5 justify-evenly">
						<div className="flex items-center justify-between sm:mt-2">
							<div className="flex items-center">
								<div className="flex flex-col">
									<div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">Jehane Benadjemia</div>
									<div className="flex-auto text-gray-500 my-1">
										<span className="mr-3 ">jehanebnj@gmail.com</span><span className="mr-3 border-r border-gray-200  max-h-0"></span><span>Paris, France</span>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row items-center">
							<div className="flex">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
									className="h-5 w-5 text-yellow-500">
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
									</path>
								</svg>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
									className="h-5 w-5 text-yellow-500">
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
									</path>
								</svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
									className="h-5 w-5 text-yellow-500">
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
									</path>
								</svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
									className="h-5 w-5 text-yellow-500">
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
									</path>
								</svg>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									stroke="currentColor" className="h-5 w-5 text-yellow-500">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
									</path>
								</svg>
							</div>
							<div className="flex-1 inline-flex  hidden items-center">
								</div>
							</div>
							<div className="flex pt-2 text-sm text-gray-500">
								<div className="flex-1 inline-flex items-center">
									<svg fill="none" className='w-5 h-5 mr-2' stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"/>
                                    </svg>
									<p className="">22/09/1999</p>
								</div>
								{/* <div className="flex-1 inline-flex items-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
										fill="currentColor">
										<path fill-rule="evenodd"
											d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
											clip-rule="evenodd"></path>
									</svg>
									<p className="">14 Soirées effectuées</p>
								</div> */}
								<button  className="text-custom-dark bg-custom-white border-2 border-custom-pastel-purple hover:bg-custom-pastel-purple hover:text-black focus:outline-none font-bold rounded-lg text-sm py-2 px-4 md:py-2 text-center mr-0">Modifier le profil</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    <Link href="#">
                                                    <div
                                                        className="relative w-80 bg-white border border-gray-200 rounded-lg shadow mx-auto hover:-translate-y-3 hover:cursor-pointer hover:scale-105 duration-300">
                                                        <img className="rounded-t-lg h-48 w-full object-cover"
                                                             
                                                             alt=""/>

                                                        <div className="p-5">
                                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Nom jeu</h5>

                                                            <p className="mb-3 font-normal text-gray-700">description</p>
                                                        </div>
                                                    </div>
                                                </Link>
	</div>
                </section>
            </HomeLayout>
        </>
    )
}

