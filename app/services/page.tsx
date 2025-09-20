"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Phone, Users, Shield, Clock, Wrench, CreditCard, MapPin, Star, Fuel, Calendar } from "lucide-react"

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState({})
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

  const services = [
    {
      icon: <Wrench className="h-16 w-16 text-orange-500" />,
      title: "Équipements Supplémentaires pour votre Location de Voiture",
      description: "Tout ce dont vous avez besoin pour un voyage parfait",
      details:
        "Siège enfant, GPS, chaînes neige, porte-vélos... Équipements supplémentaires pour améliorer votre expérience de location.",
      buttonText: "VOIR PLUS",
    },
    {
      icon: <Users className="h-16 w-16 text-orange-500" />,
      title: "Services pour les Entreprises",
      description: "Simplifiez la Mobilité avec AUTOMOTIVE",
      details:
        "Contrats de location à long terme pour les entreprises. Solutions de mobilité adaptées aux besoins professionnels.",
      buttonText: "VOIR PLUS",
    },
    {
      icon: <Car className="h-16 w-16 text-orange-500" />,
      title: "Services de Chauffeur",
      description: "Voyagez confortablement avec nos chauffeurs professionnels",
      details:
        "Location de véhicule avec chauffeur pour vos déplacements. Service premium avec chauffeurs expérimentés.",
      buttonText: "VOIR PLUS",
    },
    {
      icon: <Clock className="h-16 w-16 text-orange-500" />,
      title: "Assurance 24/7",
      description: "Une assurance 24/7 pour votre tranquillité d'esprit",
      details:
        "Assistance routière 24h/24 et 7j/7. Une intervention rapide en cas de panne ou d'accident. Assurance complète incluse.",
      buttonText: "VOIR PLUS",
    },
    {
      icon: <Shield className="h-16 w-16 text-orange-500" />,
      title: "Assurance et Protection pour la Location de Véhicules",
      description: "Roulez en toute sérénité",
      details:
        "Toutes les garanties d'assurance adaptées à vos besoins. Protection complète contre les dommages, vol et accidents.",
      buttonText: "VOIR PLUS",
    },
    {
      icon: <Fuel className="h-16 w-16 text-orange-500" />,
      title: "Large Gamme de Véhicules à Louer",
      description: "Un véhicule pour chaque occasion",
      details:
        "Découvrez notre large gamme de véhicules disponibles. Des citadines aux SUV, trouvez le véhicule parfait.",
      buttonText: "VOIR PLUS",
    },
  ]

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
            <Link href="/services" className="text-red-600 font-medium">
              NOS SERVICES
            </Link>
            <a href="#plans" className="text-gray-700 hover:text-red-600 transition-colors">
              NOS PLANS
            </a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">
              CONTACT
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium">+216 20 582 807</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mt-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://i.pinimg.com/1200x/af/15/09/af1509b6cc101aa52428466721e1853a.jpg')",
          }}

          
        ></div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Nos meilleurs services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Découvrez notre gamme de services premium pour une expérience de location exceptionnelle
          </p>
        </div>
      </section>

      {/* Services Description */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            id="services-intro"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible["services-intro"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nos Meilleurs Services pour la Location de Voitures
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Découvrez notre variété de services de location de voitures conçus spécialement pour vos besoins de
              mobilité. Que ce soit pour un voyage d'affaires, des vacances en famille, ou un déplacement personnel,
              nous avons tout ce qu'il faut pour vous accompagner à chaque étape. Faites de votre expérience avec nous
              une expérience inoubliable !
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                id={`service-card-${index}`}
                data-animate
                className={`transform transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`service-card-${index}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group bg-white border-0 shadow-lg">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 leading-tight">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">{service.details}</p>
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 bg-transparent"
                    >
                      {service.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            id="additional-services"
            data-animate
            className={`text-center mb-12 transform transition-all duration-1000 ${
              isVisible["additional-services"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Services Complémentaires</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: <MapPin className="h-8 w-8" />,
                  title: "Livraison à domicile",
                  desc: "Service de livraison gratuit",
                },
                {
                  icon: <Calendar className="h-8 w-8" />,
                  title: "Réservation flexible",
                  desc: "Modification gratuite",
                },
                { icon: <Star className="h-8 w-8" />, title: "Service premium", desc: "Véhicules haut de gamme" },
                {
                  icon: <CreditCard className="h-8 w-8" />,
                  title: "Paiement sécurisé",
                  desc: "Transactions protégées",
                },
              ].map((item, index) => (
                <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-orange-500 mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
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
                  <Link href="/" className="hover:text-white transition-colors">
                    À propos
                  </Link>
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
    </div>
  )
}
