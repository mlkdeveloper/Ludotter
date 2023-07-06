import Head from 'next/head'
import dynamic from 'next/dynamic'
import {  useEffect } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/Admin';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Admin() {

    interface PaymentData {
        date: string;
        count: number;
    }

    interface Series{
        name: string;
        data: number[];
    }

    const [options, setOptions] = useState({});
    const [optionsDonut, setOptionsDonut] = useState({});
    const [seriesDonut, setSeriesDonut] = useState<number[]>([44, 55]);
    const [labels, setLabels] = useState<string[]>([]);
    const [series, setSeries] = useState<Series[]>([]);

    const supabase = useSupabaseClient()

    
    useEffect( () => {
        document.body.classList.add("bg-custom-light-blue");
    },[]);

    const fetchData = async () => {

         const {data: {session}} = await supabase.auth.getSession();
        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/paymentByDate`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            },
            })
                .then(response => {
                    const statusCode = response.status;
                    return response.json();
                })
                .then((data) => {
                    setOptions({
                        chart: {
                            id: "basic-bar"
                        },
                        xaxis: {
                            categories: data.map( (data: PaymentData) => data.date),
                        }
                    });

                    setSeries([
                         {
                        name: 'Nombre de paiements',
                        data: data.map( (data: PaymentData) => data.count),
                        }
                    ]);
                    
                }).catch((error) => {
                console.log(error);
            });
    }

    const fetchDataDonut = async () => {

         const {data: {session}} = await supabase.auth.getSession();
        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/company/count`, {
                method: 'GET',
                 headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            },
            })
                .then(response => {
                    const statusCode = response.status;
                    return response.json();
                })
                .then((data) => {
    
                    setSeriesDonut([data.users, data.company]);
                    setOptionsDonut({
                        labels: ['Utilisateurs', 'Entreprises'],
                    });
    
                }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchData();
        fetchDataDonut();
    }, []);

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
                <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                        <h3 className="text-base font-light text-gray-500 dark:text-gray-400">Nombre de paiement par date</h3>
                        </div>
                    </div>
                    {(typeof window !== 'undefined') &&
                        <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width="500"
                        />
                    }
                    </div>

                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                        <h3 className="text-base font-light text-gray-500 dark:text-gray-400">Utilisateurs / Entreprises</h3>
                        </div>
                    </div>
                    {(typeof window !== 'undefined') &&
                        
                        <Chart
                        options={optionsDonut}
                        series={seriesDonut}
                        type="donut"
                        width="500"
                        />
                    }
                    </div>
                </div>
            </div>
            </AdminLayout>
        </>
    )
}


