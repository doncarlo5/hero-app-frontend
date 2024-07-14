import { useEffect, useState } from "react"
import { LucideLoader2 } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import TypeComponent from "@/components/type-component"
import fetchApi from "@/lib/api-handler"

export function TypesList() {
  const [type, setType] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTypes = async () => {
    try {
      const response = await fetchApi("/api/exercise-type?limit=1000&sort=-updatedAt")
      setIsLoading(false)
      setType(response)
    } catch (error: any) {
      console.error("Fetch error: ", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  return (
    <div className="">
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        {isLoading && (
          <div className="mx-auto my-auto">
            <div className="">
              <LucideLoader2 className=" animate-spin" size={32} />
            </div>
          </div>
        )}
        {!isLoading && type.length === 0 && (
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
        )}

        {!isLoading && type.length > 0 && <TypeComponent />}
      </main>
    </div>
  )
}

export default TypesList
