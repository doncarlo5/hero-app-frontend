import React, { useEffect, useState } from "react"
import { CalendarIcon, InfoCircledIcon } from "@radix-ui/react-icons"
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
  const [formState, setFormState] = useState<FormState>({
    id: "",
    date_session: "",
    type_session: "",
    body_weight: "",
    exercise_user_list: [],
    is_done: false,
    comment: "",
  })

  const { sessionId } = useParams()
  const navigate = useNavigate()

  const fetchOneSession = async () => {
    try {
      const response = await fetchApi(`/api/sessions/${sessionId}`)
      setFormState({
        id: response._id,
        date_session: response.date_session,
        type_session: response.type_session,
        body_weight: response.body_weight,
        exercise_user_list: response.exercise_user_list,
        is_done: response.is_done,
        comment: response.comment,
      })
      setSession(response)
      setIsLoading(false)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchOneSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)
      await fetchApi(`/api/sessions/${sessionId}`, {
        method: 'PUT',
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
        method: 'PUT',
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
        method: 'DELETE',
      })
      fetchOneSession()
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

  const handleSaveComment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetchApi(`/api/sessions/${sessionId}`, {
        method: 'PUT',
        body: JSON.stringify({ comment: formState.comment }),
      })
      toast({
        title: "Commentaire enregistré.",
      })
    } catch (error: any) {
      console.error(error.message)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du commentaire.",
      })
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
            <h1 className="ml-5 text-2xl font-medium md:text-4xl">Ta séance </h1>
            <h1 className="ml-5 text-2xl font-bold md:text-4xl">{session?.type_session}</h1>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-5">
                <InfoCircledIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-4" align="start">
              <p className="text-sm text-gray-500">
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
              </p>
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
                        format(formState.date_session, "PPP", { locale: fr })
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

                    // disabled={!isEditable}
                  />{" "}
                  <Weight className="absolute right-1.5 top-0 m-2.5 h-4 w-4 text-muted-foreground opacity-50" />
                </div>
              </div>
            </div>

            <div className=" flex flex-col items-center justify-center ">
              {isLoading ? (
                <div className="container flex flex-col items-center justify-center p-20 md:grid md:grid-cols-2">
                  <div className="">
                    <LucideLoader2 className=" animate-spin" size={32} />
                  </div>
                </div>
              ) : (
                formState.exercise_user_list.map((exercise: any) => (
                  <ExerciseCard exercise={exercise} key={exercise._id} />
                ))
              )}
              <Link
                to={`/history/session/${sessionId}/do-exercise`}
                className="relative my-2 w-11/12 flex h-14 items-center justify-center gap-2 rounded-2xl border-dotted border-2  bg-slate-100/20 px-3 py-2 shadow-md active:translate-y-0.5 active:shadow-none dark:bg-slate-900 dark:bg-opacity-40 md:text-lg"
              >
                <Plus className=" text-gray-600 size-5" />
                <p className=" text-gray-600">Ajouter un exercice</p>
                
              </Link>
            </div>
            <div className="col-span-2 mb-2 resize space-y-2">
              <Label htmlFor="comment">Notes</Label>
              <div className="flex items-center gap-5 ">
                <Textarea
                  id="comment"
                  placeholder=""
                  value={formState.comment}
                  onChange={handleCommentChange}
                  maxLength={200}
                  className="h-full w-4/5"
                />
                {formState.comment ? (
                  <Button className="h-full w-1/6 rounded-full" onClick={handleSaveComment}>
                    <SaveIcon className="size-5 " />
                  </Button>
                ) : (
                  <Button disabled className="h-full w-1/6 rounded-full opacity-20">
                    <SaveIcon className="size-5 text-gray-200 " />
                  </Button>
                )}
              </div>
            </div>

            <div className="col-span-2 flex gap-2 pb-5 ">
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
