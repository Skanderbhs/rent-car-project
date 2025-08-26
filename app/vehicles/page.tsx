"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Car, Users, Fuel, Settings, Phone, ArrowLeft, Luggage, Hash, Clock } from "lucide-react"

export default function VehiclesPage() {
  const [isVisible, setIsVisible] = useState({})
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedVehicleType, setSelectedVehicleType] = useState("all")
  const [selectedGearbox, setSelectedGearbox] = useState("all")
  const [selectedEnergy, setSelectedEnergy] = useState("all")
  const [selectedPassengers, setSelectedPassengers] = useState("all")
  const [selectedTrunkCapacity, setSelectedTrunkCapacity] = useState("all")
  const [selectedHashtag, setSelectedHashtag] = useState("all")
  const [sortBy, setSortBy] = useState("Availability")
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [reservationData, setReservationData] = useState({
    pickupLocation: "",
    returnLocation: "",
    pickupDate: "",
    pickupTime: "11:00",
    returnDate: "",
    returnTime: "11:00",
  })
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

  // ... existing vehicles data ...
  const vehicles = [
    {
      id: 1,
      name: "DACIA SANDERO",
      subtitle: "STEPWAY PETROL-LPG MANUAL",
      brand: "Dacia",
      type: "SUV",
      gearbox: "Manual",
      energy: "Petrol-LPG",
      passengers: 5,
      luggage: 4,
      consumption: "5.8 - 7.4 L/100km",
      trunkCapacity: "Medium",
      hashtag: "Economy",
      price: "32",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "17/09/2025",
      available: true,
    },
    {
      id: 2,
      name: "DACIA DUSTER III",
      subtitle: "JOURNEY 4X2 HYBRID PETROL AUTOMATIC",
      brand: "Dacia",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Hybrid",
      passengers: 5,
      luggage: 6,
      consumption: "5.1 L/100km",
      trunkCapacity: "Large",
      hashtag: "Hybrid",
      price: "41",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "21/09/2025",
      available: true,
    },
    {
      id: 3,
      name: "DACIA DUSTER III",
      subtitle: "EXTREME 4X2 HYBRID PETROL AUTOMATIC",
      brand: "Dacia",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Hybrid",
      passengers: 5,
      luggage: 6,
      consumption: "5.1 L/100km",
      trunkCapacity: "Large",
      hashtag: "Premium",
      price: "41",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "21/09/2025",
      available: true,
    },
    {
      id: 4,
      name: "RENAULT CLIO",
      subtitle: "EVOLUTION PETROL MANUAL",
      brand: "Renault",
      type: "Hatchback",
      gearbox: "Manual",
      energy: "Petrol",
      passengers: 5,
      luggage: 3,
      consumption: "5.2 L/100km",
      trunkCapacity: "Small",
      hashtag: "Economy",
      price: "28",
      image: "/renault-clio-red.png",
      availableFrom: "15/09/2025",
      available: true,
    },
    {
      id: 5,
      name: "RENAULT CAPTUR",
      subtitle: "EVOLUTION PETROL AUTOMATIC",
      brand: "Renault",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Petrol",
      passengers: 5,
      luggage: 4,
      consumption: "6.1 L/100km",
      trunkCapacity: "Medium",
      hashtag: "Comfort",
      price: "35",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "18/09/2025",
      available: true,
    },
    {
      id: 6,
      name: "RENAULT ARKANA",
      subtitle: "EVOLUTION HYBRID AUTOMATIC",
      brand: "Renault",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Hybrid",
      passengers: 5,
      luggage: 5,
      consumption: "4.8 L/100km",
      trunkCapacity: "Large",
      hashtag: "Hybrid",
      price: "45",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "22/09/2025",
      available: true,
    },
    {
      id: 7,
      name: "PEUGEOT 208",
      subtitle: "ACTIVE PETROL MANUAL",
      brand: "Peugeot",
      type: "Hatchback",
      gearbox: "Manual",
      energy: "Petrol",
      passengers: 5,
      luggage: 3,
      consumption: "5.0 L/100km",
      trunkCapacity: "Small",
      hashtag: "Economy",
      price: "30",
      image: "/peugeot-208-compact-car.png",
      availableFrom: "16/09/2025",
      available: true,
    },
    {
      id: 8,
      name: "PEUGEOT 2008",
      subtitle: "ALLURE PETROL AUTOMATIC",
      brand: "Peugeot",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Petrol",
      passengers: 5,
      luggage: 4,
      consumption: "5.8 L/100km",
      trunkCapacity: "Medium",
      hashtag: "Comfort",
      price: "38",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "19/09/2025",
      available: true,
    },
    {
      id: 9,
      name: "PEUGEOT 3008",
      subtitle: "ALLURE HYBRID AUTOMATIC",
      brand: "Peugeot",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Hybrid",
      passengers: 5,
      luggage: 6,
      consumption: "4.5 L/100km",
      trunkCapacity: "Large",
      hashtag: "Premium",
      price: "48",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "23/09/2025",
      available: true,
    },
    {
      id: 10,
      name: "CITROËN C3",
      subtitle: "FEEL PETROL MANUAL",
      brand: "Citroën",
      type: "Hatchback",
      gearbox: "Manual",
      energy: "Petrol",
      passengers: 5,
      luggage: 3,
      consumption: "5.3 L/100km",
      trunkCapacity: "Small",
      hashtag: "Economy",
      price: "29",
      image: "/renault-clio-red.png",
      availableFrom: "17/09/2025",
      available: true,
    },
    {
      id: 11,
      name: "CITROËN C4",
      subtitle: "SHINE PETROL AUTOMATIC",
      brand: "Citroën",
      type: "Hatchback",
      gearbox: "Automatic",
      energy: "Petrol",
      passengers: 5,
      luggage: 4,
      consumption: "5.9 L/100km",
      trunkCapacity: "Medium",
      hashtag: "Comfort",
      price: "36",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "20/09/2025",
      available: true,
    },
    {
      id: 12,
      name: "CITROËN C5 AIRCROSS",
      subtitle: "SHINE HYBRID AUTOMATIC",
      brand: "Citroën",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Hybrid",
      passengers: 7,
      luggage: 7,
      consumption: "4.7 L/100km",
      trunkCapacity: "Large",
      hashtag: "Family",
      price: "52",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "25/09/2025",
      available: true,
    },
    {
      id: 13,
      name: "VOLKSWAGEN POLO",
      subtitle: "LIFE PETROL MANUAL",
      brand: "Volkswagen",
      type: "Hatchback",
      gearbox: "Manual",
      energy: "Petrol",
      passengers: 5,
      luggage: 3,
      consumption: "5.1 L/100km",
      trunkCapacity: "Small",
      hashtag: "Economy",
      price: "33",
      image: "/peugeot-208-compact-car.png",
      availableFrom: "18/09/2025",
      available: true,
    },
    {
      id: 14,
      name: "VOLKSWAGEN T-CROSS",
      subtitle: "LIFE PETROL AUTOMATIC",
      brand: "Volkswagen",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Petrol",
      passengers: 5,
      luggage: 5,
      consumption: "6.0 L/100km",
      trunkCapacity: "Medium",
      hashtag: "Comfort",
      price: "42",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "21/09/2025",
      available: true,
    },
    {
      id: 15,
      name: "VOLKSWAGEN TIGUAN",
      subtitle: "LIFE HYBRID AUTOMATIC",
      brand: "Volkswagen",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Hybrid",
      passengers: 7,
      luggage: 6,
      consumption: "4.9 L/100km",
      trunkCapacity: "Large",
      hashtag: "Premium",
      price: "55",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "26/09/2025",
      available: true,
    },
    {
      id: 16,
      name: "FORD FIESTA",
      subtitle: "TITANIUM PETROL MANUAL",
      brand: "Ford",
      type: "Hatchback",
      gearbox: "Manual",
      energy: "Petrol",
      passengers: 5,
      luggage: 3,
      consumption: "5.4 L/100km",
      trunkCapacity: "Small",
      hashtag: "Economy",
      price: "31",
      image: "/renault-clio-red.png",
      availableFrom: "19/09/2025",
      available: true,
    },
    {
      id: 17,
      name: "FORD PUMA",
      subtitle: "TITANIUM HYBRID AUTOMATIC",
      brand: "Ford",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Hybrid",
      passengers: 5,
      luggage: 4,
      consumption: "4.6 L/100km",
      trunkCapacity: "Medium",
      hashtag: "Hybrid",
      price: "44",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "22/09/2025",
      available: true,
    },
    {
      id: 18,
      name: "FORD KUGA",
      subtitle: "TITANIUM HYBRID AUTOMATIC",
      brand: "Ford",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Hybrid",
      passengers: 7,
      luggage: 6,
      consumption: "5.0 L/100km",
      trunkCapacity: "Large",
      hashtag: "Family",
      price: "50",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "24/09/2025",
      available: true,
    },
    {
      id: 19,
      name: "OPEL CORSA",
      subtitle: "EDITION PETROL MANUAL",
      brand: "Opel",
      type: "Hatchback",
      gearbox: "Manual",
      energy: "Petrol",
      passengers: 5,
      luggage: 3,
      consumption: "5.2 L/100km",
      trunkCapacity: "Small",
      hashtag: "Economy",
      price: "27",
      image: "/peugeot-208-compact-car.png",
      availableFrom: "16/09/2025",
      available: true,
    },
    {
      id: 20,
      name: "OPEL CROSSLAND",
      subtitle: "EDITION PETROL AUTOMATIC",
      brand: "Opel",
      type: "SUV",
      gearbox: "Automatic",
      energy: "Petrol",
      passengers: 5,
      luggage: 5,
      consumption: "5.9 L/100km",
      trunkCapacity: "Medium",
      hashtag: "Comfort",
      price: "39",
      image: "/dacia-sandero-stepway.png",
      availableFrom: "20/09/2025",
      available: true,
    },
  ]

  // ... existing filter options ...
  const brands = [
    { value: "all", label: "Brand" },
    { value: "Dacia", label: "Dacia" },
    { value: "Renault", label: "Renault" },
    { value: "Peugeot", label: "Peugeot" },
    { value: "Citroën", label: "Citroën" },
    { value: "Volkswagen", label: "Volkswagen" },
    { value: "Ford", label: "Ford" },
    { value: "Opel", label: "Opel" },
  ]

  const vehicleTypes = [
    { value: "all", label: "Vehicle type" },
    { value: "SUV", label: "SUV" },
    { value: "Sedan", label: "Sedan" },
    { value: "Hatchback", label: "Hatchback" },
  ]

  const gearboxTypes = [
    { value: "all", label: "Gearbox type" },
    { value: "Manual", label: "Manual" },
    { value: "Automatic", label: "Automatic" },
  ]

  const energyTypes = [
    { value: "all", label: "Energy" },
    { value: "Petrol", label: "Petrol" },
    { value: "Diesel", label: "Diesel" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Electric", label: "Electric" },
  ]

  const passengerCounts = [
    { value: "all", label: "Number of passengers" },
    { value: "2", label: "2 passengers" },
    { value: "4", label: "4 passengers" },
    { value: "5", label: "5 passengers" },
    { value: "7", label: "7 passengers" },
  ]

  const trunkCapacities = [
    { value: "all", label: "Trunk capacity" },
    { value: "Small", label: "Small" },
    { value: "Medium", label: "Medium" },
    { value: "Large", label: "Large" },
  ]

  const hashtags = [
    { value: "all", label: "Hashtag" },
    { value: "Economy", label: "Economy" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Premium", label: "Premium" },
    { value: "Comfort", label: "Comfort" },
    { value: "Family", label: "Family" },
  ]

  const handleReservation = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsReservationOpen(true)
  }

  const handleReservationSubmit = () => {
    // Handle reservation submission logic here
    console.log("Reservation data:", reservationData, "Vehicle:", selectedVehicle)
    setIsReservationOpen(false)
    // Reset form or show success message
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      (selectedBrand === "all" || vehicle.brand === selectedBrand) &&
      (selectedVehicleType === "all" || vehicle.type === selectedVehicleType) &&
      (selectedGearbox === "all" || vehicle.gearbox === selectedGearbox) &&
      (selectedEnergy === "all" || vehicle.energy.includes(selectedEnergy)) &&
      (selectedPassengers === "all" || vehicle.passengers.toString() === selectedPassengers) &&
      (selectedTrunkCapacity === "all" || vehicle.trunkCapacity === selectedTrunkCapacity) &&
      (selectedHashtag === "all" || vehicle.hashtag === selectedHashtag)
    )
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img src="/automotive-logo.png" alt="Automotive Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-900">AUTOMOTIVE</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium">+33 01 23 45 67 89</span>
          </div>
        </div>
      </nav>

      {/* ... existing filters section ... */}
      <section className="pt-20 py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          {/* First row of filters */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4" />
                  <SelectValue placeholder="Brand" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.value} value={brand.value}>
                    {brand.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4" />
                  <SelectValue placeholder="Vehicle type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGearbox} onValueChange={setSelectedGearbox}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <SelectValue placeholder="Gearbox type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {gearboxTypes.map((gearbox) => (
                  <SelectItem key={gearbox.value} value={gearbox.value}>
                    {gearbox.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedEnergy} onValueChange={setSelectedEnergy}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Fuel className="h-4 w-4" />
                  <SelectValue placeholder="Energy" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {energyTypes.map((energy) => (
                  <SelectItem key={energy.value} value={energy.value}>
                    {energy.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPassengers} onValueChange={setSelectedPassengers}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <SelectValue placeholder="Number of passengers" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {passengerCounts.map((count) => (
                  <SelectItem key={count.value} value={count.value}>
                    {count.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Sort by Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Availability">Sort by Availability</SelectItem>
                <SelectItem value="Price">Sort by Price</SelectItem>
                <SelectItem value="Brand">Sort by Brand</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Second row of filters */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Select value={selectedTrunkCapacity} onValueChange={setSelectedTrunkCapacity}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Luggage className="h-4 w-4" />
                  <SelectValue placeholder="Trunk capacity" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {trunkCapacities.map((capacity) => (
                  <SelectItem key={capacity.value} value={capacity.value}>
                    {capacity.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedHashtag} onValueChange={setSelectedHashtag}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Hash className="h-4 w-4" />
                  <SelectValue placeholder="Hashtag" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {hashtags.map((hashtag) => (
                  <SelectItem key={hashtag.value} value={hashtag.value}>
                    {hashtag.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* ... existing vehicles grid ... */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                id={`vehicle-${vehicle.id}`}
                data-animate
                className={`transform transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`vehicle-${vehicle.id}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-gray-200">
                  <div className="relative overflow-hidden bg-gray-50 p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">{vehicle.subtitle}</p>
                    </div>

                    <div className="flex justify-center mb-6">
                      <img
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                        className="w-full max-w-xs h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex justify-center mb-4">
                      <Badge className="bg-orange-500 text-white px-4 py-1 rounded-full">
                        <Clock className="h-3 w-3 mr-1" />
                        Available from {vehicle.availableFrom}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 pt-0">
                    <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1 text-orange-500" />
                        <span>{vehicle.passengers} seats</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Luggage className="h-4 w-4 mr-1 text-orange-500" />
                        <span>{vehicle.luggage} luggages</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Fuel className="h-4 w-4 mr-1 text-orange-500" />
                        <span className="text-xs">{vehicle.consumption}</span>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-lg text-gray-600">From</span>
                        <span className="text-2xl font-bold text-orange-500">€{vehicle.price}</span>
                        <span className="text-lg text-gray-600">/day</span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        onClick={() => handleReservation(vehicle)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
                      >
                        Réserver
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun véhicule trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* ... existing reservation modal ... */}
      <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-6">
              Réservation - {selectedVehicle?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Pickup and Return Locations */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Lieu de prise en charge</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Lieu de prise en charge"
                    value={reservationData.pickupLocation}
                    onChange={(e) => setReservationData({ ...reservationData, pickupLocation: e.target.value })}
                    className="pl-10 bg-gray-100 border-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Agence de retour</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Lieu de restitution"
                    value={reservationData.returnLocation}
                    onChange={(e) => setReservationData({ ...reservationData, returnLocation: e.target.value })}
                    className="pl-10 bg-gray-100 border-0"
                  />
                </div>
              </div>
            </div>

            {/* Pickup and Return Dates/Times */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Date et heure de prise en charge</Label>
                <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="bg-white p-2 rounded">
                      <span className="text-2xl font-bold text-gray-900">13</span>
                    </div>
                    <div className="text-sm">
                      <div className="text-orange-500 font-medium">Mar</div>
                      <div className="text-gray-600">Août</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <Select
                      value={reservationData.pickupTime}
                      onValueChange={(value) => setReservationData({ ...reservationData, pickupTime: value })}
                    >
                      <SelectTrigger className="w-20 bg-white border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Date et heure de restitution</Label>
                <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="bg-white p-2 rounded">
                      <span className="text-2xl font-bold text-gray-900">16</span>
                    </div>
                    <div className="text-sm">
                      <div className="text-orange-500 font-medium">Sam</div>
                      <div className="text-gray-600">Août</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <Select
                      value={reservationData.returnTime}
                      onValueChange={(value) => setReservationData({ ...reservationData, returnTime: value })}
                    >
                      <SelectTrigger className="w-20 bg-white border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleReservationSubmit}
                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-3 rounded-full font-semibold text-lg"
              >
                Demande de réservation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
              <h3 className="font-semibold mb-4">Service client</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Nous contacter</li>
                <li>Nos centres de livraison</li>
                <li>FAQ: Questions fréquemment posées</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Liens directs</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Réservez votre voiture</li>
                <li>Nos voitures</li>
                <li>Comment ça marche</li>
                <li>Nos inspirations voyage</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+33 01 23 45 67 89</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; AUTOMOTIVE 2025</p>
            <p className="mt-2 text-sm">
              Pour les trajets courts, privilégiez la marche ou le vélo #SeDéplacerMoinsPolluer
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
