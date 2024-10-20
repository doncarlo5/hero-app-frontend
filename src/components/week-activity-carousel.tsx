import { useEffect, useState } from "react"
import { Circle, CircleDashed } from "lucide-react"
import {  subDays, startOfWeek, addDays, isSameDay } from "date-fns"

import fetchApi from "@/lib/api-handler"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

interface SessionType {
  _id: string
  date_session: string
  type_session: string
  is_done: boolean
}

const WeekActivityCarousel = () => {
  const [sessions, setSessions] = useState<SessionType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [api, setApi] = useState<CarouselApi | null>(null)

  const fetchSessions = async () => {
    try {
      setIsLoading(true)
      const response = await fetchApi(`/api/sessions/last-31-days`)
      setSessions(response)
      console.log("last-31-days", response)
    } catch (error) {
      console.error("Error fetching sessions", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  useEffect(() => {
    if (!api) return
  }, [api])

  const getWeeks = () => {
    const today = new Date()
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 }) // Start on Monday
    return [2, 1, 0].map(weekOffset => {
      const weekStart = subDays(currentWeekStart, 7 * weekOffset)
      return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
    })
  }

  const hasSessionOnDay = (date: Date) => {
    return sessions.some(session => isSameDay(new Date(session.date_session), date))
  }

  const weeks = getWeeks()
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"] // French abbreviations

  const renderSkeletonLoader = () => {
    return (
      <div>
        {[0].map((week) => (
          <div key={week} className="flex justify-between">
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <div key={day} className="flex flex-col items-center gap-0.5">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-4" />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="week-carousel">
      {isLoading ? (
        renderSkeletonLoader()
      ) : (
        <div>
          <Carousel setApi={setApi} opts={{ startIndex: 2, loop: false }}>
            <CarouselContent>
              {weeks.map((week, weekIndex) => (
                <CarouselItem key={weekIndex} className="week-slide">
                  <div className="flex justify-between">
                    {week.map((date, dayIndex) => {
                      const isActive = hasSessionOnDay(date)

                      return (
                        <div key={dayIndex} className="flex flex-col items-center gap-0.5">
                          {isActive ? (
                            <Circle className="h-6 w-6 fill-teal-500/20 text-teal-600" />
                          ) : (
                            <CircleDashed className="h-6 w-6 text-gray-300" />
                          )}
                          <p className="text-sm text-gray-700">{daysOfWeek[dayIndex]}</p>
                       
                        </div>
                      )
                    })}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  )
}

export default WeekActivityCarousel
