import useAuth from "@/context/use-auth"
import { LucideAlignJustify, LucideCircleUser, LucideHome, LucideRocket } from "lucide-react"
import { FaHouse } from "react-icons/fa6"
import { NavLink } from "react-router-dom"

function Navbar() {
  const { isLoggedIn } = useAuth()
  const activeLink = "text-slate-900"
  const inactiveLink = "text-slate-950/50"

  const strokeWidthActive = 2.2
  const strokeWidthInactive = 1.7

  const getStrokeWidth = (isActive: any) => (isActive ? strokeWidthActive : strokeWidthInactive)

  return (
    <header className="">
      <div className="">
        <section
          id="bottom-navigation"
          className="fixed inset-x-1 bottom-2 z-10 mx-auto block w-11/12 max-w-2xl rounded-full border-t border-gray-200 bg-white bg-opacity-30 shadow-2xl backdrop-blur-lg backdrop-filter dark:border-none"
        >
          <div id="tabs" className="flex justify-between">
            {!isLoggedIn ? (
              <>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/welcome"
                >
                  {({ isActive }) => (
                    <>
                      <FaHouse strokeWidth={getStrokeWidth(isActive)} className="mb-1 inline-block" size={24} />
                      <span className="tab tab-whishlist block text-xs">Home</span>
                    </>
                  )}
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/signup"
                >
                  {({ isActive }) => (
                    <>
                      <LucideRocket strokeWidth={getStrokeWidth(isActive)} className="mb-1 inline-block" size={24} />
                      <span className="tab tab-whishlist block text-xs">Se connecter</span>
                    </>
                  )}
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/"
                >
                  {({ isActive }) => (
                    <>
                      <FaHouse strokeWidth={getStrokeWidth(isActive)} className="mb-1 inline-block" size={24} />
                      <span className="tab tab-whishlist block text-xs">Home</span>
                    </>
                  )}
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/history"
                >
                  {({ isActive }) => (
                    <>
                      <LucideAlignJustify
                        strokeWidth={getStrokeWidth(isActive)}
                        className="mb-1 inline-block"
                        size={24}
                      />
                      <span className="tab tab-whishlist block text-xs">Séances</span>
                    </>
                  )}
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    (isActive ? activeLink : inactiveLink) +
                    " inline-block w-full justify-center pb-1 pt-2 text-center hover:text-teal-500 focus:text-teal-500"
                  }
                  to="/profile"
                >
                  {({ isActive }) => (
                    <>
                      <LucideCircleUser
                        fill="#f8fafc"
                        strokeWidth={getStrokeWidth(isActive)}
                        className="mb-1 inline-block"
                        size={24}
                      />
                      <span className="tab tab-whishlist block text-xs">Profil</span>
                    </>
                  )}
                </NavLink>
              </>
            )}
          </div>
        </section>
      </div>
    </header>
  )
}

export { Navbar }
