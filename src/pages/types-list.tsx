import { useEffect, useState } from "react"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

import fetchApi from "@/lib/api-handler"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ExerciseTypeCard from "@/components/exercise-type-card"
import { Navbar } from "@/components/navbar"

export function TypesList() {
  const [type, setType] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseType, setExerciseType] = useState([] as any[])
  const [filteredExerciseType, setFilteredExerciseType] = useState([] as any[])
  const [currentFilter, setCurrentFilter] = useState<string | null>(null)

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

  const skeletonLoaders = Array(5).fill(0)

  const fetchTypes = async () => {
    try {
      const response = await fetchApi("/api/exercise-type?limit=1000&sort=-updatedAt")
      setType(response)
      setExerciseType(response)
      setFilteredExerciseType(response)
    } catch (error: any) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoading && type.length === 0) {
    return (
      <div className="">
        <Navbar />
        <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
          <main className="flex flex-1 items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
              <div className="text-center">
                <div className="flex flex-col items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
                  <p>Aucun exercice.</p>
                  <Link className="" to="/profile/type/new-type">
                    <Button className="w-full ">Créer un exercice</Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </main>
      </div>
    )
  }

  return (
    <div className="">
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <>
          <div>
            <div className="pt-10 ">
              <h1 className=" text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">Mes exercices</h1>
            </div>
            <div>
              <div className="pb-10 ">
                <div className="rounded-lg border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 dark:shadow-sm">
                  <div className="mb-4 grid grid-cols-1 gap-4 ">
                    <div className=" mt-5">
                      <div className="mb-4 flex  justify-center">
                        <div className="flex gap-3 ">
                          <Button
                            variant="secondary"
                            className={`w-1/4 border-2 border-transparent ${currentFilter === null ? "box-border  border-2 border-slate-400" : ""}`}
                            onClick={() => handleFilter(null)}
                          >
                            All
                          </Button>
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
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Link
                          to={`/profile/type/new-type`}
                          className=" my-2 flex h-14 w-full items-center justify-center gap-1 rounded-lg border-2 border-dotted bg-slate-50 text-gray-600 active:translate-y-0.5"
                        >
                          <PlusIcon className="size-5" />
                          <p>Créer un exercice</p>
                        </Link>
                      </div>
                      {isLoading ? (
                        <div className="flex w-full flex-col items-center space-y-2">
                          {skeletonLoaders.map((_, index) => (
                            <Skeleton key={index} className=" h-20 w-full rounded-lg" />
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {filteredExerciseType.map((exerciseType: any) => (
                            <ExerciseTypeCard exerciseType={exerciseType} key={exerciseType._id} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </main>
    </div>
  )
}

export default TypesList
