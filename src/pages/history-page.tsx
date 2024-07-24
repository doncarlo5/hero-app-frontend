import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ArrowRight, MessageSquareText, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

import fetchApi from "@/lib/api-handler"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import NewSessionButton from "@/components/new-session-button"

export function HistoryPage() {
  const [tab, setTab] = useState("session")
  const [sessions, setSessions] = useState([] as any[])
  const [exercises, setExercises] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const fetchUserSessions = async () => {
    try {
      const response = await fetchApi("/api/sessions?limit=1000&sortBy=date_session:desc");
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

  useEffect(() => {
    fetchUserSessions()
    fetchUserExercises()
  }, [])

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex max-w-lg flex-col pb-20">
        <div className="pt-10">
          <h1 className="mb-5 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">Mes séances</h1>
        </div>
        <Tabs value={tab} onValueChange={setTab}>
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
                  <TableCaption>Total de {sessions.length} séances.</TableCaption>
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
                {!isLoading && exercises.length === 0 && (
                  <div className="flex flex-1 items-center justify-center">
                    <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
                      <div className="text-center">
                        <p className="max-w-[600px] py-5 text-gray-500 dark:text-gray-400 md:text-xl">
                          Aucun exercice.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
        <NewSessionButton
          Children={
            <div className="fixed bottom-20 right-10 cursor-pointer">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner">
                <Plus color="rgb(107 114 128)" className="inline-block " height={40} width={40} strokeWidth={1.5} />
              </div>
            </div>
          }
        />
      </main>
    </div>
  )
}

export default HistoryPage
