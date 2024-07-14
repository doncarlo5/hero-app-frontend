import useAuth from "@/context/use-auth"

import DashboardComponent from "@/components/dashboard-component"
import { Navbar } from "@/components/navbar"
import NewSessionButton from "@/components/new-session-button"
import { Plus } from "lucide-react"

const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="pt-10 ">
          <h1 className="mb-5 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">
            Profil de {user?.firstName}
          </h1>
        </div>
        <DashboardComponent />
        <NewSessionButton
              Children={
                <div className="fixed bottom-20 right-10 cursor-pointer">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner">
                    <Plus color="rgb(107 114 128)" className="inline-block " height={40} width={40} strokeWidth={1.5} />
                  </div>
                </div>
              }
            />
      </main>
    </div>
  )
}

export default ProfilePage
