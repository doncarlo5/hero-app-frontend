// import { Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"

// import { Button } from "@/components/ui/button"
// import { useTheme } from "@/components/theme-provider"
import BorderRotateButton from "@/components/ui/border-rotate-button"

export function HomePage() {
  // const { theme, setTheme } = useTheme()

  // const toggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light")
  // }
  return (
    <div className="">
      <main className="container relative mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="my-auto flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">Hero App</h1>
          </div>

          <div className="flex w-full justify-center pb-10">
            <div className="h-[0.05rem] w-1/4 rounded-lg bg-gray-900 dark:bg-gray-800"></div>
          </div>

          <Link to="/signup">
            <BorderRotateButton />
            {/* <Button className="mt-5">Commencer</Button> */}
          </Link>
        </div>

        {/* <div className="absolute bottom-0 right-0 mb-8 mr-8">
          <Button variant={"outline"} className="rounded-full px-4 py-5" onClick={toggleTheme}>
            {theme === "light" ? (
              <>
                <Moon strokeWidth={1.1} size={28} />
              </>
            ) : (
              <>
                <Sun strokeWidth={1.1} size={28} />
              </>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div> */}
      </main>
    </div>
  )
}

export default HomePage
