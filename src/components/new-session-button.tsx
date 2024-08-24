import React, { useEffect, useState } from "react"
import useAuth from "@/context/use-auth"
import { useNavigate } from "react-router-dom"

import upperBack from "../../public/upper-back.png"
import upperFront from "../../public/upper-front.png"
import fetchApi from "../lib/api-handler"
import { Button } from "./ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import bodyBack from "/body-back.png"
import bodyFront from "/body-front.png"
import lower from "/lower.png"

function NewSessionButton({ Children }: { Children: any }) {
  const [bodyWeight, setBodyWeight] = useState(0)

  const [showMinimaliste, setShowMinimaliste] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { contextBodyWeight } = useAuth()
  console.log("contextBodyWeight", contextBodyWeight)

  const navigate = useNavigate()

  useEffect(() => {
    setBodyWeight(contextBodyWeight)
  }, [contextBodyWeight])

  useEffect(() => {
    fetchLastSessionUser()
  }, [])

  const fetchLastSessionUser = async () => {
    try {
      const response = await fetchApi(`/api/sessions?limit=1&sortBy=createdAt:desc`)
      if (response && response.length > 0) {
        setBodyWeight(response[0].body_weight)
      } else {
        setBodyWeight(contextBodyWeight)
      }
    } catch (error) {
      console.error("Error fetching last session:", error)
    }
  }

  const handleCreateSession = async (e: React.FormEvent, userChoice: string) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const response = await fetchApi("/api/sessions", {
        method: "POST",
        body: JSON.stringify({
          date_session: new Date(),
          type_session: userChoice,
          body_weight: bodyWeight,
          exercise_user_list: [],
          is_done: false,
          comment: "",
        }),
      })

      const newSessionId = response._id
      navigate(`/history/session/${newSessionId}`)
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger className="select-none " asChild>
        {Children}
      </DrawerTrigger>
      <DrawerContent className="select-none ">
        {isLoading ? (
          <div className="mx-auto my-20 h-6 w-6 animate-spin rounded-full border-b-2 border-current border-teal-700" />
        ) : (
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-left">Nouvelle séance</DrawerTitle>
              <DrawerDescription className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <Label htmlFor="session-type-switch">
                  {showMinimaliste ? "Entrainement minimaliste (2x/semaine)" : "Entrainement complet (3x/semaine)"}
                </Label>
                <Switch id="session-type-switch" checked={showMinimaliste} onCheckedChange={setShowMinimaliste} />
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-evenly space-x-2">
                {showMinimaliste ? (
                  <>
                    <Button
                      onClick={(e) => handleCreateSession(e, "Séance A")}
                      variant="outline"
                      size="icon"
                      className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                    >
                      <div className="mt-2 text-lg leading-5">Séance A</div>
                      <img src={bodyFront} alt="bodyFront" className="h-16 w-9" />
                      <span className="sr-only">Séance A</span>
                    </Button>
                    <Button
                      onClick={(e) => handleCreateSession(e, "Séance B")}
                      variant="outline"
                      size="icon"
                      className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                    >
                      <div className="mt-2 text-lg leading-5">Séance B</div>
                      <img src={bodyBack} alt="bodyBack" className="h-16 w-9" />
                      <span className="sr-only">Séance B</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={(e) => handleCreateSession(e, "Upper A")}
                      variant="outline"
                      size="icon"
                      className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                    >
                      <div className="mb-1 mt-2 text-lg">Upper A</div>
                      <img src={upperFront} alt="upper-front" className="mb-1 size-14" />
                      <span className="sr-only">Upper A</span>
                    </Button>
                    <Button
                      onClick={(e) => handleCreateSession(e, "Lower")}
                      variant="outline"
                      size="icon"
                      className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                    >
                      <div className="mb-1 mt-2 text-lg">Lower</div>
                      <img src={lower} alt="lower" className="mb-1 h-14 w-12" />
                      <span className="sr-only">Lower</span>
                    </Button>
                    <Button
                      onClick={(e) => handleCreateSession(e, "Upper B")}
                      variant="outline"
                      size="icon"
                      className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                    >
                      <div className="mb-1 mt-2 text-lg">Upper B</div>
                      <img src={upperBack} alt="upper-back" className="mb-1 size-14" />
                      <span className="sr-only">Upper B</span>
                    </Button>
                  </>
                )}
              </div>
              <div className="mt-3 h-2"></div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default NewSessionButton
