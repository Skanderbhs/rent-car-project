"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, Car, Users, Shield, Phone, Mail, CheckCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState({})
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  const handleReservation = (car) => {
    setSelectedCar(car)
    setIsReservationOpen(true)
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="accueil"
        className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/luxury-car-showroom.png')",
          }}
        ></div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div
            id="hero-content"
            data-animate
            className={`transform transition-all duration-1000 ${
              isVisible["hero-content"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Trouvez votre <span className="text-red-500">BONHEUR</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Découvrez notre flotte de véhicules premium pour tous vos déplacements
            </p>
          </div>

          {/* Booking Form */}
          <div
            id="booking-form"
            data-animate
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible["booking-form"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Lieu de prise en charge</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Paris, France" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date de prise en charge</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date de restitution</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-red-600 hover:bg-red-700 h-10">Rechercher</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            id="services-header"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible["services-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nous sommes spécialisés dans la location de voitures. AUTOMOTIVE RENT s'engage à vous fournir des
              expériences de location de véhicules exceptionnelles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Car className="h-12 w-12 text-red-600" />,
                title: "Service Client Exceptionnel",
                description: "Notre équipe dédiée vous accompagne à chaque étape de votre location.",
              },
              {
                icon: <Shield className="h-12 w-12 text-red-600" />,
                title: "Flotte de Véhicules de Qualité",
                description: "Choisissez parmi notre sélection de véhicules récents et bien entretenus.",
              },
              {
                icon: <Clock className="h-12 w-12 text-red-600" />,
                title: "Disponibilité 24h/7j",
                description: "Service de location disponible à toute heure pour votre commodité.",
              },
              {
                icon: <CheckCircle className="h-12 w-12 text-red-600" />,
                title: "Réservation en Ligne",
                description: "Système de réservation simple et sécurisé en quelques clics.",
              },
            ].map((service, index) => (
              <div
                key={index}
                id={`service-${index}`}
                data-animate
                className={`transform transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`service-${index}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Fleet Section */}
      <section id="voitures" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div
            id="fleet-header"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible["fleet-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos bons plans</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection de véhicules premium à des tarifs exceptionnels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dacia Sandero Stepway",
                price: "À partir de 25€/jour",
                image: "/dacia-sandero-stepway.png",
                features: ["5 places", "Climatisation", "GPS inclus"],
              },
              {
                name: "MG 5",
                price: "À partir de 35€/jour",
                image: "/mg-5-sedan.png",
                features: ["5 places", "Automatique", "Bluetooth"],
              },
              {
                name: "Renault Clio",
                price: "À partir de 30€/jour",
                image: "/renault-clio-red.png",
                features: ["5 places", "Économique", "Moderne"],
              },
            ].map((car, index) => (
              <div
                key={index}
                id={`car-${index}`}
                data-animate
                className={`transform transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`car-${index}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                    <p className="text-2xl font-bold text-red-600 mb-4">{car.price}</p>
                    <div className="space-y-2 mb-4">
                      {car.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleReservation(car)}>
                      Réserver maintenant
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section id="auth" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            id="auth-header"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible["auth-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Accédez à votre espace</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connectez-vous ou créez votre compte pour gérer vos réservations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div
              id="user-auth"
              data-animate
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible["user-auth"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Users className="h-16 w-16 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl">Espace Client</CardTitle>
                  <CardDescription>Accédez à votre compte pour réserver et gérer vos locations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/auth/login?type=user" className="block">
                    <Button className="w-full" size="lg">
                      Se connecter
                    </Button>
                  </Link>
                  <Link href="/auth/register?type=user" className="block">
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      Créer un compte
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div
              id="admin-auth"
              data-animate
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible["admin-auth"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Shield className="h-16 w-16 text-red-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl">Espace Administrateur</CardTitle>
                  <CardDescription>Interface de gestion pour les administrateurs du système</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/auth/login?type=admin" className="block">
                    <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                      Connexion Admin
                    </Button>
                  </Link>
                  <Link href="/auth/register?type=admin" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                      size="lg"
                    >
                      Créer un compte Admin
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
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
                  <span>+33 01 23 45 67 89</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contact@automotive-rent.fr</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Automotive Rent. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <div className="bg-white rounded-lg overflow-hidden">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl font-bold text-center">Réservation - {selectedCar?.name}</DialogTitle>
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
                      <SelectItem value="paris">Paris Centre</SelectItem>
                      <SelectItem value="orly">Aéroport Orly</SelectItem>
                      <SelectItem value="cdg">Aéroport CDG</SelectItem>
                      <SelectItem value="lyon">Lyon</SelectItem>
                      <SelectItem value="marseille">Marseille</SelectItem>
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
                      <SelectItem value="paris">Paris Centre</SelectItem>
                      <SelectItem value="orly">Aéroport Orly</SelectItem>
                      <SelectItem value="cdg">Aéroport CDG</SelectItem>
                      <SelectItem value="lyon">Lyon</SelectItem>
                      <SelectItem value="marseille">Marseille</SelectItem>
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
