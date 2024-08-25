import { ExerciseType } from "./exerciseType"
import { ExerciseUser } from "./exerciseUser"

export interface Trophy {
    _id: string
    name: string
    exerciseType: ExerciseType
    exerciseUser: ExerciseUser
    repsGoal: number
    weightMultiplier: number
    awardedAt: string | null
    achieved: boolean
    description: string
    repsUser: number
    weightUser: number
    owner: string
    createdAt: string
    updatedAt: string
    __v: number
    trophyType: string
    level: number
    rewardText: string
    bodyWeight: number
  }
  