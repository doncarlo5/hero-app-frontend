import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Navbar } from "@/components/navbar"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"

function WorkoutPage() {
  return (
    <div className="">
      <div className="">
        <Navbar />
        <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
          <div className="flex items-center pt-5">
            <Link to="/">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="ml-5 text-3xl font-medium">Programme</h1>
            </div>
          </div>

          <div className="pt-5">
            <h2 className=" text-center tracking-tight">Entrainement complet (x3)</h2>

            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-1">
                <AccordionTrigger>Lundi - Upper A</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableCaption>Lundi - Upper A</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs font-medium tracking-tighter">EXERCICE</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE1</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE2</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE3</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">REPOS</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">COMMENTAIRE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Développé Incliné</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-light">6-8 rép</TableCell>
                        <TableCell className=" font-light">8-10 rép</TableCell>
                        <TableCell className=" font-mono text-xs">2’30”</TableCell>
                        <TableCell className=" text-xs">Top set puis -10% du poids à chaque série</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Tractions Lestées</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-light">6-8 rép</TableCell>
                        <TableCell className=" font-light">8-10 rép</TableCell>
                        <TableCell className=" font-mono text-xs">2’</TableCell>
                        <TableCell className=" text-xs">Top set puis -10% du poids à chaque série</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Élévations Frontales</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-mono text-xs">1’30”</TableCell>
                        <TableCell className=" text-xs">Pic de contraction 2” en haut</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Curl Incliné Haltères</TableCell>
                        <TableCell className=" font-light">8-12 rép</TableCell>
                        <TableCell className=" font-light">8-12 rép</TableCell>
                        <TableCell className=" font-light">8-12 rép</TableCell>
                        <TableCell className=" font-mono text-xs">1’30”</TableCell>
                        <TableCell className=" text-xs">/</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Élévations Latérales</TableCell>
                        <TableCell className=" font-light">15-20 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">8-10 triche into upright row</TableCell>
                        <TableCell className=" font-mono text-xs">1’</TableCell>
                        <TableCell className=" text-xs">Dernière série en dégressive mécanique</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Mercredi - Lower</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableCaption>Mercredi - Lower</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs font-medium tracking-tighter">EXERCICE</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE1</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE2</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE3</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">REPOS</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">COMMENTAIRE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">High Bar Squat ou Deadlift</TableCell>
                        <TableCell className=" font-light">6-10 RÉP</TableCell>
                        <TableCell className=" font-light">6-10 RÉP</TableCell>
                        <TableCell className=" font-light">6-10 RÉP</TableCell>
                        <TableCell className=" font-mono text-xs">2’</TableCell>
                        <TableCell className=" text-xs">/</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Romanian Deadlift ou Fentes</TableCell>
                        <TableCell className=" font-light">10-15 RÉP</TableCell>
                        <TableCell className=" font-light">10-15 RÉP</TableCell>
                        <TableCell className=" font-light">10-15 RÉP</TableCell>
                        <TableCell className=" font-mono text-xs">1’30”</TableCell>
                        <TableCell className=" text-xs">/</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Leg Curl Superset Leg Extension</TableCell>
                        <TableCell className=" font-light">8-12 RÉP</TableCell>
                        <TableCell className=" font-light">8-12 RÉP</TableCell>
                        <TableCell className=" font-light">8-12 RÉP</TableCell>
                        <TableCell className=" font-mono text-xs">30”</TableCell>
                        <TableCell className=" text-xs">Se reposer 30” entre chaque exercice</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Extensions Mollets</TableCell>
                        <TableCell className=" font-light">12-15 RÉP</TableCell>
                        <TableCell className=" font-light">8-12 RÉP</TableCell>
                        <TableCell className=" font-light">6-10 RÉP puis dégressive AMRAP</TableCell>
                        <TableCell className=" font-mono text-xs">1’</TableCell>
                        <TableCell className=" text-xs">Tempo 1-2-2-1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Upright Row Penché</TableCell>
                        <TableCell className=" font-light">15-20 RÉP</TableCell>
                        <TableCell className=" font-light">10-15 RÉP</TableCell>
                        <TableCell className=" font-light">6-10 RÉP puis dégressive AMRAP</TableCell>
                        <TableCell className=" font-mono text-xs">1’</TableCell>
                        <TableCell className=" text-xs">Augmenter le poids à chaque série</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Vendredi - Upper B</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableCaption>Vendredi - Upper B</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs font-medium tracking-tighter">EXERCICE</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE1</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE2</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE3</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">REPOS</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">COMMENTAIRE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Overhead Press</TableCell>
                        <TableCell className=" font-light">4-6 RÉP</TableCell>
                        <TableCell className=" font-light">6-8 RÉP</TableCell>
                        <TableCell className=" font-light">8-10 RÉP</TableCell>
                        <TableCell className=" font-mono text-xs">2’30”</TableCell>
                        <TableCell className=" text-xs">Top set puis -10% du poids à chaque série</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Développé Couché</TableCell>
                        <TableCell className=" font-light">4-6 RÉP</TableCell>
                        <TableCell className=" font-light">6-8 RÉP</TableCell>
                        <TableCell className=" font-light">8-10 RÉP</TableCell>
                        <TableCell className=" font-mono text-xs">2’</TableCell>
                        <TableCell className=" text-xs">Top set puis -10% du poids à chaque série</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Tractions Neutres Focus Bras</TableCell>
                        <TableCell className=" font-light">8-12 RÉP</TableCell>
                        <TableCell className=" font-light">8-12 RÉP</TableCell>
                        <TableCell className=" font-light">8-12 RÉP</TableCell>
                        <TableCell className=" font-mono text-xs">1’30”</TableCell>
                        <TableCell className=" text-xs">Tirer avec les bras, pas avec le dos</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Oiseau Assis Prise Neutre</TableCell>
                        <TableCell className=" font-light">10-15 RÉP</TableCell>
                        <TableCell className=" font-light">10-15 RÉP</TableCell>
                        <TableCell className=" font-light">10-15 RÉP</TableCell>
                        <TableCell className=" font-mono text-xs">1’</TableCell>
                        <TableCell className=" text-xs">Coudes perpendiculaires au corps</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Upright Row</TableCell>
                        <TableCell className=" font-light">12-15 RÉP</TableCell>
                        <TableCell className=" font-light">8-12 RÉP</TableCell>
                        <TableCell className=" font-light">6-10 RÉP puis dégressive AMRAP</TableCell>
                        <TableCell className=" font-mono text-xs">1’</TableCell>
                        <TableCell className=" text-xs">Augmenter le poids à chaque série</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="pt-5">
            <h2 className=" text-center tracking-tight">Entrainement minimalite (x2)</h2>
            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-4">
                <AccordionTrigger>Séance A</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableCaption>Séance A</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs font-medium tracking-tighter">EXERCICE</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE1</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE2</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE3</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">REPOS</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">COMMENTAIRE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Développé Incliné</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-light">6-8 rép</TableCell>
                        <TableCell className=" font-light">8-10 rép</TableCell>
                        <TableCell className=" font-mono text-xs">2’30”</TableCell>
                        <TableCell className=" text-xs">Top set puis -10% du poids à chaque série</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Tractions Lestées Prise Neutre</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-light">6-8 rép</TableCell>
                        <TableCell className=" font-light">8-10 rép</TableCell>
                        <TableCell className=" font-mono text-xs">2’</TableCell>
                        <TableCell className=" text-xs">Top set puis -10% du poids à chaque série</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">ATG Split Squat</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-mono text-xs"> 45"/côté</TableCell>
                        <TableCell className=" text-xs">/</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Upright Row</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-mono text-xs">1’</TableCell>
                        <TableCell className=" text-xs">/</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Curl Incliné</TableCell>
                        <TableCell className=" font-light">10-15 rép & 4-6 rép</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-mono text-xs"> 10" entre chaque</TableCell>
                        <TableCell className=" text-xs">1 méga série</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Séance B</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableCaption>Séance B</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs font-medium tracking-tighter">EXERCICE</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE1</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE2</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">SÉRIE3</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">REPOS</TableHead>
                        <TableHead className="text-xs font-medium tracking-tighter">COMMENTAIRE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Dips Lestés</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-light">6-8 rép</TableCell>
                        <TableCell className=" font-light">8-10 rép</TableCell>
                        <TableCell className=" font-mono text-xs">2’30”</TableCell>
                        <TableCell className=" text-xs">Top set puis -10% du poids à chaque série</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Rowing Bucheron</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-light">6-8 rép</TableCell>
                        <TableCell className=" font-light">8-10 rép</TableCell>
                        <TableCell className=" font-mono text-xs">1’ / côté</TableCell>
                        <TableCell className=" text-xs">Top set puis -10% du poids à chaque série</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Romanian Deadlift</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-mono text-xs">1’30”</TableCell>
                        <TableCell className=" text-xs">/</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Upright Row</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-light">10-15 rép</TableCell>
                        <TableCell className=" font-mono text-xs">1’</TableCell>
                        <TableCell className=" text-xs">/</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Extension Triceps Nuque</TableCell>
                        <TableCell className=" font-light">10-15 rép & 4-6 rép</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-light">4-6 rép</TableCell>
                        <TableCell className=" font-mono text-xs">10’’ entre chaque</TableCell>
                        <TableCell className=" text-xs">1 méga série</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </main>
      </div>
    </div>
  )
}

export default WorkoutPage
