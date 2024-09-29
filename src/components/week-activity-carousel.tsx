import { useEffect, useState } from "react"
import { Circle, CircleDashed } from "lucide-react"

import fetchApi from "@/lib/api-handler"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

interface SessionType {
  date_session: string
  type_session: string
}

const WeekActivityCarousel = () => {
  const [sessions, setSessions] = useState<SessionType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [api, setApi] = useState<CarouselApi | null>(null) // Carousel API reference
  const [current, setCurrent] = useState(0) // Current slide index
  const [count, setCount] = useState(0) // Total slide count

  console.log(current, count)

  // Fetch user sessions for the last four weeks
  const fetchSessions = async () => {
    try {
      setIsLoading(true)
      const response = await fetchApi(`/api/sessions?lastFourWeeks=true`)
      setSessions(response)
    } catch (error) {
      console.error("Error fetching sessions", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  // Track carousel state
  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length) // Total slides
    setCurrent(api.selectedScrollSnap() + 1) // Current slide index (starts at 0)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1) // Update current slide when user scrolls
    })
  }, [api])

  // Helper to group sessions by week and day
  const getLastThreeWeeks = () => {
    const today = new Date()
    let weeks = []

    // Reverse loop to show most recent week first
    for (let i = 2; i >= 0; i--) {
      let weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay() - i * 7) // Start of week
      let weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6) // End of week

      weeks.push({
        start: weekStart,
        end: weekEnd,
      })
    }

    return weeks
  }

  // Helper to check if a session occurred on a particular date
  const hasSessionOnDay = (date: Date) => {
    return sessions.some((session) => {
      const sessionDate = new Date(session.date_session)
      return (
        sessionDate.getDate() === date.getDate() &&
        sessionDate.getMonth() === date.getMonth() &&
        sessionDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const lastThreeWeeks = getLastThreeWeeks() // Get weeks
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"] // Days labels

  return (
    <div className="week-carousel">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Carousel setApi={setApi}>
            <CarouselPrevious />
            <CarouselContent>
              {lastThreeWeeks.map((week, index) => (
                <CarouselItem key={index} className="week-slide">
                  <div className="flex justify-between">
                    {daysOfWeek.map((day, idx) => {
                      const currentDate = new Date(week.start)
                      currentDate.setDate(week.start.getDate() + idx) // Set current day
                      const isActive = hasSessionOnDay(currentDate) // Check if activity exists

                      return (
                        <div key={idx} className="flex flex-col items-center gap-0.5">
                          {isActive ? (
                            <Circle className="h-6 w-6 fill-teal-500/20 text-teal-600" />
                          ) : (
                            <CircleDashed className="h-6 w-6 text-gray-300" />
                          )}
                          <p className=" text-sm text-gray-700">{day}</p>
                        </div>
                      )
                    })}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
          {/* Slide counter */}
          {/* <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div> */}
        </div>
      )}
    </div>
  )
}

export default WeekActivityCarousel
