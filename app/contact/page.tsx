"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    mobile: "",
    email: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/automotive-logo.png" alt="Automotive Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gray-900">AUTOMOTIVE</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
              ACCUEIL
            </Link>
            <Link href="/vehicles" className="text-gray-700 hover:text-red-600 transition-colors">
              NOS VOITURES
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-red-600 transition-colors">
              NOS SERVICES
            </Link>
            <a href="#plans" className="text-gray-700 hover:text-red-600 transition-colors">
              NOS PLANS
            </a>
            <Link href="/contact" className="text-red-600 font-medium">
              CONTACT
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium">+216 20 582 807</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mt-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://i.pinimg.com/1200x/af/15/09/af1509b6cc101aa52428466721e1853a.jpg')",
          }}
        ></div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="text-white/80 text-sm mb-4">
            <Link href="/" className="hover:text-white">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span>Nous contacter</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white">Nous contacter</h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-red-600 mb-6">Laissez-nous un message</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Utilisez notre formulaire de contact en ligne pour toute demande. Retrouvez toutes nos informations de
                contact : adresse, téléphone, email. Chat en ligne pour une assistance instantanée.
              </p>
            </div>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom de famille*</label>
                      <Input
                        placeholder="Nom de famille"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Prénom*</label>
                      <Input
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Mobile*</label>
                      <div className="flex">
                        <div className="flex items-center bg-gray-100 px-3 border border-r-0 border-gray-300 rounded-l-md">
                          <span className="text-red-600 font-medium text-sm">🇫🇷</span>
                          <span className="ml-1 text-sm">+216</span>
                        </div>
                        <Input
                          placeholder="Mobile"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          required
                          className="rounded-l-none border-gray-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">E-mail*</label>
                      <Input
                        type="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <Textarea
                      placeholder="Écrire un message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={6}
                      className="border-gray-300 focus:border-red-500 focus:ring-red-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-12 py-3 text-lg font-medium rounded-lg"
                    >
                      Envoyer
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/automotive-logo.png" alt="Automotive Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold">AUTOMOTIVE</span>
              </div>
              <p className="text-gray-400">Votre partenaire de confiance pour la location de véhicules premium.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Liens utiles</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Conditions générales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Location courte durée
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Location longue durée
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Véhicules de luxe
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Nos contacts</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+216 20 582 807</span>
                </div>
                <div className="flex items-center">
                  <span>contact@automotive-rent.fr</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AUTOMOTIVE Rent. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Floating Reservation Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsReservationOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
        >
          Demande de réservation
        </Button>
      </div>

      {/* Reservation Modal */}
      <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <div className="bg-white rounded-lg overflow-hidden">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl font-bold text-center">Réservation</DialogTitle>
            </DialogHeader>

            <div className="p-6 pt-2">
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Lieu de prise en charge */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                    Lieu de prise en charge
                  </label>
                  <Select>
                    <SelectTrigger className="bg-gray-100 border-0">
                      <SelectValue placeholder="Lieu de prise en charge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tunis"> Tunis Carthage</SelectItem>
                      <SelectItem value="Monastir">Aéroport international de Monastir Habib-Bourguiba</SelectItem>
                      <SelectItem value="Enfida">Aéroport international d'Enfidha-Hammamet</SelectItem>
                      <SelectItem value="Tozeur">Aéroport international de Tozeur-Nefta</SelectItem>
                      <SelectItem value="Tabarka">Aéroport international de Tabarka-Aïn Draham</SelectItem>
                      <SelectItem value="Gafsa">	Aéroport international de Gafsa-Ksar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Agence de retour */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                    Agence de retour
                  </label>
                  <Select>
                    <SelectTrigger className="bg-gray-100 border-0">
                      <SelectValue placeholder="Lieu de restitution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tunis"> Tunis Carthage</SelectItem>
                      <SelectItem value="Monastir">Aéroport international de Monastir Habib-Bourguiba</SelectItem>
                      <SelectItem value="Enfida">Aéroport international d'Enfidha-Hammamet</SelectItem>
                      <SelectItem value="Tozeur">Aéroport international de Tozeur-Nefta</SelectItem>
                      <SelectItem value="Tabarka">Aéroport international de Tabarka-Aïn Draham</SelectItem>
                      <SelectItem value="Gafsa">	Aéroport international de Gafsa-Ksar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Date et heure de prise en charge */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Date et heure de prise en charge</label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">13</div>
                        <div className="text-xs text-gray-600">Mar</div>
                        <div className="text-xs text-gray-600">Août</div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                      <div className="flex items-center text-lg font-medium">
                        <Clock className="h-4 w-4 mr-2" />
                        11:00
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date et heure de restitution */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Date et heure de restitution</label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">16</div>
                        <div className="text-xs text-gray-600">Sam</div>
                        <div className="text-xs text-gray-600">Août</div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                      <div className="flex items-center text-lg font-medium">
                        <Clock className="h-4 w-4 mr-2" />
                        11:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton de réservation */}
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-lg">
                Demande de réservation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
