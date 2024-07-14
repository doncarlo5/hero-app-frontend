import { useContext, useState } from "react"
import { AuthContext } from "@/context/context-wrapper"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import fetchApi from "../lib/api-handler"
import { toast } from "./ui/use-toast"

const SignupComponent = () => {
  const { authenticateUser } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const key = target.id
      const value = target.value
      setFormState({ ...formState, [key]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)

      const response = await fetchApi("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formState),
      })

      localStorage.setItem("token", response.token)
      await authenticateUser()
      navigate("/")
      toast({
        title: "Compte créé.",
        description: "Vous êtes maintenant inscrit.",
      })
    } catch (error: any) {
      setIsLoading(false)
      setError(error.message)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-sm space-y-6 pb-5">
          <div className="mt-5 space-y-2 text-left">
            <h1 className="text-3xl font-bold">S'inscrire</h1>
            <p className="text-gray-500 dark:text-gray-400">Inscrit toi pour continuer.</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="space-y-1">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  placeholder="Johnny"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  placeholder="Bravo"
                  value={formState.lastName}
                  onChange={handleChange}
                  required
                  type="text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johnny.bravo@email.com"
                value={formState.email}
                onChange={handleChange}
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                value={formState.password}
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
                autoComplete="on"
              />
            </div>
            <div className="flex select-none items-center justify-between">
              <div className="flex items-center">
                <input
                  id="showPassword"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label
                  htmlFor="showPassword"
                  className="ml-2 block items-baseline text-sm text-gray-900 dark:text-gray-200"
                >
                  Afficher le mot de passe
                </label>
              </div>
            </div>
            <div className="mt-10 ">
              {isLoading ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Chargement
                </Button>
              ) : (
                <Button className="w-full" type="submit">
                  Inscription
                </Button>
              )}
              {error && (
                <Alert className=" mt-1" variant="destructive">
                  <AlertTitle>Erreur</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
            {/* <div className="flex justify-center">
              <Link to="/">
                <Button variant={"outline"} className="">
                  <Home size={20} strokeWidth={1.1} />
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignupComponent
