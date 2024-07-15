import { Component, ErrorInfo, ReactNode } from "react"
import { LucideFileWarning } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class CustomErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col">
          <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
            <div className="my-auto flex flex-col items-center gap-5">
              <LucideFileWarning className="h-32 w-32 text-gray-400 dark:text-gray-500" />
              <h1 className="text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">Erreur</h1>
              <p className="max-w-[600px] text-center text-gray-500 dark:text-gray-400 md:text-xl">
                Oops! Something went wrong.
              </p>
              <div className="flex gap-4">
                <Link className="w-[150px]" to="/">
                  <Button className="w-full">Accueil</Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      )
    }

    return this.props.children
  }
}

export default CustomErrorBoundary
