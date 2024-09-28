import React, { useEffect, useState } from "react"
import { CalendarIcon, InfoCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { fr } from "date-fns/locale/fr"
import {
  ChevronLeft,
  LucideArrowLeft,
  LucideCheckCircle,
  LucideLoader2,
  LucideTrash,
  Plus,
  SaveIcon,
  Weight,
} from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker"
import { Link, useNavigate, useParams } from "react-router-dom"

import { ProgramType } from "@/types/program.type"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import ExerciseCard from "@/components/exercise-card"
import { Navbar } from "@/components/navbar"

import fetchApi from "../lib/api-handler"

interface FormState {
  id: string
  date_session: string
  type_session: string
  body_weight: string
  exercise_user_list: any[]
  is_done: boolean
  comment?: string
}

const OneSession = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<any>({})
  const [lastSession, setLastSession] = useState<any>({})
  const [formState, setFormState] = useState<FormState>({
    id: "",
    date_session: "",
    type_session: "",
    body_weight: "",
    exercise_user_list: [],
    is_done: false,
    comment: "",
  })
  const [formIsDirty, setFormIsDirty] = useState(false)
  const [program, setProgram] = useState<ProgramType>()

  const { sessionId } = useParams()
  const navigate = useNavigate()

  const fetchLastSessionUser = async () => {
    try {
      const response = await fetchApi(`/api/sessions?limit=2&sortBy=date_session:desc`)
      if (response && response.length > 0) {
        setLastSession(response[1])
      } else {
        setLastSession(null)
      }
    } catch (error) {
      console.error("Error fetching last session:", error)
    }
  }

  const fetchOneSession = async () => {
    try {
      const response = await fetchApi(`/api/sessions/${sessionId}?type_session=${formState.type_session}`)

      console.log("🚀 ~ fetchOneSession ~ response:", response)
      const formStateValues = {
        id: response._id,
        date_session: response.date_session,
        type_session: response.type_session,
        body_weight: response.body_weight,
        exercise_user_list: response.exercise_user_list,
        is_done: response.is_done,
        comment: response.comment,
      }

      setFormState(formStateValues)

      setSession(response)
      return formStateValues
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchProgram = async (typeSession: string) => {
    try {
      const response = await fetchApi(`/api/program/${typeSession}`)
      setProgram(response)
      console.log("🚀 ~ fetchProgram ~ response:", response)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const getNextExercise = () => {
    const completedExercisesIds = formState.exercise_user_list.map((ex) => ex.exerciseType._id)
    const nextExercise = program?.exercises.find((ex) => !completedExercisesIds.includes(ex.exerciseType._id))
    return nextExercise
  }

  useEffect(() => {
    const asyncFunction = async () => {
      const formStateValues = await fetchOneSession()
      fetchProgram(formStateValues?.type_session)
      fetchLastSessionUser()
    }
    asyncFunction()
  }, [])

  useEffect(() => {
    const isDirty = formState.body_weight !== session.body_weight || formState.comment !== session.comment
    setFormIsDirty(isDirty)
  }, [formState, session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)
      await fetchApi(`/api/sessions/${sessionId}`, {
        method: "PUT",
        body: JSON.stringify({
          date_session: formState.date_session,
          type_session: formState.type_session,
          body_weight: formState.body_weight,
          exercise_user_list: formState.exercise_user_list,
          is_done: true,
          comment: formState.comment,
        }),
      })
      fetchOneSession()
      setFormIsDirty(false)
      navigate("/history/")
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  const handleSelectDate: SelectSingleEventHandler = async (date: Date | undefined) => {
    setFormState({ ...formState, date_session: date?.toString() || "" })
    try {
      await fetchApi(`/api/sessions/${sessionId}`, {
        method: "PUT",
        body: JSON.stringify({ date_session: date }),
      })
    } catch (error: any) {
      console.error(error.message)
    }
    setIsCalendarOpen(false)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetchApi(`/api/sessions/${id}`, {
        method: "DELETE",
      })
      navigate("/history/")
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const handleSelectWeight = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const { value } = target
      setFormState({ ...formState, body_weight: value })
    }
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setFormState({ ...formState, comment: value })
  }

  const handleSave = async () => {
    try {
      setIsLoadingSubmit(true)
      await fetchApi(`/api/sessions/${sessionId}`, {
        method: "PUT",
        body: JSON.stringify({
          date_session: formState.date_session,
          type_session: formState.type_session,
          body_weight: formState.body_weight,
          exercise_user_list: formState.exercise_user_list,
          is_done: false,
          comment: formState.comment,
        }),
      })
      fetchOneSession()
      setFormIsDirty(false)
      toast({
        title: "Séance enregistrée",
        description: "Les modifications ont été enregistrées avec succès.",
        variant: "success",
      })
    } catch (error: any) {
      console.error(error.message)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de la séance.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="flex items-center py-5">
          <Link to="/history">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-2xl font-bold md:text-4xl">{session?.type_session}</h1>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-5">
                <InfoCircledIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-4" align="start">
              <div className="text-sm text-gray-500">
                {formState.type_session === "Upper A" && (
                  <ol className="list-inside list-disc">
                    <li>Développé Incliné</li>
                    <li>Tractions Lestées</li>
                    <li>Élévations Frontales</li>
                    <li>Curl Incliné</li>
                    <li>Élévations Latérales</li>
                  </ol>
                )}
                {formState.type_session === "Lower" && (
                  <ol className="list-inside list-disc">
                    <li>Squat</li>
                    <li>Fentes ou Presse</li>
                    <li>Leg Curl/Leg Extension</li>
                    <li>Extensions Mollets</li>
                    <li>Upright Row Penché</li>
                  </ol>
                )}
                {formState.type_session === "Upper B" && (
                  <ol className="list-inside list-disc">
                    <li>Overhead Press</li>
                    <li>Développé Couché</li>
                    <li>Tractions Neutres</li>
                    <li>Oiseau Assis Prise Neutre</li>
                    <li>Upright Row</li>
                  </ol>
                )}
                {formState.type_session === "Séance A" && (
                  <ol className="list-inside list-disc">
                    <li>Développé incliné</li>
                    <li>Traction prise neutre</li>
                    <li>ATG Split Squat</li>
                    <li>Upright Row</li>
                    <li>Curl incliné</li>
                  </ol>
                )}
                {formState.type_session === "Séance B" && (
                  <ol className="list-inside list-disc">
                    <li>Dips lestés</li>
                    <li>Rowing bucheron</li>
                    <li>Romanian deadlift</li>
                    <li>Upright Row</li>
                    <li>Extension Triceps Nuque</li>
                  </ol>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="pb-14">
            <div className="mb-5 flex gap-10 ">
              <div className="flex flex-1 flex-col justify-between gap-2">
                <Label htmlFor="session_date">Date</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !formState.date_session && "text-muted-foreground"
                      )}
                    >
                      {formState.date_session ? (
                        format(new Date(formState.date_session), "d MMM yyyy", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={fr}
                      id="session_date"
                      mode="single"
                      selected={formState.date_session ? new Date(formState.date_session) : undefined}
                      onSelect={handleSelectDate}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className=" flex flex-1 flex-col justify-between gap-2">
                <Label htmlFor="body_weight">{`Ton poids (KG)`}</Label>
                <div className="relative w-full">
                  <Input
                    id="body_weight"
                    placeholder={`${formState.body_weight}`}
                    value={formState.body_weight}
                    onChange={handleSelectWeight}
                    required
                    type="number"
                    onWheel={(e) => e.currentTarget.blur()}
                    className="pr-9"
                  />
                  <Weight className="absolute right-1.5 top-0 m-2.5 h-4 w-4 text-muted-foreground opacity-50" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              {isLoading ? (
                <div className="flex w-full flex-col items-center space-y-2">
                  {Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} className=" h-40 w-11/12 rounded-xl" />
                    ))}
                </div>
              ) : (
                <>
                  {formState.exercise_user_list.map((exercise: any) => (
                    <ExerciseCard exercise={exercise} key={exercise._id} />
                  ))}

                  {/* Suggest the next exercise based on order */}
                  {program && getNextExercise() && (
                    <div className="my-4 w-11/12">
                      <p className="text-center text-lg font-semibold">Suggested Exercise:</p>

                      {/* Main exercise button */}
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          const nextExercise = getNextExercise()
                          if (nextExercise && nextExercise.exerciseType) {
                            navigate(
                              `/history/session/${sessionId}/do-exercise?exerciseId=${nextExercise.exerciseType._id}`
                            )
                          }
                        }}
                        className="my-2 w-full"
                      >
                        {getNextExercise()?.exerciseType?.name}
                      </Button>

                      {/* Alternative exercises buttons */}
                      {(getNextExercise()?.alternatives?.length ?? 0) > 0 && (
                        <>
                          <p className="text-sm text-gray-500">Alternatives:</p>
                          {getNextExercise()?.alternatives?.map((alt) => (
                            <Button
                              variant={"outline"}
                              key={alt._id}
                              onClick={() =>
                                navigate(`/history/session/${sessionId}/do-exercise?exerciseId=${alt._id}`)
                              }
                              className="my-1 w-full"
                            >
                              {alt.name}
                            </Button>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
              <Link
                to={`/history/session/${sessionId}/do-exercise`}
                className="relative my-2 flex h-14 w-11/12 items-center justify-center gap-2 rounded-2xl border-2 border-dotted bg-slate-100/20 px-3 py-2 shadow-md active:translate-y-0.5 active:shadow-none dark:bg-slate-900 dark:bg-opacity-40 md:text-lg"
              >
                <Plus className="size-5 text-gray-600" />
                <p className="text-gray-600">Sélectionner un exercice</p>
              </Link>
            </div>
            <div className="col-span-2 mb-2 space-y-2">
              <Label htmlFor="comment">Notes</Label>
              <div className="flex items-center gap-5">
                <Textarea
                  id="comment"
                  placeholder={
                    lastSession?.comment ? `Note précédente: ${lastSession?.comment}` : "Note précédente : Aucune."
                  }
                  value={formState.comment}
                  onChange={handleCommentChange}
                  maxLength={200}
                  className="h-full w-full"
                />
                <div className="fixed bottom-20 right-10 cursor-pointer">
                  {formIsDirty &&
                    (isLoadingSubmit ? (
                      <Button
                        disabled
                        className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner"
                      >
                        <ReloadIcon className="h-10 w-10 animate-spin" />
                      </Button>
                    ) : (
                      <Button
                        className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner"
                        onClick={() => handleSave()}
                      >
                        <SaveIcon className="h-10 w-10" />
                      </Button>
                    ))}
                </div>
              </div>
            </div>

            <div className="col-span-2 mb-20 flex gap-2 pb-5">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"outline"} className="flex-none">
                    <LucideTrash size={20} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-10/12 rounded-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer cette séance ?</AlertDialogTitle>
                    <AlertDialogDescription>Les exercices seront également supprimés.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={() => handleDelete(formState.id)}>
                      Confirmer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {isLoadingSubmit ? (
                <Button disabled className="col-span-3 w-full">
                  <LucideLoader2 className="mr-2 size-5" />
                  Chargement
                </Button>
              ) : formState.is_done ? (
                <Button className="col-span-3 w-full" type="submit">
                  <LucideArrowLeft className="mr-2 size-5" />
                  Retour
                </Button>
              ) : (
                <Button className="col-span-3 w-full" type="submit">
                  <LucideCheckCircle className="mr-2 size-5" />
                  Valider la séance
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default OneSession
