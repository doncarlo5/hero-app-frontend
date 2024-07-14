import { useEffect, useState } from "react"
import { LucideArrowRight, LucideMessageSquareText } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Skeleton } from "./ui/skeleton"
import fetchApi from "@/lib/api-handler"

export function SessionComponent() {
  const [session, setSession] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const fetchUserSessions = async () => {
    try {
      const response = await fetchApi("/api/sessions?limit=1000&sort=-date_session")
      setSession(response)
    } catch (error) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserSessions()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleLink = (id: string) => {
    navigate(`/history/session/${id}`)
  }

  return (
    <>
      <div className="mt-5 flex flex-col items-center justify-center pb-5 ">
        <div>
          <Table>
            <TableCaption>Liste de tes séances passées</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Nbr</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 15 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="me-2 h-2.5 w-2.5 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-4 rounded" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-8" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                  ))
                : session.map((oneSession) => (
                    <TableRow
                      className="group cursor-pointer"
                      onClick={() => handleLink(oneSession._id)}
                      key={oneSession._id}
                    >
                      <TableCell>
                        <div
                          className={`me-2 h-2.5 w-2.5 rounded-full ${oneSession.is_done ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {oneSession.comment ? (
                            <LucideMessageSquareText size={16} />
                          ) : (
                            <LucideMessageSquareText className="text-slate-200" size={16} />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(oneSession.date_session)}</TableCell>
                      <TableCell>{oneSession.type_session}</TableCell>
                      <TableCell className="text-center ">{oneSession.exercise_user_list.length}</TableCell>
                      <TableCell className="w-10 items-center justify-center">
                        <LucideArrowRight className="text-slate-300 group-hover:text-slate-900" size={18} />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {!isLoading && session.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <p className="max-w-[600px] py-5 text-gray-500 dark:text-gray-400 md:text-xl">Aucune séance.</p>
            </div>
            <div className="flex flex-col gap-4 "></div>
          </div>
        </div>
      )}
    </>
  )
}

export default SessionComponent
