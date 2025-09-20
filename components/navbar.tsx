"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { UserMenu } from "@/components/user-menu"
import { Phone } from "lucide-react"

export function Navbar() {
  const { user, loading } = useAuth()

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/automotive-logo.png" alt="Automotive Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-gray-900">AUTOMOTIVE</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#accueil" className="text-gray-700 hover:text-red-600 transition-colors">
            ACCUEIL
          </a>
          <Link href="/vehicles" className="text-gray-700 hover:text-red-600 transition-colors">
            NOS VOITURES
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-red-600 transition-colors">
            NOS SERVICES
          </Link>
          <a href="#plans" className="text-gray-700 hover:text-red-600 transition-colors">
            NOS PLANS
          </a>
          <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
            CONTACT
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Phone className="h-4 w-4 text-red-600" />
          <span className="text-sm font-medium hidden sm:inline">+216 20 582 807</span>
          
          {/* Authentication Section */}
          {!loading && (
            <div className="flex items-center space-x-3">
              {user ? (
                // User is logged in - show profile menu
                <UserMenu />
              ) : (
                // User is not logged in - show login/signup buttons
                <>
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      Se connecter
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      S'inscrire
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
} 