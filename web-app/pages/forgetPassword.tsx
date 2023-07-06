import { useState } from 'react'
import Head from 'next/head'
import React, { useEffect } from "react";
import Link from "next/link";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Navbar from '@/components/home/Navbar';
import { AuthError } from '@supabase/gotrue-js';
import { useRouter } from 'next/router';


export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState("")
    const supabaseClient = useSupabaseClient()
    const [success, setSuccess] = useState("")

    const router = useRouter()

    const handleLogin = async (event: any) => {
        event.preventDefault()

        supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_CLIENT_API}/resetPassword`,
        });

        setSuccess("Un email vous a été envoyé pour réinitialiser votre mot de passe")

    }

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
            <Navbar></Navbar>
            <main>
                <div className="grid h-screen place-items-center">
                    <div
                        className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                        <div className="flex justify-center mb-5">
                            <img src="./otter.png" alt="logo" className="w-20 h-20" />
                        </div>
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline"> {success}</span>
                            </div>}

                            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Erreur !</strong>
                                <span className="block sm:inline"> {error}</span>
                            </div>}
                            <div>
                                <label htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="email@exemple.com" required />
                            </div>
                            <button type="submit"
                                className="w-full text-white bg-custom-orange hover:bg-custom-hover-orange focus:ring-4 focus:outline-none font-medium rounded-lg text-sm md:text-base px-5 py-2.5 text-center">
                                Réinitialiser le mot de passe
                            </button>
                        </form>
                    </div >
                </div>
            </main >
        </>
    )
}