import { useEffect, useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale/fr"
import { LucideCircleUser, Plus } from "lucide-react"
import { FaDumbbell, FaWeightScale } from "react-icons/fa6"
import { Link } from "react-router-dom"

import fetchApi from "@/lib/api-handler"
import { AnimatedCounter } from "@/components/animated-counter"
import { Navbar } from "@/components/navbar"
import NewSessionButton from "@/components/new-session-button"

import useAuth from "../context/use-auth"

export function HomePage() {
  const { user } = useAuth()

  const [lastSession, setLastSession] = useState([] as any)
  const [allSessions, setAllSessions] = useState([] as any)
  const [isLoading, setIsLoading] = useState(false)

  const fetchLastSession = async () => {
    try {
      setIsLoading(true)
      const response = await fetchApi("/api/sessions?limit=1&sort=-date_session")
      setLastSession(response[0])
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const fetchAllSessions = async () => {
    try {
      const response = await fetchApi("/api/sessions?limit=1000&sort=-date_session")
      setAllSessions(response)
    } catch (error: any) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchLastSession()
    fetchAllSessions()
  }, [])

  return (
    <div className="">
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col ">
        <div className="pt-10 ">
          <h1 className="mb-5 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
            Bienvenue {user?.firstName}
          </h1>
          <div className="flex flex-col gap-4 pb-4 ">
            {isLoading ? (
              <div className="flex h-24 animate-pulse flex-col justify-between rounded-lg bg-slate-100 px-3 py-3 shadow-lg">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <div className="flex h-24 flex-col justify-between rounded-lg bg-slate-100 px-3 py-3  shadow-lg dark:bg-slate-900 dark:bg-opacity-80">
                {lastSession ? (
                  <h2 className="text-lg font-bold ">Dernière séance </h2>
                ) : (
                  <h2 className="text-lg font-bold ">Aucune séance</h2>
                )}{" "}
                <div className="flex items-end justify-between   text-slate-600 dark:text-gray-400">
                  <span>
                    {lastSession?.date_session && format(new Date(lastSession?.date_session), "dd/MM/yyyy")}
                    {" - "}
                    {lastSession?.type_session && lastSession?.type_session}
                  </span>
                  <Link className=" flex" to="/history">
                    <span className="jus flex  text-sm text-teal-500 hover:underline">Voir tout</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 pb-4">
            <h1 className="mt-4 text-2xl font-bold">Progression</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-20">
            {isLoading ? (
              <div className="flex h-24 animate-pulse flex-col justify-between rounded-lg bg-slate-100 px-3 py-3 shadow-lg">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <Link
                className="group flex h-24 w-full  flex-col justify-between rounded-lg bg-slate-100 px-3 py-3 shadow-lg  active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                to="/history"
              >
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <FaDumbbell color="rgb(71 85 105)" className="" height={17} width={17} strokeWidth={2.2} />
                  Total séances
                </div>
                <div className=" text-3xl font-extrabold">
                  <AnimatedCounter from={0} to={allSessions.length} />
                </div>
              </Link>
            )}
            {isLoading ? (
              <div className="flex h-24 animate-pulse flex-col justify-between rounded-lg bg-slate-100 px-3 py-3 shadow-lg">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <Link
                className="group flex h-24 w-full  flex-col justify-between rounded-lg bg-slate-100 px-3 py-3 shadow-lg  active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                to={`/history/session/${lastSession?._id}`}
              >
                <div className="flex items-baseline gap-2 text-sm text-slate-600">
                  <FaWeightScale color="rgb(71 85 105)" className="" height={17} width={17} strokeWidth={2.2} />
                  Poids
                </div>
                <div className=" text-2xl font-medium">
                  {lastSession?.body_weight} <span className=" text-xl font-extralight">KG</span>
                </div>
                <div className="text-xs font-extralight text-slate-600 ">
                  {lastSession?.date_session &&
                    capitalizeFirstLetter(
                      format(new Date(lastSession?.date_session), "iiii do MMMM yyyy", {
                        locale: fr,
                      })
                    )}
                </div>
              </Link>
            )}

            {isLoading ? (
              <div className="col-span-2 flex h-24 w-full animate-pulse flex-row items-center justify-center gap-3 rounded-lg bg-slate-100 px-3 py-3 shadow-lg">
                <div className=" h-10 w-10 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <Link
                className="group col-span-2 flex h-24 w-full items-center justify-center rounded-lg bg-slate-100 px-2 py-3 shadow-lg  active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                to="/profile"
              >
                <div className="flex items-center gap-4 pl-4">
                  <LucideCircleUser color="rgb(107 114 128)" className="" height={35} width={35} strokeWidth={1.5} />
                  <div>
                    <p className="tab tab-whishlist block  text-slate-800">
                      Consulte ton <span className="font-bold">profil</span>
                    </p>
                    <p className="text-xs tracking-tighter text-slate-600">
                      Voir tes statistiques et tes derniers trophées obtenus.
                    </p>
                  </div>
                </div>
              </Link>
            )}
            <NewSessionButton
              Children={
                <div className="fixed bottom-20 right-10 cursor-pointer  ">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner">
                    <Plus color="rgb(107 114 128)" className="inline-block " height={40} width={40} strokeWidth={1.5} />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
