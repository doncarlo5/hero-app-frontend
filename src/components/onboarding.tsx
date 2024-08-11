import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import {
  ArrowDown01,
  Brackets,
  Calendar,
  Download,
  Edit,
  LucideActivity,
  Trophy,
} from "lucide-react"
import { FaWeightScale } from "react-icons/fa6"

import exerciseImg from "/exercise.png"
import upperFront from "/upper-front.png"
import { AnimatedCounter } from "./animated-counter"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

type OnboardingModalProps = {
  onClose: () => void
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap())
      })
    }
    currentIndex === 3 && onClose()
  }, [emblaApi])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="relative mt-4 w-10/12 max-w-md overflow-hidden rounded-lg bg-slate-50 shadow-lg">
        <Carousel onClose={onClose} className="w-full" ref={emblaRef}>
          <CarouselContent>
            <CarouselItem className="my-auto flex h-full w-full items-center justify-center" key={0}>
              <div className="p-4 text-center ">
                <h2 className="mb-4 text-xl font-bold">Welcome to Hero App</h2>
                <p className="mb-4">Voici quelques étapes pour prendre en main l'application.</p>
                <p className="animate-tada text-4xl">👋</p>
              </div>
            </CarouselItem>
            <CarouselItem key={1} className=" overflow-hidden">
              <div className="mb-14 mt-4 p-4 ">
                <div className=" ">
                  <div className="relative">
                    <img
                      src={upperFront}
                      alt="Séance type"
                      className=" absolute right-1 -top-24 w-4/12 -z-50 rounded-lg"
                    />
                    <h2 className="mt-10 text-left text-2xl font-bold">Séance</h2>
                    <p className="mb-4 text-left text-sm font-medium leading-snug bg-slate-50 rounded-xl">
                      Lance une séance et choisit le type. <strong>Upper</strong> pour le haut du corps,{" "}
                      <strong>Lower</strong> pour le bas du corps.
                    </p>
                    <div className=" overflow-hidden rounded-xl shadow-xl">
                      <h4 className="bg-slate-200/60 px-3 py-2 text-left text-sm  font-semibold text-gray-500">
                        Information sur la séance
                      </h4>
                      <div className=" space-y-1 rounded-2xl px-1 py-1 pb-3">
                        <div className=" flex ">
                          <Calendar className=" m-4 text-gray-500" strokeWidth={1.1} size={40} />
                          <div className=" text-left">
                            <h3 className=" mt-1 font-bold">Date</h3>
                            <p className=" text-sm font-semibold text-gray-600">
                              La date du jour est entrée automatiquement.
                            </p>
                          </div>
                        </div>
                        <div className=" flex ">
                          <FaWeightScale className=" m-4 overflow-auto text-gray-500" strokeWidth={1.1} size={43} />
                          <div className=" text-left">
                            <h3 className=" mt-1 font-bold">Poids du corps</h3>
                            <p className=" text-sm font-semibold text-gray-600">
                              La mesure du poids du corps est prise le matin à jeun.
                            </p>
                          </div>
                        </div>
                        <div className=" flex ">
                          <Edit className=" m-4 text-gray-500" strokeWidth={1.1} size={41} />
                          <div className=" text-left">
                            <h3 className=" mt-1 font-bold">Notes</h3>
                            <p className=" text-sm font-semibold text-gray-600">
                              La note précédente de la séance sera affichée.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem key={2}>
              <div className="mb-14 mt-4 p-4">
                <div>
                  <div className="relative">
                    <img src={exerciseImg} alt="Exercice" className=" absolute -top-16 right-0 -z-50 w-2/4" />
                    <h2 className="mt-10 bg-slate-50 text-left text-2xl font-bold">Exercice</h2>
                    <p className="mb-4 bg-slate-50 text-left font-medium leading-snug">
                      Les exercices sont spécifiques au type de séance. Tu retrouve tes performances précédentes lors
                      d'un nouvel exercice.
                    </p>
                    <div className=" overflow-hidden rounded-xl shadow-xl">
                      <h4 className="bg-slate-100 px-3 py-2 text-left text-sm font-semibold text-gray-500">
                        Composition d'un exercice
                      </h4>
                      <div className=" space-y-1 rounded-2xl px-1 py-1 pb-3">
                        <div className=" flex ">
                          <ArrowDown01 className=" m-4 text-gray-500" strokeWidth={1.1} size={40} />
                          <div className=" text-left">
                            <h3 className=" mt-1 font-bold">Série</h3>
                            <p className=" text-sm font-semibold text-gray-600">
                              3 ou 4 séries sont à réaliser pour chaque exercice.
                            </p>
                          </div>
                        </div>
                        <div className=" flex ">
                          <Brackets className=" m-4 text-gray-500" strokeWidth={1.1} size={40} />
                          <div className=" text-left">
                            <h3 className=" mt-1 font-bold">Range</h3>
                            <p className=" text-sm font-semibold text-gray-600">
                              Définit un objectif de répétition pour chaque série.
                            </p>
                          </div>
                        </div>
                        <div className=" flex ">
                          <Edit className=" m-4 text-gray-500" strokeWidth={1.1} size={36} />
                          <div className=" text-left">
                            <h3 className=" mt-1 font-bold">Notes</h3>
                            <p className=" text-sm font-semibold text-gray-600">
                              La note précédente de l'exercice sera affichée.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem key={3}>
              <div className="relative p-4 text-center">
                <div>
                  <div className="relative">
                    <h2 className="mb-4 mt-16 text-left text-2xl font-bold">En résumé...</h2>
                    <div className=" flex flex-col gap-2">
                      <div className="h-24 rounded-xl bg-white p-2 px-3 text-gray-800 shadow-md">
                        <div className=" flex h-full items-end justify-between ">
                          <div className=" flex flex-col">
                            <h3 className=" text-left font-semibold">
                              <span className=" text-2xl font-black">
                                <AnimatedCounter type="onboarding" from={0} to={40} />
                              </span>{" "}
                              exercices
                            </h3>
                            <h3 className=" text-left font-semibold">types pré-enregistrés</h3>
                          </div>
                          <div className=" mx-4 my-auto">
                            <Download className="text-gray-500" strokeWidth={1.1} size={40} />
                          </div>
                        </div>
                      </div>
                      <div className="h-24 rounded-xl bg-white p-2 px-3 shadow-md">
                        <div className=" flex h-full items-end justify-between ">
                          <div className=" flex flex-col">
                            <h3 className=" text-left font-semibold">
                              <span className=" text-2xl font-black">
                                <AnimatedCounter type="onboarding" from={0} to={27} />{" "}
                              </span>{" "}
                              trophées à
                            </h3>
                            <h3 className=" text-left font-semibold">gagner pour te challenger</h3>
                          </div>
                          <div className=" mx-4 my-auto">
                            <Trophy className="text-gray-500" strokeWidth={1.1} size={40} />
                          </div>
                        </div>
                      </div>
                      <div className="h-24 rounded-xl bg-white p-2 px-3 shadow-md">
                        <div className=" flex h-full items-end justify-between ">
                          <div className=" flex flex-col">
                            <h3 className=" text-left font-semibold">
                              <span className=" text-2xl font-black">
                                <AnimatedCounter type="onboarding" from={0} to={5} />{" "}
                              </span>{" "}
                              types de séances
                            </h3>
                            <h3 className=" text-left font-semibold"> selon ton programme</h3>
                          </div>
                          <div className=" mx-4 my-auto">
                            <LucideActivity className="text-gray-500" strokeWidth={1.1} size={40} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default OnboardingModal
