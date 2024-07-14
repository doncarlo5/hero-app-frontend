import { useEffect, useState } from "react"
import { format } from "date-fns"
import { LucideArrowRight, LucideMessageSquareText } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "./ui/skeleton"
import fetchApi from "@/lib/api-handler"

export function ExerciseComponent() {
  const [exercise, setExercise] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const fetchUserExercises = async () => {
    try {
      const response = await fetchApi("/api/exercise-user?limit=1000&sort=-updatedAt")
      setExercise(response)
    } catch (error) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserExercises()
  }, [])

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return ""
    }
    return format(dateString, "dd/MM/yyyy")
  }

  const handleLink = (id: string) => {
    navigate(`/history/exercise/${id}`)
  }

  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      
        <div>
          <Table className="size-px">
            <TableCaption>{exercise.length} exercices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Série</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? 
                  Array.from({ length: 7 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-4 rounded" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-12 w-[4.5rem]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-16 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                  ))
                : 
                  exercise.map((exercise) => (
                    <TableRow
                      className="group cursor-pointer"
                      onClick={() => handleLink(exercise._id)}
                      key={exercise._id}
                    >
                      <TableCell>
                        <div>
                          {exercise.comment ? (
                            <LucideMessageSquareText size={16} />
                          ) : (
                            <LucideMessageSquareText className="text-slate-200" size={16} />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(exercise.session.date_session)}</TableCell>
                      <TableCell>{exercise.type?.name}</TableCell>
                      <TableCell>
                        {exercise.rep[0]}x{exercise.weight[0]}
                        <br />
                        {exercise.rep[1]}x{exercise.weight[1]}
                        <br />
                        {exercise.rep[2]}x{exercise.weight[2]}
                      </TableCell>
                      <TableCell className="items-center justify-center">
                        <LucideArrowRight className="text-slate-300 group-hover:text-slate-900" size={18} />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      
      {!isLoading && exercise.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">Aucun exercice.</p>
            </div>
            <div className="flex flex-col gap-4 "></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExerciseComponent
