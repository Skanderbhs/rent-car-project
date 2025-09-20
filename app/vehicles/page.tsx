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
import { MapPin, Car, Users, Fuel, Settings, Phone, ArrowLeft, Luggage, Hash, Clock, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function VehiclesPage() {
  const [isVisible, setIsVisible] = useState({})
  const [filters, setFilters] = useState({
    brand: "all",
    vehicleType: "all",
    gearbox: "all",
    energy: "all",
    passengers: "all",
    trunkCapacity: "all",
    hashtag: "all",
    sortBy: "Availability"
  })
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
  const [vehicles, setVehicles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    types: [],
    gearboxes: [],
    energies: [],
    hashtags: []
  })
  const observerRef = useRef(null)

  // Intersection Observer for animations
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
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [vehicles])

  // Fetch vehicles and build dynamic filter options
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("cars")
          .select(`
            id, 
            name, 
            subtitle, 
            gearbox, 
            energy, 
            passengers, 
            luggage, 
            consumption, 
            trunk_capacity, 
            hashtag, 
            price_per_day, 
            image, 
            available_from, 
            disponible,
            marques(name),
            categories(name)
          `)
          .eq("disponible", true)
          .order("price_per_day", { ascending: true })

        if (error) {
          console.error("Error fetching cars:", error.message)
          return
        }

        // Transform data and build filter options
        const transformedVehicles = (data || []).map((row) => ({
          id: row.id,
          name: row.name,
          subtitle: row.subtitle || "",
          brand: row.marques?.name || "Unknown",
          type: row.categories?.name || "Unknown",
          gearbox: row.gearbox || "",
          energy: row.energy || "",
          passengers: row.passengers || 5,
          luggage: row.luggage || 3,
          consumption: row.consumption || "",
          trunkCapacity: row.trunk_capacity || "Medium",
          hashtag: row.hashtag || "",
          price: Number(row.price_per_day || 0),
          image: row.image || "/placeholder.svg",
          availableFrom: row.available_from
            ? new Date(row.available_from).toLocaleDateString("en-GB")
            : new Date().toLocaleDateString("en-GB"),
          available: row.disponible,
        }))

        setVehicles(transformedVehicles)

        // Build dynamic filter options
        const brands = [...new Set(transformedVehicles.map(v => v.brand).filter(Boolean))]
        const types = [...new Set(transformedVehicles.map(v => v.type).filter(Boolean))]
        const gearboxes = [...new Set(transformedVehicles.map(v => v.gearbox).filter(Boolean))]
        const energies = [...new Set(transformedVehicles.map(v => v.energy).filter(Boolean))]
        const hashtags = [...new Set(transformedVehicles.map(v => v.hashtag).filter(Boolean))]

        setFilterOptions({
          brands: brands.sort(),
          types: types.sort(),
          gearboxes: gearboxes.sort(),
          energies: energies.sort(),
          hashtags: hashtags.sort()
        })

      } catch (error) {
        console.error("Failed to fetch vehicles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  // Filter and sort vehicles
  const filteredVehicles = vehicles
    .filter((vehicle) => {
      return (
        (filters.brand === "all" || vehicle.brand === filters.brand) &&
        (filters.vehicleType === "all" || vehicle.type === filters.vehicleType) &&
        (filters.gearbox === "all" || vehicle.gearbox === filters.gearbox) &&
        (filters.energy === "all" || vehicle.energy.toLowerCase().includes(filters.energy.toLowerCase())) &&
        (filters.passengers === "all" || vehicle.passengers.toString() === filters.passengers) &&
        (filters.trunkCapacity === "all" || vehicle.trunkCapacity === filters.trunkCapacity) &&
        (filters.hashtag === "all" || vehicle.hashtag === filters.hashtag)
      )
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "Price":
          return a.price - b.price
        case "Brand":
          return a.brand.localeCompare(b.brand)
        case "Availability":
        default:
          return new Date(a.availableFrom) - new Date(b.availableFrom)
      }
    })

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const handleReservation = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsReservationOpen(true)
  }

  const handleReservationSubmit = async () => {
    if (!selectedVehicle || !reservationData.pickupDate || !reservationData.returnDate) {
      alert("Veuillez renseigner toutes les informations requises.")
      return
    }

    try {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData?.user?.id

      if (!userId) {
        alert("Vous devez être connecté pour faire une réservation.")
        return
      }

      const { error } = await supabase.from("reservations").insert({
        user_id: userId,
        car_id: selectedVehicle.id,
        start_date: `${reservationData.pickupDate} ${reservationData.pickupTime}`,
        end_date: `${reservationData.returnDate} ${reservationData.returnTime}`,
        pickup_location: reservationData.pickupLocation,
        return_location: reservationData.returnLocation,
        status: 'pending'
      })

      if (error) {
        console.error("Reservation error:", error)
        alert("Erreur lors de la réservation.")
        return
      }

      alert("Demande de réservation envoyée avec succès !")
      setIsReservationOpen(false)
      setReservationData({
        pickupLocation: "",
        returnLocation: "",
        pickupDate: "",
        pickupTime: "11:00",
        returnDate: "",
        returnTime: "11:00",
      })
    } catch (error) {
      console.error("Reservation failed:", error)
      alert("Une erreur est survenue.")
    }
  }

  const locations = [
    { value: "tunis-airport", label: "Tunis - Aéroport Tunis Carthage" },
    { value: "monastir-airport", label: "Monastir - Aéroport international de Monastir Habib-Bourguiba" },
    { value: "enfida-airport", label: "Enfida - Aéroport international d'Enfidha-Hammamet" },
    { value: "tozeur-airport", label: "Tozeur - Aéroport international de Tozeur-Nefta" },
    { value: "tabarka-airport", label: "Tabarka - Aéroport international de Tabarka-Aïn Draham" },
    { value: "gafsa-airport", label: "Gafsa - Aéroport international de Gafsa-Ksar" }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-600" />
          <p className="text-gray-600">Chargement des véhicules...</p>
        </div>
      </div>
    )
  }

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
            <span className="text-sm font-medium">+216 20 582 807</span>
          </div>
        </div>
      </nav>

      {/* Filters Section */}
      <section className="pt-20 py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {/* Brand Filter */}
            <Select value={filters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4" />
                  <SelectValue placeholder="Brand" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {filterOptions.brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Vehicle Type Filter */}
            <Select value={filters.vehicleType} onValueChange={(value) => handleFilterChange('vehicleType', value)}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4" />
                  <SelectValue placeholder="Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {filterOptions.types.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Gearbox Filter */}
            <Select value={filters.gearbox} onValueChange={(value) => handleFilterChange('gearbox', value)}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <SelectValue placeholder="Gearbox" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gearbox</SelectItem>
                {filterOptions.gearboxes.map((gearbox) => (
                  <SelectItem key={gearbox} value={gearbox}>{gearbox}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Energy Filter */}
            <Select value={filters.energy} onValueChange={(value) => handleFilterChange('energy', value)}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Fuel className="h-4 w-4" />
                  <SelectValue placeholder="Energy" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Energy</SelectItem>
                {filterOptions.energies.map((energy) => (
                  <SelectItem key={energy} value={energy}>{energy}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Passengers Filter */}
            <Select value={filters.passengers} onValueChange={(value) => handleFilterChange('passengers', value)}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <SelectValue placeholder="Passengers" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Passengers</SelectItem>
                <SelectItem value="2">2 passengers</SelectItem>
                <SelectItem value="4">4 passengers</SelectItem>
                <SelectItem value="5">5 passengers</SelectItem>
                <SelectItem value="7">7 passengers</SelectItem>
              </SelectContent>
            </Select>

            {/* Trunk Capacity Filter */}
            <Select value={filters.trunkCapacity} onValueChange={(value) => handleFilterChange('trunkCapacity', value)}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Luggage className="h-4 w-4" />
                  <SelectValue placeholder="Trunk" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Size</SelectItem>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
              </SelectContent>
            </Select>

            {/* Hashtag Filter */}
            <Select value={filters.hashtag} onValueChange={(value) => handleFilterChange('hashtag', value)}>
              <SelectTrigger className="bg-white border-gray-300">
                <div className="flex items-center space-x-2">
                  <Hash className="h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {filterOptions.hashtags.map((hashtag) => (
                  <SelectItem key={hashtag} value={hashtag}>{hashtag}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Availability">Availability</SelectItem>
                <SelectItem value="Price">Price</SelectItem>
                <SelectItem value="Brand">Brand</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Results Counter */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">
            {filteredVehicles.length} véhicule{filteredVehicles.length !== 1 ? 's' : ''} trouvé{filteredVehicles.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredVehicles.length > 0 ? (
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
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full max-w-xs h-45 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg"
                          }}
                        />
                      </div>

                      <div className="flex justify-center mb-4">
                        <Badge className="bg-red-600 text-white px-4 py-1 rounded-full">
                          <Clock className="h-3 w-3 mr-1" />
                          Available from {vehicle.availableFrom}
                        </Badge>
                      </div>

                      {vehicle.hashtag && (
                        <div className="flex justify-center mb-4">
                          <Badge variant="outline" className="border-red-600 text-red-600">
                            {vehicle.hashtag}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 pt-0">
                      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-1 text-red-600" />
                          <span>{vehicle.passengers} seats</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Luggage className="h-4 w-4 mr-1 text-red-600" />
                          <span>{vehicle.luggage} bags</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Fuel className="h-4 w-4 mr-1 text-red-600" />
                          <span className="text-xs">{vehicle.consumption || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-lg text-gray-600">From</span>
                          <span className="text-2xl font-bold text-red-600">{vehicle.price} TND</span>
                          <span className="text-lg text-gray-600">/day</span>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          onClick={() => handleReservation(vehicle)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
                        >
                          Réserver
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun véhicule trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* Reservation Modal */}
      <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-6">
              Réservation - {selectedVehicle?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Lieu de prise en charge</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                  <Select
                    value={reservationData.pickupLocation}
                    onValueChange={(value) => setReservationData({ ...reservationData, pickupLocation: value })}
                  >
                    <SelectTrigger className="pl-10 bg-gray-100 border-0">
                      <SelectValue placeholder="Choisir lieu de prise en charge" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Agence de retour</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                  <Select
                    value={reservationData.returnLocation}
                    onValueChange={(value) => setReservationData({ ...reservationData, returnLocation: value })}
                  >
                    <SelectTrigger className="pl-10 bg-gray-100 border-0">
                      <SelectValue placeholder="Choisir lieu de retour" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Date et heure de prise en charge</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="date"
                    value={reservationData.pickupDate}
                    onChange={(e) => setReservationData({ ...reservationData, pickupDate: e.target.value })}
                    className="bg-gray-100 border-0"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <Input
                    type="time"
                    value={reservationData.pickupTime}
                    onChange={(e) => setReservationData({ ...reservationData, pickupTime: e.target.value })}
                    className="bg-gray-100 border-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Date et heure de restitution</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="date"
                    value={reservationData.returnDate}
                    onChange={(e) => setReservationData({ ...reservationData, returnDate: e.target.value })}
                    className="bg-gray-100 border-0"
                    min={reservationData.pickupDate || new Date().toISOString().split('T')[0]}
                  />
                  <Input
                    type="time"
                    value={reservationData.returnTime}
                    onChange={(e) => setReservationData({ ...reservationData, returnTime: e.target.value })}
                    className="bg-gray-100 border-0"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleReservationSubmit}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-3 rounded-full font-semibold text-lg"
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
                  <span>+216 20 582 807</span>
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