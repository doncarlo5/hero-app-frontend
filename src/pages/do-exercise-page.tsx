import { useEffect, useState } from "react"
import { Accordion, AccordionItem } from "@radix-ui/react-accordion"
import { LockClosedIcon, LockOpen1Icon, ReloadIcon } from "@radix-ui/react-icons"
import { Check, ChevronLeft, Edit, LoaderIcon, LucideInfo, Stars } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import useWakeLock from "react-use-wake-lock"

import fetchApi from "@/lib/api-handler"
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import CountDownTimer from "@/components/countdown-timer"
import { Navbar } from "@/components/navbar"

const DoExercisePage = () => {
  const [oneExerciseType, setOneExerciseType] = useState(null as any)
  const [lastExercise, setLastExercise] = useState(null as any)
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[])
  const [session, setSession] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTypes, setIsLoadingTypes] = useState(true)
  const [showPrefillButton, setShowPrefillButton] = useState(false)

  const [formState, setFormState] = useState({
    rep1: lastExercise?.rep[0] || "",
    rep2: lastExercise?.rep[1] || "",
    rep3: lastExercise?.rep[2] || "",
    weight1: lastExercise?.weight[0] || "",
    weight2: lastExercise?.weight[1] || "",
    weight3: lastExercise?.weight[2] || "",
    comment: lastExercise?.comment || "",
  })

  const navigate = useNavigate()
  const { isLocked, request, release } = useWakeLock()
  const { toast } = useToast()

  const handleLockScreen = () => {
    if (isLocked) {
      release()
      toast({
        title: "Allumage forcé: OFF",
        description: "Votre écran peut s'éteindre.",
        variant: "default",
      })
    } else {
      request()
      toast({
        title: "Allumage forcé: ON",
        description: "Votre écran restera allumé.",
        variant: "success",
      })
    }
  }

  useEffect(() => {
    setFormState({
      rep1: lastExercise?.rep[0] || "",
      weight1: lastExercise?.weight[0] || "",
      rep2: lastExercise?.rep[1] || "",
      weight2: lastExercise?.weight[1] || "",
      rep3: lastExercise?.rep[2] || "",
      weight3: lastExercise?.weight[2] || "",
      comment: "",
    })
  }, [lastExercise])

  const onExerciseTypeChange = async (value: any) => {
    setOneExerciseType(value)
    try {
      const response = await fetchApi(`/api/exercise-user?limit=1&sort=-createdAt&type=${value._id}`)
      setLastExercise(response[0])
    } catch (error: any) {
      console.error("Fetch error: ", error)
    }
  }

  const fetchOneSession = async () => {
    try {
      const response = await fetchApi(`/api/sessions/${sessionId}`)
      return response
    } catch (error: any) {
      console.error("Fetch error: ", error)
    }
  }

  const fetchAllExerciseTypes = async (sessionData: any) => {
    try {
      const response = await fetchApi(`/api/exercise-type?type_session=${sessionData.type_session}&limit=1000`)
      return response
    } catch (error: any) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoadingTypes(false)
    }
  }

  useEffect(() => {
    const init = async () => {
      const sessionData = await fetchOneSession()
      setSession(sessionData)
      const exerciseTypeData = await fetchAllExerciseTypes(sessionData)
      setAllExerciseTypes(exerciseTypeData)
    }
    init()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event
    const key = target.id
    const value = target.value
    setFormState({ ...formState, [key]: value })

    if (key === "weight1") {
      setShowPrefillButton(true)
    }
  }

  const handlePrefillWeights = () => {
    setFormState({
      ...formState,
      weight2: formState.weight1,
      weight3: formState.weight1,
    })
    setShowPrefillButton(false)
  }

  let { sessionId } = useParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)

      const response = await fetchApi("/api/exercise-user", {
        method: "POST",
        body: JSON.stringify({
          type: oneExerciseType._id,
          rep: [formState.rep1, formState.rep2, formState.rep3],
          weight: [formState.weight1, formState.weight2, formState.weight3],
          comment: formState.comment,
          session: sessionId,
        }),
      })

      const updatedSession = {
        exercise_user_list: [...session.exercise_user_list, response._id],
      }

      await fetchApi(`/api/sessions/${sessionId}`, {
        method: "PUT",
        body: JSON.stringify(updatedSession),
      })

      navigate(`/history/session/${sessionId}`)
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-md flex-col">
        <div className="flex items-center justify-between py-5">
          <div className=" flex">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-10/12 rounded-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Retourner à la page précédente ?</AlertDialogTitle>
                  <AlertDialogDescription>Les données seront perdues.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={() => navigate(`/history/session/${session._id}`)}>
                    Continuer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {oneExerciseType ? (
              <h1 className="ml-5 text-xl font-bold md:text-3xl">{oneExerciseType?.name}</h1>
            ) : (
              <h1 className="ml-5 text-xl font-medium md:text-3xl">Nouvel exercice</h1>
            )}
          </div>

          <button className="" type="button" onClick={() => handleLockScreen()}>
            {isLocked ? <LockClosedIcon className="h-6 w-6" /> : <LockOpen1Icon className="h-6 w-6" />}
          </button>
        </div>

        <Select onValueChange={onExerciseTypeChange}>
          <SelectTrigger className="w-full data-[placeholder]:italic data-[placeholder]:text-gray-700 dark:data-[placeholder]:text-white ">
            <SelectValue
              onLoad={() => setIsLoadingTypes(false)}
              placeholder={
                isLoadingTypes ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : "Sélectionner un exercice"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {allExerciseTypes.length === 0 ? (
              <div className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                Veuillez créer un exercice pour ce type de séance.
              </div>
            ) : (
              <SelectGroup>
                {allExerciseTypes.map((type) => (
                  <SelectItem key={type._id} value={type}>
                    {isLoadingTypes ? (
                      <div role="status" className="flex max-w-sm animate-pulse items-center">
                        <div className="mb-2 ml-3 mt-1 h-4 w-64 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    ) : (
                      <p className="dark:text-white">{type.name}</p>
                    )}
                  </SelectItem>
                ))}
              </SelectGroup>
            )}
          </SelectContent>
        </Select>
        <div className="pt-3">{oneExerciseType && <CountDownTimer exerciseTypeTimer={oneExerciseType.timer} />}</div>
        {oneExerciseType?.advice && (
          <Accordion type="single" collapsible className="mb-5 rounded-2xl bg-slate-100">
            <AccordionItem value="advice">
              <AccordionTrigger className="flex h-10 gap-2 px-5 text-left text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <LucideInfo className="size-4" /> <p className="text-left ">Conseil</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3 pt-1 ">{oneExerciseType?.advice}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {oneExerciseType && (
          <form onSubmit={handleSubmit} className="">
            {showPrefillButton && (
              <Button
                variant={"outline"}
                type="button"
                onClick={handlePrefillWeights}
                className="mb-2 w-full cursor-pointer"
              >
                <Stars className="mr-1 h-4 w-4" />
                Toutes les séries à {formState.weight1} KG
              </Button>
            )}
            <div className="flex justify-center rounded-2xl bg-slate-50 py-4 dark:bg-slate-900 dark:bg-opacity-40 md:text-lg">
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500 ">Série</p>
                  <p className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 ">
                    <label className="relative flex cursor-pointer items-center rounded-full " htmlFor="teal">
                      <input
                        placeholder={lastExercise?.rep[0]}
                        type="checkbox"
                        className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-7 w-7 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-8 before:w-8 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-700 checked:bg-teal-700 checked:before:bg-teal-700 hover:before:opacity-10"
                        id="teal"
                      />
                      <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </p>
                  <p className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 ">
                    <label className="relative flex cursor-pointer items-center rounded-full " htmlFor="teal">
                      <input
                        type="checkbox"
                        className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-7 w-7 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-8 before:w-8 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-700 checked:bg-teal-700 checked:before:bg-teal-700 hover:before:opacity-10"
                        id="teal"
                      />
                      <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </p>
                  <p className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 ">
                    <label className="relative flex cursor-pointer items-center rounded-full " htmlFor="teal">
                      <input
                        type="checkbox"
                        className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-7 w-7 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-8 before:w-8 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-700 checked:bg-teal-700 checked:before:bg-teal-700 hover:before:opacity-10"
                        id="teal"
                      />
                      <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500 ">Reps</p>
                  <Input
                    id="rep1"
                    placeholder={lastExercise?.rep[0]}
                    value={formState.rep1}
                    onChange={handleChange}
                    required
                    type="number"
                    className=" text-md w-12 rounded-xl text-center font-medium [appearance:textfield]  focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="rep2"
                    placeholder={lastExercise?.rep[1]}
                    value={formState.rep2}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md w-12  rounded-xl text-center font-medium [appearance:textfield]  focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="rep3"
                    placeholder={lastExercise?.rep[2]}
                    value={formState.rep3}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md w-12  rounded-xl text-center font-medium [appearance:textfield]  focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>

                <div className="flex flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500 ">KG</p>
                  <Input
                    id="weight1"
                    placeholder={lastExercise?.weight[0]}
                    value={formState.weight1}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md w-20 rounded-xl text-center font-medium  [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="weight2"
                    placeholder={lastExercise?.weight[1]}
                    value={formState.weight2}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md w-20  rounded-xl text-center font-medium  [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="weight3"
                    placeholder={lastExercise?.weight[2]}
                    value={formState.weight3}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md w-20  rounded-xl text-center font-medium  [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500 ">{`[Range]`}</p>
                  <p className="text-md flex h-9 w-full items-center justify-center rounded-md bg-transparent px-1 py-1 font-light italic text-gray-700 ">
                    {oneExerciseType?.repRange1}
                  </p>

                  <p className="text-md flex h-9 w-full items-center justify-center rounded-md bg-transparent px-1 py-1 font-light italic text-gray-700 ">
                    {oneExerciseType?.repRange2}
                  </p>
                  <p className="text-md flex h-9 w-full items-center justify-center rounded-md bg-transparent px-1 py-1 font-light italic text-gray-700 ">
                    {oneExerciseType?.repRange3}
                  </p>
                </div>
              </div>
            </div>
            <div className="pb-14 pt-5 ">
              <Accordion
                type="single"
                collapsible
                className="mb-5 rounded-2xl bg-slate-50 dark:bg-slate-900 dark:bg-opacity-40"
              >
                <AccordionItem value="comment">
                  <AccordionTrigger className="flex h-10 gap-2 px-5 text-left text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Edit className="size-4" /> <p>Notes</p>
                      {lastExercise?.comment && (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3 pt-1 ">
                    <Textarea
                      id="comment"
                      placeholder={
                        lastExercise?.comment
                          ? `Note précédente: ${lastExercise?.comment}`
                          : "Note précédente : Aucune."
                      }
                      value={formState.comment}
                      onChange={handleChange}
                      maxLength={200}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="fixed bottom-20 right-10 cursor-pointer">
              {isLoading ? (
                <Button
                  disabled
                  className="flex  h-16 w-16  items-center justify-center rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner"
                >
                  <ReloadIcon className="h-10 w-10 animate-spin" />
                </Button>
              ) : (
                <Button
                  className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner"
                  type="submit"
                >
                  <Check className="h-10 w-10" />
                </Button>
              )}
            </div>
          </form>
        )}
      </main>
    </>
  )
}

export default DoExercisePage
