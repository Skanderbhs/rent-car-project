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
import { Users, Shield, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { AuthGuard } from "@/components/auth-guard"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userType = searchParams.get("type") || "user"
  const isAdmin = userType === "admin"

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        // Successfully logged in
        alert(`Connexion réussie en tant que ${isAdmin ? "administrateur" : "utilisateur"}!`)
        // You can redirect here or handle the success as needed
        // router.push("/")
      }
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.")
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
            <CardTitle className="text-2xl">{isAdmin ? "Connexion Administrateur" : "Connexion Client"}</CardTitle>
            <CardDescription>
              Connectez-vous à votre {isAdmin ? "espace administrateur" : "compte client"} AUTOMOTIVE
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Adresse Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Votre adresse email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                className={`w-full ${isAdmin ? "bg-red-600 hover:bg-red-700" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                <Link
                  href={`/auth/forgot-password?type=${userType}`}
                  className={`${isAdmin ? "text-red-600 hover:text-red-800" : "text-blue-600 hover:text-blue-800"} font-medium`}
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <div className="text-center text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                  href={`/auth/register?type=${userType}`}
                  className={`${isAdmin ? "text-red-600 hover:text-red-800" : "text-blue-600 hover:text-blue-800"} font-medium`}
                >
                  Créer un compte
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
