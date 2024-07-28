import React, { useEffect, useState } from "react"
import { LucideWeight } from "lucide-react"
import { useNavigate } from "react-router-dom"

import bodyBack from "../../public/body-back.png"
import bodyFront from "../../public/body-front.png"
import lower from "../../public/lower.png"
import upperBack from "../../public/upper-back.png"
import upperFront from "../../public/upper-front.png"
import fetchApi from "../lib/api-handler"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

function NewSessionButton({ Children }: { Children: any }) {
  const [weight, setWeight] = React.useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [showMinimaliste, setShowMinimaliste] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetchLastSessionUser()
  }, [])

  const fetchLastSessionUser = async () => {
    try {
      const response = await fetchApi(`/api/sessions?limit=1&sortBy=createdAt:desc`);
      if (response && response.length > 0) {
        setWeight(response[0].body_weight)
      } else {
        setShowDialog(true)
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

  return (
    <Drawer>
      <DrawerTrigger className="select-none " asChild>
        {Children}
      </DrawerTrigger>
      <DrawerContent className="select-none ">
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
                    <div className="text-lg mt-2 leading-5">Séance A</div>
                    <img src={bodyFront} alt="bodyFront" className="h-16 w-9" />
                    <span className="sr-only">Séance A</span>
                  </Button>
                  <Button
                    onClick={(e) => handleCreateSession(e, "Séance B")}
                    variant="outline"
                    size="icon"
                    className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                  >
                    <div className="text-lg mt-2 leading-5">Séance B</div>
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
      </DrawerContent>
      {showDialog && (
        <div>
          <DialogContent className="w-11/12 rounded-md">
            <DialogHeader>
              <DialogTitle className="flex items-end text-left ">
                <LucideWeight className="mr-2 " size={20} />
                Combien pèses-tu ?
              </DialogTitle>
              <DialogDescription>
                <div className="text-left text-gray-500 dark:text-gray-400">Renseigne ton poids pour continuer.</div>
              </DialogDescription>
              <DialogDescription className="flex justify-center py-2 ">
                <div className="flex w-3/5 items-end justify-center gap-2 text-xl font-light ">
                  <Input
                    className="w-1/4 "
                    type="number"
                    id="body_weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  KG
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>Valider</Button>
            </DialogFooter>
          </DialogContent>
        </div>
      )}
    </Drawer>
  )
}

export default NewSessionButton
