import { useEffect, useState } from "react"
import TrophySvg from "@/assets/trophy"
import { ChevronLeft, TrophyIcon } from "lucide-react"
import { Link } from "react-router-dom"

import fetchApi from "@/lib/api-handler"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"

interface ExerciseType {
  _id: string
  name: string
  advice: string
  timer: number
  repRange1: string
  repRange2: string
  repRange3: string
  type_session: string
  owner: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface ExerciseUser {
  _id: string
  type: string
  weight: number[]
  rep: number[]
  session: string
  owner: string
  comment: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface Trophy {
  _id: string
  name: string
  exerciseType: ExerciseType
  exerciseUser: ExerciseUser
  repsGoal: number
  weightMultiplier: number
  awardedAt: string | null
  achieved: boolean
  description: string
  repsUser: number
  weightUser: number
  owner: string
  createdAt: string
  updatedAt: string
  __v: number
}

function TrophyPage() {
  const [trophies, setTrophies] = useState<Trophy[]>([])
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null)

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const response: Trophy[] = await fetchApi("/api/trophies")
        setTrophies(response)
        console.log("response", response)
      } catch (error) {
        console.error("Error fetching trophies:", error)
      }
    }

    fetchTrophies()
  }, [])

  const groupedTrophies = trophies.reduce(
    (acc, trophy) => {
      if (!acc[trophy.exerciseType.name]) {
        acc[trophy.exerciseType.name] = []
      }
      acc[trophy.exerciseType.name].push(trophy)
      return acc
    },
    {} as Record<string, Trophy[]>
  )

  const getTrophyColors = (name: string) => {
    switch (name.toLowerCase()) {
      case "silver":
        return ["#C0C0C0", "#E0E0E0"]
      case "gold":
        return ["#FFD700", "#FFA500"]
      case "platinum":
        return ["#E5E4E2", "#BCC6CC"]
      case "diamond":
        return ["#B9F2FF", "#00C78C"]
      case "master":
        return ["#FF69B4", "#FF1493"]
      case "grand_master":
        return ["#800080", "#DA70D6"]
      case "challenger":
        return ["#DC143C", "#FF4500"]
      default:
        return ["#FFFFFF", "#000000"]
    }
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="flex items-center pt-5">
          <Link to="/profile">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Trophées</h1>
          </div>
        </div>

        <Accordion type="multiple" className="pt-5">
          {Object.keys(groupedTrophies).map((exerciseTypeName) => (
            <AccordionItem key={exerciseTypeName} value={exerciseTypeName}>
              <AccordionTrigger className="flex w-full justify-between py-2">
                <span className="text-xl font-semibold">{exerciseTypeName}</span>
              </AccordionTrigger>
              <AccordionContent>
                {groupedTrophies[exerciseTypeName].map((trophy) => {
                  const [fromColor, toColor] = getTrophyColors(trophy.name)
                  return (
                    <Card className="my-2 w-full max-w-sm" key={trophy._id} onClick={() => setSelectedTrophy(trophy)}>
                      <CardContent className="grid gap-6 p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              !trophy.achieved && "opacity-20",
                              "flex aspect-square w-12 items-center justify-center rounded-md bg-gradient-to-r p-3"
                            )}
                            style={{
                              backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
                            }}
                          >
                            <TrophySvg className="size-7 text-white" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-xl font-semibold capitalize">{trophy.name}</h3>
                            {trophy.achieved ? (
                              <p className="text-sm">
                                Obtenu le: {trophy.awardedAt ? new Date(trophy.awardedAt).toLocaleDateString() : ""}
                              </p>
                            ) : (
                              <p className="text-sm">Conditions: {trophy.description}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {selectedTrophy && (
          <Dialog open={!!selectedTrophy} onOpenChange={() => setSelectedTrophy(null)}>
            <DialogOverlay className="" />
            <DialogContent className="">
              <div className="w-full max-w-md rounded-lg bg-white p-6">
                <DialogTitle className="text-2xl font-bold">{selectedTrophy.name}</DialogTitle>
                <DialogDescription className="mt-2 text-sm text-gray-500">
                  Conditions: {selectedTrophy.description}
                </DialogDescription>
                <div className="mt-4 space-y-2">
                  <div>Exercise: {selectedTrophy.exerciseType.name}</div>
                  <div>Reps: {selectedTrophy.repsUser}</div>
                  <div>Weight: {selectedTrophy.weightUser}kg</div>
                  <div>
                    Awarded At:{" "}
                    {selectedTrophy.awardedAt ? new Date(selectedTrophy.awardedAt).toLocaleDateString() : ""}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" onClick={() => setSelectedTrophy(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}

export default TrophyPage
