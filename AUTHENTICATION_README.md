# Authentification Supabase - Guide d'installation

Ce projet utilise Supabase pour l'authentification des utilisateurs avec les fonctionnalités suivantes :
- ✅ Connexion (Login)
- ✅ Inscription (Register) sans OTP
- ✅ Envoi d'email de confirmation
- ✅ Mot de passe oublié
- ✅ Réinitialisation de mot de passe
- ✅ Protection des routes
- ✅ Gestion des sessions

## 🚀 Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```bash
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

### 2. Configuration Supabase

1. Allez sur [supabase.com](https://supabase.com) et créez un nouveau projet
2. Dans les paramètres du projet, récupérez :
   - Project URL
   - anon/public key
3. Dans Authentication > Settings, configurez :
   - Site URL: `http://localhost:3000` (pour le développement)
   - Redirect URLs: `http://localhost:3000/auth/reset-password`

### 3. Configuration des emails

Dans Supabase > Authentication > Email Templates, vous pouvez personnaliser :
- Confirm signup
- Reset password
- Magic link

## 📁 Structure des fichiers

```
app/auth/
├── login/page.tsx          # Page de connexion
├── register/page.tsx       # Page d'inscription
├── forgot-password/page.tsx # Mot de passe oublié
└── reset-password/page.tsx # Réinitialisation mot de passe

components/
├── auth-guard.tsx          # Protection des routes
└── user-menu.tsx           # Menu utilisateur

hooks/
└── use-auth.ts             # Hook d'authentification

lib/
└── supabaseClient.ts       # Client Supabase
```

## 🔐 Fonctionnalités

### Connexion
- Authentification par email/mot de passe
- Gestion des erreurs
- Redirection automatique si déjà connecté

### Inscription
- Création de compte sans OTP
- Envoi automatique d'email de confirmation
- Stockage des métadonnées utilisateur (prénom, nom, téléphone)

### Mot de passe oublié
- Envoi d'email de réinitialisation
- Lien sécurisé avec token
- Page de réinitialisation protégée

### Protection des routes
- `AuthGuard` pour protéger les pages
- Redirection automatique selon l'état d'authentification
- Gestion du chargement

## 🎨 Style

Le code respecte parfaitement le style existant :
- Même design system (shadcn/ui)
- Mêmes couleurs et gradients
- Même structure de composants
- Même icônes (Lucide React)

## 🚀 Utilisation

### Dans une page protégée
```tsx
import { AuthGuard } from "@/components/auth-guard"

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>Contenu protégé</div>
    </AuthGuard>
  )
}
```

### Dans une page publique (login/register)
```tsx
import { AuthGuard } from "@/components/auth-guard"

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <div>Page de connexion</div>
    </AuthGuard>
  )
}
```

### Hook d'authentification
```tsx
import { useAuth } from "@/hooks/use-auth"

export default function MyComponent() {
  const { user, session, loading, signOut } = useAuth()
  
  if (loading) return <div>Chargement...</div>
  if (!user) return <div>Non connecté</div>
  
  return (
    <div>
      <p>Bonjour {user.email}</p>
      <button onClick={signOut}>Se déconnecter</button>
    </div>
  )
}
```

## 🔧 Personnalisation

### Changer les couleurs
Modifiez les classes Tailwind dans les composants pour adapter les couleurs à votre thème.

### Ajouter des champs
Dans `register/page.tsx`, ajoutez de nouveaux champs dans le formulaire et dans les métadonnées Supabase.

### Modifier les messages
Personnalisez les messages d'erreur et de succès dans chaque composant.

## 🐛 Dépannage

### Erreur de connexion
- Vérifiez vos variables d'environnement
- Assurez-vous que l'utilisateur existe dans Supabase
- Vérifiez la configuration des emails

### Problème de redirection
- Vérifiez les URLs de redirection dans Supabase
- Assurez-vous que `AuthGuard` est correctement configuré

### Erreur de build
- Vérifiez que toutes les dépendances sont installées
- Assurez-vous que TypeScript est configuré correctement

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🤝 Support

Pour toute question ou problème, consultez la documentation Supabase ou ouvrez une issue sur le projet. 