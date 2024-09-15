import { useEffect, useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale/fr"
import { LucidePencilRuler, Plus } from "lucide-react"
import { FaDumbbell, FaTrophy, FaWeightScale } from "react-icons/fa6"
import { Link } from "react-router-dom"

import { Trophy } from "@/types/trophy"
import fetchApi from "@/lib/api-handler"
import { AnimatedCounter } from "@/components/animated-counter"
import { Navbar } from "@/components/navbar"
import NewSessionButton from "@/components/new-session-button"
import OnboardingModal from "@/components/onboarding"
import SessionChart from "@/components/session-chart"

import useAuth from "../context/use-auth"

export function HomePage() {
  const { user } = useAuth()
  const [lastSession, setLastSession] = useState([] as any)
  const [allSessions, setAllSessions] = useState([] as any)
  const [isLoading, setIsLoading] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [trophies, setTrophies] = useState([] as any)

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const response: Trophy[] = await fetchApi("/api/trophies")
        setTrophies(response)
        console.log("Trophies", response)
      } catch (error) {
        console.error("Error fetching trophies:", error)
      }
    }

    fetchTrophies()
  }, [])

  const fetchLastSession = async () => {
    try {
      setIsLoading(true)
      const response = await fetchApi(`/api/sessions?limit=1&sortBy=date_session:desc`)
      setLastSession(response[0])
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllSessions = async () => {
    try {
      const response = await fetchApi(`/api/sessions?limit=1000&sortBy=date_session:desc`)
      setAllSessions(response)
    } catch (error: any) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOnboardingClose = async () => {
    try {
      await fetchApi("/api/auth/updateHasSeenOnboarding", {
        method: "PATCH",
      })
      setShowOnboarding(false)
    } catch (error: any) {
      console.error("Error updating onboarding status:", error)
    }
  }

  useEffect(() => {
    fetchLastSession()
    fetchAllSessions()

    if (user && !user.hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [user])

  const calculateAchievedTrophies = (trophies: any) => {
    const achievedTrophies = trophies.filter((trophy: Trophy) => trophy.achieved)
    return achievedTrophies.length
  }

  return (
    <div className="">
      {showOnboarding && <OnboardingModal onClose={handleOnboardingClose} />}
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col ">
        <div className="pt-10  ">
          <h1 className="mb-5 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
            Bienvenue {user?.firstName}
          </h1>
          <div className="flex flex-col gap-4 pb-4 ">
            {isLoading ? (
              <div className="flex h-24 animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <div className="flex h-24 flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg dark:bg-slate-900 dark:bg-opacity-80">
                {lastSession ? (
                  <h2 className="text-lg font-bold ">Dernière séance </h2>
                ) : (
                  <h2 className="text-lg font-bold ">Aucune séance</h2>
                )}
                <div className="flex items-end justify-between text-slate-600 dark:text-gray-400">
                  <span>
                    {lastSession?.date_session && format(new Date(lastSession?.date_session), "dd/MM/yyyy")}
                    {" - "}
                    {lastSession?.type_session && lastSession?.type_session}
                  </span>
                  <Link className=" flex" to="/history">
                    <span className="jus flex rounded-full bg-gray-500/10 px-3 py-0.5 text-sm font-medium text-gray-800 hover:underline">
                      Voir tout →
                    </span>
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
              <div className="flex h-24 animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg ">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <div className="group col-span-2 flex h-32 w-full flex-col justify-between rounded-2xl px-3 bg-slate-100 active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80">
                <div className="flex items-center gap-2 text-sm text-slate-600 pl-3 pt-3 font-medium mb-2">Activités récentes</div>{" "}
                <SessionChart />
              </div>
            )}
            {isLoading ? (
              <div className="flex h-24 animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <Link
                className="group flex h-24 w-full flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
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
              <div className="flex h-24 animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <Link
                className="group flex h-24 w-full flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                to={`/history/session/${lastSession?._id}`}
              >
                <div className="flex items-baseline gap-2 text-sm text-slate-600">
                  <FaWeightScale color="rgb(71 85 105)" className="" height={17} width={17} strokeWidth={2.2} />
                  Poids
                </div>
                <div className=" text-2xl font-medium">
                  {lastSession?.body_weight} <span className=" text-xl font-extralight">KG</span>
                </div>
                <div className="text-xs font-extralight capitalize text-slate-600 ">
                  {lastSession?.date_session &&
                    format(new Date(lastSession?.date_session), "iiii do MMMM yyyy", {
                      locale: fr,
                    })}
                </div>
              </Link>
            )}
            {isLoading ? (
              <div className="flex h-24 animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <Link
                className="group flex h-24 w-full flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                to="/profile/trophy"
              >
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <FaTrophy color="rgb(71 85 105)" className="" height={17} width={17} strokeWidth={2.2} />
                  Total trophées
                </div>
                {/* Display {number of trophy achieved to true} / {total of trophies} */}
                <div className=" text-3xl font-extrabold">
                  <AnimatedCounter from={0} to={calculateAchievedTrophies(trophies)} />
                  /27
                </div>
              </Link>
            )}
            {isLoading ? (
              <div className="flex h-24 animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <Link
                className="group flex h-24 w-full flex-col justify-between rounded-2xl bg-slate-100 px-3 py-3 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                to="/profile/type/new-type"
              >
                <div className=" my-auto flex flex-col items-center justify-center gap-2 text-sm text-slate-600">
                  <div className=" text-center">
                    <p className=" text-gray-500 leading-4">Create a</p> <p className="font-bold leading-4 tracking-tighter">NEW EXERCISE</p>
                  </div>
                  <div className=" flex-none">
                  <LucidePencilRuler color="rgb(71 85 105)" className="" height={30} width={30} strokeWidth={1} />
                  </div>
                </div>
              </Link>
            )}
            <div className=" h-20">

            </div>
            {/* {isLoading ? (
              <div className="col-span-2 flex h-24 w-full animate-pulse flex-row items-center justify-center gap-3 rounded-2xl bg-slate-100 px-3 py-3 shadow-lg">
                <div className=" h-10 w-10 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <Link
                className="group col-span-2 flex h-24 w-full items-center justify-center rounded-2xl bg-slate-100 px-2 py-3 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                to="/profile"
              >
                <div className="flex items-center gap-4 pl-4">
                  <LucideCircleUser color="rgb(107 114 128)" className="" height={35} width={35} strokeWidth={1.5} />
                  <div>
                    <p className="tab tab-whishlist block text-slate-800">
                      Consulte ton <span className="font-bold">profil</span>
                    </p>
                    <p className="text-xs tracking-tighter text-slate-600">
                      Voir tes statistiques et tes derniers trophées obtenus.
                    </p>
                  </div>
                </div>
              </Link>
            )} */}
            <NewSessionButton
              Children={
                <div className="fixed bottom-20 right-10 cursor-pointer  ">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner">
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
