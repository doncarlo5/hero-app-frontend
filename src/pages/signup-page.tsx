import { useContext, useState } from "react"
import { AuthContext } from "@/context/context-wrapper"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

import fetchApi from "@/lib/api-handler"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SignupPage = () => {
  const [tab, setTab] = useState("login")
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  })
  const [signupState, setSignupState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const onTabChange = (tab: string) => setTab(tab)

  const handleLoginChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget
    setLoginState((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSignupChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget
    setSignupState((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetchApi("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginState),
      })
      localStorage.setItem("token", response.token)
      await authenticateUser()
      navigate("/")
    } catch (error: any) {
      console.error(error)
      setIsLoading(false)
      setError(error.message || "An error occurred!")
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetchApi("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(signupState),
      })
      localStorage.setItem("token", response.token)
      await authenticateUser()
      navigate("/")
    } catch (error: any) {
      console.error(error)
      setIsLoading(false)
      setError(error.message || "An error occurred!")
      setTimeout(() => setError(""), 3000)
    }
  }

  return (
    <div className="">
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col ">
        <Tabs value={tab} onValueChange={onTabChange} defaultValue={tab} className="pt-5 md:px-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-2 rounded-xl ">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <div className="">
                <div className="mt-5 text-left">
                  <h1 className="text-3xl font-bold">Se connecter</h1>
                  <div className="items mb-5 flex items-baseline gap-1">
                    <p className="text-gray-500 dark:text-gray-400">Tu n'as pas de compte?</p>
                    <Button
                      onClick={() => setTab("signup")}
                      variant={"link"}
                      className="m-0 p-0 text-gray-500 underline dark:text-gray-400"
                    >
                      Créer un compte
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="Ton adresse email"
                        value={loginState.email}
                        onChange={handleLoginChange}
                        required
                        type="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        placeholder="*********"
                        value={loginState.password}
                        onChange={handleLoginChange}
                        required
                        type={showPassword ? "text" : "password"}
                        autoComplete="on"
                      />
                    </div>
                  </div>

                  <div className="flex select-none items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox
                        id="showPassword"
                        checked={showPassword}
                        onCheckedChange={() => setShowPassword(!showPassword)}
                      />
                      <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                        Afficher le mot de passe
                      </label>
                    </div>
                  </div>

                  {isLoading ? (
                    <Button disabled className="w-full">
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Chargement
                    </Button>
                  ) : (
                    <Button className="w-full" type="submit">
                      Connexion
                    </Button>
                  )}
                  {error && (
                    <Alert className="mt-1" variant="destructive">
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignupSubmit}>
              <div className="mx-auto max-w-sm space-y-6 pb-5">
                <div className="mt-5 space-y-2 text-left">
                  <h1 className="text-3xl font-bold">S'inscrire</h1>
                  <p className="text-gray-500 dark:text-gray-400">Renseigne tes informations.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        placeholder="Johnny"
                        value={signupState.firstName}
                        onChange={handleSignupChange}
                        required
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        placeholder="Bravo"
                        value={signupState.lastName}
                        onChange={handleSignupChange}
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
                      value={signupState.email}
                      onChange={handleSignupChange}
                      required
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                      value={signupState.password}
                      onChange={handleSignupChange}
                      required
                      type={showPassword ? "text" : "password"}
                      autoComplete="on"
                    />
                  </div>
                  <div className="flex select-none items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox
                        id="showPassword"
                        checked={showPassword}
                        onCheckedChange={() => setShowPassword(!showPassword)}
                      />
                      <label
                        htmlFor="showPassword"
                        className="ml-2 block items-baseline text-sm text-gray-900 dark:text-gray-200"
                      >
                        Afficher le mot de passe
                      </label>
                    </div>
                  </div>
                  <div className="mt-10">
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
                      <Alert className="mt-1" variant="destructive">
                        <AlertTitle>Erreur</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default SignupPage
