import { useEffect, useState } from "react"
import { Plus, ArrowRight, MessageSquareText, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import fetchApi from "@/lib/api-handler"
import IconChest from "@/components/chest-icon"
import IconLegs from "@/components/legs-icon"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"


export function HistoryPage() {
  const [tab, setTab] = useState("session")
  const [sessions, setSessions] = useState([] as any[])
  const [exercises, setExercises] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)
  const [weight, setWeight] = useState("")

  const navigate = useNavigate()

  const fetchUserSessions = async () => {
    try {
      const response = await fetchApi("/api/sessions?limit=1000&sort=-date_session")
      setSessions(response)
    } catch (error: any) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserExercises = async () => {
    try {
      const response = await fetchApi("/api/exercise-user?limit=1000&sort=-updatedAt")
      setExercises(response)
    } catch (error: any) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLastSessionUser = async () => {
    try {
      const response = await fetchApi(`/api/sessions?limit=1&sort=-createdAt`)
      if (response && response.length > 0) {
        setWeight(response[0].body_weight)
      }
    } catch (error) {
      console.error("Error fetching last session:", error)
    }
  }

  const handleCreateSession = async (e: React.FormEvent, userChoice: string) => {
    e.preventDefault()
    try {
      const response = await fetchApi("/api/sessions", {
        method: "POST",
        body: JSON.stringify({
          date_session: new Date(),
          type_session: userChoice,
          body_weight: weight,
          exercise_user_list: [],
          is_done: false,
          comment: "",
        }),
      })

      const newSessionId = response._id
      navigate(`/history/session/${newSessionId}`)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUserSessions()
    fetchUserExercises()
    fetchLastSessionUser()
  }, [])

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="pt-10">
          <h1 className="mb-5 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">Mes séances</h1>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="session">Séances</TabsTrigger>
            <TabsTrigger value="exercise">Exercices</TabsTrigger>
          </TabsList>
          <TabsContent value="session">
            {isLoading ? (
              Array.from({ length: 15 }).map((_, index) => (
                <div key={index} className="my-2">
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))
            ) : (
              <>
                <Table>
                  <TableCaption>Liste de tes séances passées</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead></TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className=" text-center">Type</TableHead>
                      <TableHead className=" text-center">Exos</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          Aucun séance.
                        </TableCell>
                      </TableRow>
                    ) : (
                      sessions.map((oneSession) => (
                        <TableRow
                          key={oneSession._id}
                          className="group cursor-pointer"
                          onClick={() => navigate(`/history/session/${oneSession._id}`)}
                        >
                          <TableCell>
                            <div
                              className={`h-2.5 w-2.5 rounded-full ${
                                oneSession.is_done ? "bg-green-500" : "bg-orange-500"
                              }`}
                            ></div>
                          </TableCell>
                          <TableCell>
                            <div>
                              {oneSession.comment ? (
                                <MessageSquareText size={16} />
                              ) : (
                                <MessageSquareText className="text-slate-200" size={16} />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{format(new Date(oneSession.date_session), "dd/MM/yyyy")}</TableCell>
                          <TableCell className=" text-center">
                            <Badge
                              variant={
                                oneSession.type_session === "Upper A"
                                  ? "upperA"
                                  : oneSession.type_session === "Upper B"
                                  ? "upperB"
                                  : oneSession.type_session === "Lower"
                                  ? "lower"
                                  : oneSession.type_session === "Séance A"
                                  ? "seanceA"
                                  : oneSession.type_session === "Séance B"
                                  ? "seanceB"
                                  : "default" // Fallback variant in case none of the conditions match
                              }
                            >
                              {oneSession.type_session}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{oneSession.exercise_user_list.length}</TableCell>
                          <TableCell className="items-center justify-center">
                            <ArrowRight className="text-slate-300 group-hover:text-slate-900" size={18} />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {sessions.length === 0 && (
                  <div className="flex flex-1 items-center justify-center">
                    <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
                      <div className="text-center">
                        <p className="max-w-[600px] py-5 text-gray-500 dark:text-gray-400 md:text-xl">Aucune séance.</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
          <TabsContent value="exercise">
            {isLoading ? (
              Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="my-2">
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))
            ) : (
              <>
                <Table>
                  <TableCaption>{exercises.length} exercices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Série</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exercises.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          Aucun exercice.
                        </TableCell>
                      </TableRow>
                    ) : (
                      exercises.map((exercise) => (
                        <TableRow
                          key={exercise._id}
                          className="group cursor-pointer"
                          onClick={() => navigate(`/history/exercise/${exercise._id}`)}
                        >
                          <TableCell>
                            <div>
                              {exercise.comment ? (
                                <MessageSquareText size={16} />
                              ) : (
                                <MessageSquareText className="text-slate-200" size={16} />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{format(new Date(exercise.session.date_session), "dd/MM/yyyy")}</TableCell>
                          <TableCell>{exercise.type?.name}</TableCell>
                          <TableCell>
                            {exercise.rep[0]}x{exercise.weight[0]}
                            <br />
                            {exercise.rep[1]}x{exercise.weight[1]}
                            <br />
                            {exercise.rep[2]}x{exercise.weight[2]}
                          </TableCell>
                          <TableCell className="items-center justify-center">
                            <ArrowRight className="text-slate-300 group-hover:text-slate-900" size={18} />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {exercises.length === 0 && (
                  <div className="flex flex-1 items-center justify-center">
                    <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
                      <div className="text-center">
                        <p className="max-w-[600px] py-5 text-gray-500 dark:text-gray-400 md:text-xl">Aucun exercice.</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
        <Drawer>
          <DrawerTrigger className="select-none " asChild>
            <div className="fixed bottom-20 right-10 cursor-pointer">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner">
                <Plus color="rgb(107 114 128)" className="inline-block" height={40} width={40} strokeWidth={1.5} />
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className="select-none">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="flex justify-between">
                <div>
                  <DrawerTitle>Nouvelle séance</DrawerTitle>
                  <DrawerDescription className="text-gray-500 dark:text-gray-400">
                    Entrainement complet.
                  </DrawerDescription>
                </div>
                <Button>
                  <Loader2 size={20} />
                </Button>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-between space-x-2">
                  <Button
                    onClick={(e) => handleCreateSession(e, "Upper A")}
                    variant="outline"
                    size="icon"
                    className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                  >
                    <p className="mb-1 mt-4 text-lg">Upper A</p>
                    <IconChest className="mt-3" />
                    <span className="sr-only">Upper A</span>
                  </Button>
                  <Button
                    onClick={(e) => handleCreateSession(e, "Lower")}
                    variant="outline"
                    size="icon"
                    className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                  >
                    <p className="mb-1 mt-4 text-lg">Lower</p>
                    <IconLegs className="mt-3" />
                    <span className="sr-only">Lower</span>
                  </Button>
                  <Button
                    onClick={(e) => handleCreateSession(e, "Upper B")}
                    variant="outline"
                    size="icon"
                    className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                  >
                    <p className="mb-1 mt-4 text-lg">Upper B</p>
                    <IconChest className="mt-3" />
                    <span className="sr-only">Upper B</span>
                  </Button>
                  <Button
                    onClick={(e) => handleCreateSession(e, "Séance A")}
                    variant="outline"
                    size="icon"
                    className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                  >
                    <p className="mb-1 mt-4 text-lg">Séance A</p>
                    <IconChest className="mt-3" />
                    <span className="sr-only">Séance A</span>
                  </Button>
                  <Button
                    onClick={(e) => handleCreateSession(e, "Séance B")}
                    variant="outline"
                    size="icon"
                    className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                  >
                    <p className="mb-1 mt-4 text-lg">Séance B</p>
                    <IconChest className="mt-3" />
                    <span className="sr-only">Séance B</span>
                  </Button>
                </div>
                <div className="mt-3 h-2"></div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </main>
    </div>
  )
}

export default HistoryPage
