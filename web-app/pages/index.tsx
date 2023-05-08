import Head from 'next/head'
import HomeLayout from '@/components/layouts/Home'

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {/* <header>
                <nav
                    className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <img src="https://flowbite.com/images/logo.svg" alt="Flowbite" className="w-8 h-8"/>
                                <span
                                    className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                        <div className="flex md:order-2">
                            <button type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get
                                started
                            </button>
                            <button data-collapse-toggle="navbar-sticky" type="button"
                                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                    aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                             id="navbar-sticky">
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a href="#"
                                       className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                       aria-current="page">Home</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </header> */}
            {/* <main>
                <h1 className={'text-orange-700 text-9xl mt-24'}>Page d'accueil</h1>
            </main> */}
            <HomeLayout>
                <section>
                    <div className="container mx-auto py-12">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="text-center mb-12 md:text-left md:w-2/3 md:pr-10">
                                <h1 className="mb-8 font-medium md:text-3xl xl:text-5xl">Louez, achetez, rejoignez <br/> des parties de jeux de société  !</h1>
                                <button
                                    className="text-white bg-custom-orange hover:bg-custom-hover-orange focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">S'inscrire
                                </button>
                            </div>
                            <div className="hidden md:block md:w-1/3">
                                <img src="./crown.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container mx-auto py-12">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="text-center mb-12 md:text-left md:w-1/3 md:pr-10">
                                <h3 className="mb-8 font-medium md:text-lg xl:text-3xl">Avec LudOtter, vendez, louez et gagnez des cadeaux !</h3>
                            </div>
                            <div className="flex flex-row md:w-2/3">
                                <div className="flex-auto max-w-xs h-96 rounded-3xl overflow-hidden shadow-lg">
                                    <img className="mx-auto" src="./dollar.png" alt=""/>
                                    <div className="my-14">
                                        <div className="text-center	font-bold text-xl mb-2">Vendez</div>
                                    </div>
                                </div>
                                <div className="flex-auto mx-12 my-40 max-w-xs h-96 rounded-3xl overflow-hidden shadow-lg">
                                    <img className="mx-auto" src="./fire.png" alt=""/>
                                    <div className="my-14">
                                        <div className="text-center	font-bold text-xl mb-2">Gagnez</div>
                                    </div>
                                </div>
                                <div className="flex-auto max-w-xs h-96 rounded-3xl overflow-hidden shadow-lg">
                                    <img className="mx-auto" src="./megaphone.png" alt=""/>
                                    <div className="my-14">
                                        <div className="text-center	font-bold text-xl mb-2">Louez</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container mx-auto relative">
                    <div className="absolute top-0 right-0"> <img src="./rocket.png" width={200} alt=""/></div>
                        <div className="w-full bg-custom-dark rounded-lg py-12 px-12">
                            <p className="mb-4 md:text-2xl text-white">Inscrivez-vous maintenant et rejoignez notre communauté de passionnés de jeux de société !</p>
                            <button
                                className="text-white bg-custom-orange hover:bg-custom-hover-orange focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">S'inscrire
                            </button>
                        </div>
                    </div>
                
                </section>
            </HomeLayout>
        </>
)
}
