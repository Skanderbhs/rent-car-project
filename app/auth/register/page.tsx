"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Shield, ArrowLeft, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { AuthGuard } from "@/components/auth-guard"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userType = searchParams.get("type") || "user"
  const isAdmin = userType === "admin"

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      setError("Format de téléphone invalide")
      setIsLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Format d'email invalide")
      setIsLoading(false)
      return
    }

    try {
      // Create user account with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            user_type: userType,
          }
        }
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        setSuccess(`Compte ${isAdmin ? "administrateur" : "utilisateur"} créé avec succès! Un email de confirmation a été envoyé.`)
        // Clear form after success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        })
      }
    } catch (err) {
      setError("Erreur lors de la création du compte. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to home */}
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isAdmin ? <Shield className="h-12 w-12 text-red-600" /> : <Users className="h-12 w-12 text-blue-600" />}
            </div>
            <CardTitle className="text-2xl">
              {isAdmin ? "Créer un compte Administrateur" : "Créer un compte Client"}
            </CardTitle>
            <CardDescription>
              Remplissez vos informations pour créer votre {isAdmin ? "compte administrateur" : "compte client"}{" "}
              AUTOMOTIVE
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}



              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de Téléphone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+216 20 582 807"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Choisissez un mot de passe sécurisé"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                className={`w-full ${isAdmin ? "bg-red-600 hover:bg-red-700" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Création en cours..." : "Créer le compte"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Déjà un compte ?{" "}
                <Link
                  href={`/auth/login?type=${userType}`}
                  className={`${isAdmin ? "text-red-600 hover:text-red-800" : "text-blue-600 hover:text-blue-800"} font-medium`}
                >
                  Se connecter
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </AuthGuard>
  )
}
