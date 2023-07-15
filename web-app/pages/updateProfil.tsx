import Head from 'next/head'
import HomeLayout from '@/components/layouts/Home'
import {useEffect, useState} from "react";
import UpdateUserProfil from '@/components/profil/UpdateUser'
import UpdateCompanyProfil from '@/components/profil/UpdateCompany';

import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function UpdateProfil() {

    const supabase = useSupabaseClient()
    const [role,setRole] = useState("");
   

    useEffect(() =>
    {
        document.body.classList.add("bg-custom-light-orange");

        const fetchData = async () => {

            const {data: {session}} = await supabase.auth.getSession();
            fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + session?.access_token
                }
            })
                .then(response => response.json())
                .then((data) => {

                    setRole(data[0].role);
                   
                }).catch((error) => {
                console.log(error);
            });
            
        }

    

        fetchData();
     
    
    },[]);

    return (
        <>
            <Head>
                <title>Ludotter</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <HomeLayout>

                
                {
                    role == 'CLIENT' &&  <UpdateUserProfil/> 
                }
                {
                    role == 'COMPANY' &&  <UpdateCompanyProfil/> 
                }
            
            </HomeLayout>
        </>
)
}