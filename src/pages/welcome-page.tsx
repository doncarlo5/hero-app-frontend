// import { Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
        <div className="my-auto flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">Hero App</h1>
          </div>

          <div className="flex w-full justify-center">
            <div className="h-[0.05rem] w-1/4 rounded-lg bg-gray-900 dark:bg-gray-800"></div>
          </div>

          <Link to="/signup">
            <BorderRotateButton />
          </Link>
          {/* Outline the purpose of my application */}
          <div className="w-1/3">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="about">
                <AccordionTrigger>About</AccordionTrigger>
                <AccordionContent>
                  <div className="text-gray-500">
                    Hero App is your personalized tracking application for achieving workout goals. Our app is designed
                    to help you create, track, and optimize your fitness journey.
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="founder">
                <AccordionTrigger>Contact</AccordionTrigger>
                <AccordionContent>
                  <div className="text-gray-500">
                    You can contact me at <a href="mailto:contact@hero-app.org">contact@hero-app.org</a>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
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

        {/* Privacy Policy Link */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform text-sm text-gray-500">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </main>
    </div>
  )
}

export default HomePage
