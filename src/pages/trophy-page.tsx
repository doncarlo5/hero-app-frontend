import { useEffect, useState } from "react"
import { LockClosedIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

import fetchApi from "@/lib/api-handler"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
import TrophyIcon from "@/components/TrophyIcon"

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
  trophyType: string
  level: number
  rewardText: string
  bodyWeight: number
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

  // Group trophies by exercise type
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

  // Calculate the number of achieved trophies per group
  const groupedTrophiesWithCounts = Object.keys(groupedTrophies).reduce(
    (acc, exerciseTypeName) => {
      const trophies = groupedTrophies[exerciseTypeName]
      const achievedCount = trophies.filter((trophy) => trophy.achieved).length
      const totalCount = trophies.length

      acc[exerciseTypeName] = { trophies, achievedCount, totalCount }
      return acc
    },
    {} as Record<string, { trophies: Trophy[]; achievedCount: number; totalCount: number }>
  )

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

        <Accordion type="multiple" className=" pt-5 ">
          {Object.keys(groupedTrophiesWithCounts).map((exerciseTypeName) => {
            const { trophies, achievedCount, totalCount } = groupedTrophiesWithCounts[exerciseTypeName]
            return (
              <AccordionItem key={exerciseTypeName} value={exerciseTypeName}>
                <AccordionTrigger className=" ">
                  <p>
                    {exerciseTypeName}
                    <span className=" ml-1 text-gray-700 no-underline">
                      ({achievedCount}/{totalCount})
                    </span>
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  {trophies.map((trophy, i) => (
                    <div className=" w-full max-w-sm" key={trophy._id} onClick={() => setSelectedTrophy(trophy)}>
                      <div className="grid">
                        <div
                          className={cn(
                            " ml-9 mt-1 h-10 w-[0.15rem] translate-x-0.5 rounded-full",
                            trophy.achieved ? "bg-teal-700/80" : "bg-gray-200",
                            i === 0 && "hidden"
                          )}
                        ></div>

                        <div className="flex items-center gap-4">
                          <TrophyIcon
                            level={trophy.level}
                            achieved={trophy.achieved}
                            className={`size-20 ${trophy.achieved ? "" : "opacity-30 grayscale"}`}
                          />
                          <div className="space-y-1">
                            {trophy.achieved ? (
                              <div className="text-xl font-semibold capitalize">Trophée {trophy.trophyType}</div>
                            ) : (
                              <div className="mt-1 italic text-gray-500">???</div>
                            )}
                            {trophy.achieved ? (
                              <div className="text-sm">
                                Obtenu le: {trophy.awardedAt ? new Date(trophy.awardedAt).toLocaleDateString() : ""}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {selectedTrophy && (
          <Dialog open={!!selectedTrophy} onOpenChange={() => setSelectedTrophy(null)}>
            <DialogTitle>{""}</DialogTitle>
            <DialogContent className="h-3/5 w-11/12 rounded-3xl sm:max-w-md">
              <DialogDescription>
                {selectedTrophy.achieved ? (
                  <div className=" relative">
                    <motion.div
                      className="absolute left-0 right-0 m-auto size-44"
                      animate={{
                        y: [0, -10, 0], // Move up by 10 units and then back down
                        transition: {
                          duration: 2.5,
                          ease: "easeInOut",
                          repeat: Infinity, // Repeat the animation infinitely
                          repeatType: "loop",
                        },
                      }}
                    >
                      <TrophyIcon
                        level={selectedTrophy.level}
                        achieved={selectedTrophy.achieved}
                        className="absolute -top-16  left-0 right-0 m-auto size-44"
                      />
                    </motion.div>
                    <div className=" flex h-full flex-col justify-between">
                      <div className="mt-28 flex flex-col items-center">
                        <div className=" mb-2 text-4xl font-semibold capitalize text-gray-900 ">
                          {selectedTrophy.rewardText}
                        </div>
                        <div className=" mb-2 px-3 text-center text-gray-600">
                          Tu as obtenu le trophée{" "}
                          <span className=" font-medium capitalize ">{selectedTrophy.trophyType} </span> pour l'exercice{" "}
                          <span className=" font-medium capitalize ">{selectedTrophy.exerciseType.name}</span> avec{" "}
                          {selectedTrophy.repsUser} reps.
                        </div>
                        {/* <div className="mb-2 flex items-center gap-2 rounded-lg border-2 border-double py-1 pl-4 pr-2 text-xs text-gray-700 ">
                          <div>
                            <Link
                              to={`/history/exercise/${selectedTrophy.exerciseUser._id}`}
                              className=" flex items-center gap-2"
                            >
                              <div> Lien vers l'exercice </div>
                              <ChevronRight className="mx-0 h-4 w-4 text-gray-700" />
                            </Link>
                          </div>
                        </div> */}
                      </div>

                      <div className=" mt-1 flex flex-col items-center justify-evenly gap-2 rounded-lg border bg-slate-50 py-1 text-center italic text-gray-500 ">
                        <div>Objectif: {selectedTrophy.description}</div>
                        <div>Rep min requises: {selectedTrophy.repsGoal}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 pb-10">
                    <LockClosedIcon className="mx-auto h-16 w-16 text-gray-500" />
                    <div className="text-lg  font-semibold ">{selectedTrophy.description}</div>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 justify-end">
                  <Button variant="secondary" onClick={() => setSelectedTrophy(null)}>
                    Close
                  </Button>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}

export default TrophyPage
