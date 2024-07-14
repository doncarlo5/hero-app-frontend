import React, { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { ChevronLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
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

const NewType = () => {
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
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

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
      setIsLoading(true)
      const timerValue = parseInt(formState.timer)
      await fetchApi(`/api/exercise-type`, {
        method: 'POST',
        body: JSON.stringify({
          name: formState.name,
          type_session: formState.type_session,
          timer: timerValue,
          repRange1: formState.repRange1,
          repRange2: formState.repRange2,
          repRange3: formState.repRange3,
          advice: formState.advice,
        }),
      })
      navigate(`/profile/type`)
      toast({
        title: "Type d'exercice créé.",
        description: "Vous pouvez maintenant l'ajouter à vos séances.",
      })
    } catch (error: any) {
      setIsLoading(false)
      console.error(error.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-sm space-y-6 p-4">
        <div className="flex items-center space-y-2 text-left">
          <Link to="/profile/type">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Nouveau type </h1>
          </div>
        </div>
        <div className="space-y-4 ">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 px-5 pb-14">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">
                Nom <span className="text-red-800 ">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Ex: Développé couché - Haltères"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="">
                Type de séance <span className="text-red-800 ">*</span>
              </Label>
              <RadioGroup
                required
                onValueChange={handleRadioChange}
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
              <Label className="" htmlFor="timer">
                Temps de repos {`(en secondes)`}
                <span className="text-red-800 "> *</span>
              </Label>
              <Input
                required
                id="timer"
                placeholder="Ex: 120 s"
                value={formState.timer}
                onChange={handleChange}
                type="number"
              />
            </div>
            <div className="col-span-2 space-y-2 rounded-md bg-gray-50 p-5 dark:bg-slate-900 dark:bg-opacity-40">
              <h2 className="col-span-2 text-lg font-medium">{`Objectif Répétitions [Range]`}</h2>

              <div className="space-y-2">
                <Label htmlFor="repRange1">
                  Série 1 <span className="text-red-800 ">*</span>
                </Label>
                <Input
                  required
                  id="repRange1"
                  placeholder="Ex: 4-6"
                  value={formState.repRange1}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className="space-y-2"></div>
              <div className="space-y-2">
                <Label htmlFor="repRange2">
                  Série 2 <span className="text-red-800 ">*</span>
                </Label>
                <Input
                  required
                  id="repRange2"
                  placeholder="Ex: 6-8"
                  value={formState.repRange2}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className="space-y-2"></div>

              <div className="space-y-2">
                <Label htmlFor="repRange3">
                  Série 3 <span className="text-red-800 ">*</span>
                </Label>
                <Input
                  required
                  id="repRange3"
                  placeholder="Ex: 8-10"
                  value={formState.repRange3}
                  onChange={handleChange}
                  type="text"
                />
              </div>
            </div>
            <div className="col-span-2 resize space-y-2">
              <Label htmlFor="advice">Conseil / Note</Label>
              <Textarea
                id="advice"
                placeholder="Rétraction scapulaire, chauffer les poignets, etc."
                value={formState.advice}
                onChange={handleChange}
                maxLength={200}
              />
            </div>
            <div className="col-span-2 pb-5 ">
              {isLoading ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Chargement
                </Button>
              ) : (
                <Button className="col-span-2 w-full" type="submit">
                  Créer
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewType
