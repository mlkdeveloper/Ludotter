import { useState } from 'react'
import Head from 'next/head'
import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Navbar from '@/components/home/Navbar';
import { useRouter } from 'next/router'


export default function ResetPassword() {
  
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const supabaseClient = useSupabaseClient()
    const router = useRouter();
    

   const resetPassword = useCallback(async  (e:any) => {

    e.preventDefault();
    if (password == confirmPassword) {

        const { data, error } = await supabaseClient.auth.updateUser({
            password: password
        });

        if (error) {
            setError('Le lien de réinitialisation a expiré');
        }else {
            router.push('/')
        }
    }else{
        setError('Les mots de passe ne correspondent pas');
    }
    
    },[password, confirmPassword]);

    useEffect(() => {
        document.body.classList.add("bg-custom-light-orange");
    },[]);



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

                {
                        error !== "" ? 
                        <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Error icon</span>
                            </div>
                            <div className="ml-3 text-sm font-normal">{error}</div>
                            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                    
                        : ""
                    }   
                    <div
                        className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                             <div className="flex justify-center mb-5">
                            <img src="./otter.png" alt="logo" className="w-20 h-20"/>
                        </div>
                        <form className="space-y-6" onSubmit={resetPassword}>
                            
                           <div>
                                <label htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
                                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required />
                            </div>
                            <div>
                                <label htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900">Confirmation du mot de passe</label>
                                <input type="password"  placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required />
                            </div>
                            <button type="submit"
                                className="w-full text-white bg-custom-orange hover:bg-custom-hover-orange focus:ring-4 focus:outline-none font-medium rounded-lg text-sm md:text-base px-5 py-2.5 text-center">Envoyer
                            </button>
                        </form>
                        
                    </div>
                </div>
            </main>
        </>
    )
}