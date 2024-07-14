import React, { useEffect, useState } from "react"
import { UpdateIcon } from "@radix-ui/react-icons"
import { ChevronLeft, Edit, LucideLoader2, LucideTrash } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"

import fetchApi from "../lib/api-handler"

interface FormState {
  id: string
  name: string
  advice: string
  timer: string
  repRange1: string
  repRange2: string
  repRange3: string
  type_session: string
}

const OneType = () => {
  const [isEditable, setIsEditable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [type, setType] = useState<any>({})
  const [formState, setFormState] = useState<FormState>({
    id: "",
    name: "",
    advice: "",
    timer: "",
    repRange1: "",
    repRange2: "",
    repRange3: "",
    type_session: "",
  })

  const { typeId } = useParams()
  const navigate = useNavigate()

  const toggleIsEditable = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditable((current) => !current)
  }

  const fetchOneType = async () => {
    try {
      const response = await fetchApi(`/api/exercise-type/${typeId}`)
      setFormState({
        id: response._id,
        name: response.name,
        advice: response.advice,
        timer: response.timer,
        repRange1: response.repRange1,
        repRange2: response.repRange2,
        repRange3: response.repRange3,
        type_session: response.type_session,
      })
      setType(response)
      setIsLoading(false)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchOneType()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event
    const key = target.id
    const value = target.value
    setFormState({ ...formState, [key]: value })
  }

  const handleRadioChange = (value: string) => {
    setFormState({ ...formState, type_session: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const timerValue = parseInt(formState.timer)
      await fetchApi(`/api/exercise-type/${typeId}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: formState.name,
          advice: formState.advice,
          timer: timerValue,
          repRange1: formState.repRange1,
          repRange2: formState.repRange2,
          repRange3: formState.repRange3,
          type_session: formState.type_session,
        }),
      })
      fetchOneType()
      setIsEditable(false)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetchApi(`/api/exercise-type/${id}`, {
        method: 'DELETE',
      })
      fetchOneType()
      navigate("/type/")
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  return (
    <>
      <Navbar />
      {!isLoading ? (
        <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
          <div className="flex items-center py-5 text-left">
            <Link to="/profile">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="ml-5 text-xl font-medium md:text-3xl">Ton exercice type</h1>
              <h1 className="ml-5 text-xl font-bold md:text-3xl">{type?.name}</h1>
            </div>
          </div>

          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 px-5 pb-14">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="name">Nom de l'exercice</Label>
                <Input
                  id="name"
                  placeholder="`${formState.name}`"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  disabled={!isEditable}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="">Type de séance</Label>
                <RadioGroup
                  required
                  onValueChange={handleRadioChange}
                  disabled={!isEditable}
                  defaultValue={formState.type_session}
                  value={formState.type_session}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Upper A" id="Upper A" />
                    <Label htmlFor="Upper A">Upper A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lower" id="Lower" />
                    <Label htmlFor="Lower">Lower</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Upper B" id="Upper B" />
                    <Label htmlFor="Upper B">Upper B</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2"></div>

              <div className="space-y-2">
                <Label htmlFor="timer">Temps de repos {`(en secondes)`}</Label>
                <Input
                  required
                  id="timer"
                  placeholder="`${formState.timer}`"
                  value={formState.timer}
                  onChange={handleChange}
                  type="number"
                  disabled={!isEditable}
                />
              </div>
              <div className="space-y-2"></div>

              <div className="col-span-2 space-y-2 rounded-md bg-gray-50 p-5 dark:bg-slate-900 dark:bg-opacity-30">
                <h2 className="col-span-2 text-lg font-medium">{`Objectif Répétitions [Range]`}</h2>

                <div className="space-y-2">
                  <Label htmlFor="repRange1">Série 1</Label>
                  <Input
                    required
                    id="repRange1"
                    placeholder={formState.repRange1}
                    value={formState.repRange1}
                    onChange={handleChange}
                    type="text"
                    disabled={!isEditable}
                  />
                </div>
                <div className="space-y-2"></div>
                <div className="space-y-2">
                  <Label htmlFor="repRange2">Série 2</Label>
                  <Input
                    required
                    id="repRange2"
                    placeholder={formState.repRange2}
                    value={formState.repRange2}
                    onChange={handleChange}
                    type="text"
                    disabled={!isEditable}
                  />
                </div>
                <div className="space-y-2"></div>

                <div className="space-y-2">
                  <Label htmlFor="repRange3">Série 3</Label>
                  <Input
                    required
                    id="repRange3"
                    placeholder={formState.repRange3}
                    value={formState.repRange3}
                    onChange={handleChange}
                    type="text"
                    disabled={!isEditable}
                  />
                </div>
              </div>

              <div className="grid grid-flow-col grid-rows-3"></div>

              <div className="col-span-2 resize space-y-2">
                <Label htmlFor="advice">Conseil / Note</Label>
                <Textarea
                  id="advice"
                  placeholder="Pas de conseil."
                  value={formState.advice}
                  onChange={handleChange}
                  maxLength={200}
                  disabled={!isEditable}
                />
              </div>

              <Button variant="outline" onClick={toggleIsEditable} className="col-span-2 w-full">
                <Edit className="mr-2 h-4 w-4 " />
                Modifier
              </Button>

              <div className="col-span-2 flex gap-2 pb-5 ">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"outline"} className="flex-none">
                      <LucideTrash size={20} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-10/12 rounded-md ">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer ce type ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tu ne pourras pas récupérer ce type d'exercice une fois supprimé.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction variant="destructive" onClick={() => handleDelete(formState.id)}>
                        Confirmer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button disabled={!isEditable} className="col-span-2 w-full" type="submit">
                  <UpdateIcon className="mr-2 h-4 w-4 " />
                  Mettre à jour
                </Button>
              </div>
            </form>
          </div>
        </main>
      ) : (
        <div className="container flex flex-col items-center justify-center p-20">
          <div className="">
            <LucideLoader2 className=" animate-spin" size={32} />
          </div>
        </div>
      )}
    </>
  )
}

export default OneType
