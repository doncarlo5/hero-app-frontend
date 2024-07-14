import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import TrophyComponent from "@/components/trophy-component"

function TrophyPage() {
  return (
    <div className="">
      <div className="">
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

          <TrophyComponent />
        </main>
      </div>
    </div>
  )
}

export default TrophyPage
