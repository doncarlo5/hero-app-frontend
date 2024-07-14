import { useEffect, useState } from "react"
import { LucideLoader2, PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

import fetchApi from "@/lib/api-handler"
import { Button } from "@/components/ui/button"

import ExerciseTypeCard from "./exercise-type-card"

export function TypeComponent() {
  const [exerciseType, setExerciseType] = useState([] as any[])
  const [filteredExerciseType, setFilteredExerciseType] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)
  const [currentFilter, setCurrentFilter] = useState<string | null>(null)

  const fetchTypes = async () => {
    try {
      const response = await fetchApi("/api/exercise-type?limit=1000&sort=-updatedAt")
      setExerciseType(response)
      setFilteredExerciseType(response)
      setIsLoading(false)
    } catch (error) {
      console.error("Fetch error: ", error)
      setIsLoading(false)
    }
  }

  const handleFilter = (typeSession: string | null) => {
    setCurrentFilter(typeSession)
    if (typeSession) {
      setFilteredExerciseType(exerciseType.filter((type) => type.type_session === typeSession))
    } else {
      setFilteredExerciseType(exerciseType)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  return (
    <>
      {!isLoading && exerciseType.length !== 0 && (
        <div>
          <div className="pt-10 ">
            <h1 className=" text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">Mes exercices</h1>
          </div>
          <div>
            <div className="pb-10 ">
              <div className="">
                <div className="rounded-lg border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 dark:shadow-sm">
                  <div className="mb-4 grid grid-cols-1 gap-4 ">
                    {isLoading ? (
                      <div className="col-span-full flex items-center justify-center">
                        <div className="container flex flex-col items-center justify-center p-20">
                          <div className="">
                            <LucideLoader2 className=" animate-spin" size={32} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className=" mt-5">
                        <div className="mb-4 flex  justify-center">
                          <div className="flex gap-3 ">
                            <Button
                              variant="secondary"
                              className={`w-1/4 border-2 border-transparent ${currentFilter === "Upper A" ? "box-border  border-2 border-slate-400 " : ""}`}
                              onClick={() => handleFilter("Upper A")}
                            >
                              Upper A
                            </Button>
                            <Button
                              variant="secondary"
                              className={`w-1/4 border-2 border-transparent ${currentFilter === "Lower" ? "box-border  border-2 border-slate-400" : ""}`}
                              onClick={() => handleFilter("Lower")}
                            >
                              Lower
                            </Button>
                            <Button
                              variant="secondary"
                              className={`w-1/4 border-2 border-transparent ${currentFilter === "Upper B" ? "box-border  border-2 border-slate-400" : ""}`}
                              onClick={() => handleFilter("Upper B")}
                            >
                              Upper B
                            </Button>
                            <Button
                              variant="secondary"
                              className={`w-1/4 border-2 border-transparent ${currentFilter === null ? "box-border  border-2 border-slate-400" : ""}`}
                              onClick={() => handleFilter(null)}
                            >
                              All
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Link
                            to={`/profile/type/new-type`}
                            className=" bg-slate-50 flex items-center gap-1 justify-center my-2 h-14 text-gray-600 border-dotted w-full rounded-lg border-2 active:translate-y-0.5"
                          >
                            <PlusIcon className="size-5" />
                            <p>Créer un exercice</p>
                          </Link>
                        </div>

                        <div className="flex flex-col gap-4">
                          {filteredExerciseType.map((exerciseType: any) => (
                            <ExerciseTypeCard exerciseType={exerciseType} key={exerciseType._id} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && exerciseType.length === 0 && (
        <div className="flex flex-1 items-center justify-center pb-5">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                Aucun type d'exercice.
                <Link className="w-[150px]" to="/profile/types/new-type">
                  <Button className="w-full ">Créer un exercice</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TypeComponent
