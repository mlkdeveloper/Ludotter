import Head from 'next/head'
import AdminLayout from "@/components/layouts/Admin";
import Modal from "@/components/Modal";
import 'flowbite';
import { useCallback, useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface CompanyRequest {
    id: number;
    name: string;
    email: string;
    number: number;
    createdAt: string;
}

export default function CompanyRequest() {
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState("")
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [CompanySelected, setCompanySelected] = useState<CompanyRequest | undefined>(undefined);
    const supabase = useSupabaseClient()

    useEffect( () => {
    
        getRequestCompany();
        
    },[]);

    const getRequestCompany = useCallback( async () => {

        const {data: {session}} = await supabase.auth.getSession();
        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/company/request`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            }
        })
        .then(response => response.json())
        .then( (data) => {
            setCompanies(data)
            
        }).catch( (error) =>{
            console.log(error);
            
        });
    },[])

    const deleteCompany = useCallback( async () => {

        const {data: {session}} = await supabase.auth.getSession();
        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/company/${CompanySelected?.id}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            }
        })
        .then(response => response.json())
        .then( (data) => {
            
            if (data.statusCode === 204){
                setSuccess("L'entreprise a bien été refusé.")
                getRequestCompany();
                setError("")
            }else{
                setError(data.response.message)
                setSuccess("")
            }
            setShowDeleteModal(false);
         
        }).catch( (error) =>{
            console.log(error);  
        });
                

    },[CompanySelected])


    const acceptCompany = useCallback( async () => {

        const {data: {session}} = await supabase.auth.getSession();
        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/company/accept/${CompanySelected?.id}`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            }
        })
        .then(response => response.json())
        .then( (data) => {
            
            if (data.statusCode === 200){
                setSuccess("L'entreprise a bien été accepté.")
                getRequestCompany();
                setError("")
            }else{
                setError(data.response.message)
                setSuccess("")
            }
            setShowUpdateModal(false);
         
        }).catch( (error) =>{
            console.log(error);  
        });
                

    },[CompanySelected])

    const openModal = useCallback( async (company:CompanyRequest, isUpdate : boolean) => {
        isUpdate ? setShowUpdateModal(true) :  setShowDeleteModal(true);
        setCompanySelected(company);
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

                        {showModal ? (
                            <>
                            <Modal setShowModal={setShowModal} title="Ajouter une entreprise">
                                <form>
                                    <div className="mb-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-500" placeholder="Nom" required />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end pt-5 border-t border-solid border-slate-200 rounded-b">
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Enregistrer</button>
                                    </div>
                                </form>
                            </Modal>
                            </>
                        ) : null}

                        {showDeleteModal ? (
                            <>
                            <Modal setShowModal={setShowDeleteModal}>
                                <h3 className="mb-5 text-lg font-normal text-gray-500">Voulez-vous vraiment refuser cette entreprise ?</h3>
                                <div className="flex justify-end">
                                    <button onClick={() => deleteCompany()} type="button" className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                                        Refuser
                                    </button>
                                </div>
                            </Modal>
                            </>
                        ) : null}


                        {showUpdateModal ? (
                            <>
                            <Modal setShowModal={setShowUpdateModal}>
                            <h3 className="mb-5 text-lg font-normal text-gray-500">Voulez-vous vraiment accepter cette entreprise ?</h3>
                            <div className="flex justify-end">
                                <button onClick={() => acceptCompany()} type="button" className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                                    Accepter
                                </button>
                            </div>
                            </Modal>
                            </>
                        ) : null}

                    {
                        success !== "" ? 
                            <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span className="sr-only">Check icon</span>
                                </div>
                                <div className="ml-3 text-sm font-normal">{success}</div>
                                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
                                    <span className="sr-only">Close</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                        : ""
                    }   

                    {
                        error !== "" ? 
                        <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Error icon</span>
                            </div>
                            <div className="ml-3 text-sm font-normal">{error}</div>
                            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    
                        : ""
                    }   
                        <div className="flex justify-end">
                            <button  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Ajouter un professionnel</button>
                        </div>

                        <div className="relative overflow-x-auto mt-5">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr className="border-b">
                                        <th scope="col" className="px-6 py-4">
                                            Nom de l'entreprise
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Numéro 
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                { 
                                    companies.map( (company:CompanyRequest,index) => {
                                        return (
                                            <tr>
                                                <td scope="row" className="px-6 py-3 text-gray-900">
                                                    {company.name}
                                                </td>
                                                <td scope="row" className="px-6 py-3 text-gray-900">
                                                    {company.email}
                                                </td>
                                                <td scope="row" className="px-6 py-3 text-gray-900">
                                                    {company.number}
                                                </td>
                                                <td className="px-6 py-3 flex">
            
                                                    <svg onClick={ () => openModal(company, true)} fill="none" className="w-6 h-6 stroke-green-500 cursor-pointer" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>

                                                    <svg onClick={ () => openModal(company, false)} fill="none" className="w-6 h-6 stroke-red-500 cursor-pointer" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
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


