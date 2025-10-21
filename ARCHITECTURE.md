# Maintafox Blog System - Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js 14)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │   Public Pages   │  │  Protected Pages  │  │  Admin Pages   │ │
│  ├─────────────────┤  ├──────────────────┤  ├────────────────┤ │
│  │ /blog           │  │ /blog/create     │  │ /admin/blog    │ │
│  │ /blog/[slug]    │  │ /blog/edit/[id]  │  │                │ │
│  └─────────────────┘  └──────────────────┘  └────────────────┘ │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              UI Components Layer                          │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  • Navbar (with UserMenu)                                │   │
│  │  • AuthModal (Sign in/up)                                │   │
│  │  • Blog Post Cards                                       │   │
│  │  • Admin Dashboard Table                                 │   │
│  │  • Post Editor Form                                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Context & State Management                   │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  AuthContext (Global User State)                         │   │
│  │   - user: User | null                                    │   │
│  │   - isAdmin: boolean                                     │   │
│  │   - signIn, signUp, signOut methods                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │ Firebase SDK
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│                    FIREBASE BACKEND                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Authentication  │  │    Firestore     │  │   Storage    │  │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────┤  │
│  │ • Email/Pass    │  │ users/           │  │ blog-covers/ │  │
│  │ • Google OAuth  │  │   - profiles     │  │   - images   │  │
│  │ • Session Mgmt  │  │   - roles        │  │              │  │
│  │                 │  │                  │  │ Max: 5MB     │  │
│  │                 │  │ posts/           │  │              │  │
│  │                 │  │   - content      │  │              │  │
│  │                 │  │   - metadata     │  │              │  │
│  │                 │  │   - status       │  │              │  │
│  │                 │  │                  │  │              │  │
│  │                 │  │ comments/        │  │              │  │
│  │                 │  │   (future)       │  │              │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Security Rules                          │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  Firestore:                                                │ │
│  │   ✓ Public can read published posts                       │ │
│  │   ✓ Authenticated users can create posts                  │ │
│  │   ✓ Authors can edit own posts                            │ │
│  │   ✓ Admins can edit/delete any post                       │ │
│  │                                                            │ │
│  │  Storage:                                                  │ │
│  │   ✓ Public read for blog covers                           │ │
│  │   ✓ Authenticated write (5MB limit)                       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Diagrams

### User Registration Flow
```
User → Click "Sign In" → AuthModal Opens
                           │
                           ├─ Email/Password
                           │   → createUserWithEmailAndPassword()
                           │   → updateProfile()
                           │   → Create Firestore user doc
                           │   → AuthContext updates
                           │   → Modal closes
                           │   → User logged in ✓
                           │
                           └─ Google OAuth
                               → signInWithPopup(GoogleProvider)
                               → Check if user exists in Firestore
                               → Create user doc if new
                               → AuthContext updates
                               → Modal closes
                               → User logged in ✓
```

### Post Creation Flow
```
User → Click "Create Post" → Check authentication
                               │
                               ✓ Authenticated
                               │
                              Fill Form:
                               - Title
                               - Category
                               - Excerpt
                               - Content
                               - Tags
                               - Cover Image (optional)
                               │
                               ├─ Save as Draft
                               │   → status: 'draft'
                               │   → addDoc(posts, data)
                               │   → Redirect to /blog
                               │
                               └─ Submit for Review
                                   → Upload image to Storage (if any)
                                   → status: 'pending'
                                   → addDoc(posts, data)
                                   → Redirect to /blog
                                   → Awaits admin approval
```

### Admin Approval Flow
```
Admin → Visit /admin/blog → Check isAdmin flag
                              │
                              ✓ Admin Access
                              │
                             View Dashboard:
                              - Stats (total, pending, published, draft)
                              - Filter by status
                              - Real-time post list
                              │
                              Select Post → Actions:
                              │
                              ├─ Approve
                              │   → updateDoc(status: 'published')
                              │   → Set publishedAt timestamp
                              │   → Post goes live ✓
                              │
                              ├─ Reject
                              │   → updateDoc(status: 'rejected')
                              │   → Author can edit and resubmit
                              │
                              ├─ Edit
                              │   → Navigate to /blog/edit/[id]
                              │   → Modify content
                              │   → updateDoc()
                              │
                              └─ Delete
                                  → Confirm dialog
                                  → deleteDoc()
                                  → Post removed ✓
```

### View Post Flow
```
Visitor → Visit /blog/[slug] → Query Firestore by slug
                                 │
                                 ├─ Post Found
                                 │   │
                                 │   ├─ Status: Published
                                 │   │   → Display full post ✓
                                 │   │
                                 │   ├─ Status: Pending/Draft/Rejected
                                 │   │   │
                                 │   │   ├─ Visitor = Author or Admin
                                 │   │   │   → Display post with status badge ✓
                                 │   │   │
                                 │   │   └─ Visitor = Other
                                 │   │       → Show "Not published" message
                                 │   │
                                 │
                                 └─ Post Not Found
                                     → Show 404 message
                                     → Link back to /blog
```

## 🔐 Role-Based Access Control

| Feature | Public | User | Author | Admin |
|---------|--------|------|--------|-------|
| View published posts | ✓ | ✓ | ✓ | ✓ |
| Sign up/Sign in | ✓ | — | — | — |
| Create post | — | ✓ | ✓ | ✓ |
| Edit own post | — | — | ✓ | ✓ |
| Delete own post | — | — | ✗ | ✓ |
| View drafts/pending | — | Own | Own | All |
| Approve posts | — | — | — | ✓ |
| Reject posts | — | — | — | ✓ |
| Edit any post | — | — | — | ✓ |
| Delete any post | — | — | — | ✓ |
| Admin dashboard | — | — | — | ✓ |

## 🎯 Post Status States

```
┌─────────┐
│  DRAFT  │ ←─────────────────────────────┐
└────┬────┘                                │
     │                                     │
     │ Author: Submit for Review           │
     ▼                                     │
┌─────────┐                                │
│ PENDING │                                │
└────┬────┘                                │
     │                                     │
     ├─ Admin: Approve → ┌───────────┐    │
     │                    │ PUBLISHED │    │
     │                    └───────────┘    │
     │                                     │
     └─ Admin: Reject ─→ ┌──────────┐     │
                          │ REJECTED │ ────┘
                          └──────────┘
                          (Author can edit & resubmit)
```

## 🗂️ Firestore Data Structure

### users/{uid}
```typescript
{
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role: 'user' | 'admin'
  createdAt: Timestamp
}
```

### posts/{postId}
```typescript
{
  id: string (auto-generated)
  title: string
  slug: string (URL-friendly title)
  category: string
  excerpt: string
  content: string (markdown-style)
  coverImage?: string (Storage URL)
  authorId: string (user uid)
  authorName: string
  authorEmail: string
  status: 'draft' | 'pending' | 'published' | 'rejected'
  tags: string[]
  readingTime: string (e.g., "8 min read")
  createdAt: Timestamp
  updatedAt: Timestamp
  publishedAt?: Timestamp
}
```

## 🚀 Performance Optimizations

1. **Real-time Updates**: Firestore listeners for instant updates
2. **Lazy Loading**: Blog posts loaded on-demand
3. **Image Optimization**: Storage handles image hosting
4. **Client-side Routing**: Next.js fast navigation
5. **Type Safety**: TypeScript prevents runtime errors

## 🔧 Configuration Files

```
.env.local              # Firebase credentials (not committed)
.env.example            # Template for environment variables
firebase.ts             # Firebase initialization
AuthContext.tsx         # Global auth state
blog.ts                 # TypeScript interfaces
```

## 📦 Key Dependencies

```json
{
  "firebase": "^12.4.0",          // Backend services
  "next": "^14.2.8",              // React framework
  "react": "^18.3.1",             // UI library
  "lucide-react": "^0.546.0",     // Icons
  "tailwindcss": "^3.4.13"        // Styling
}
```

## 🎨 Design System

- **Brand Colors**: Blue (`#0B1E35`) & Orange (`#FF7A19`)
- **Typography**: Inter font family
- **Spacing**: Tailwind CSS utility classes
- **Components**: Rounded corners, shadows, transitions
- **Icons**: Lucide React icon set
- **Responsive**: Mobile-first approach

## 🔒 Security Checklist

- [x] Environment variables not committed
- [x] Firestore security rules configured
- [x] Storage security rules configured
- [x] Email/password validation
- [x] Admin access control
- [x] File size limits (5MB)
- [x] Input sanitization
- [x] HTTPS only (Firebase default)

---

This architecture provides a solid, scalable foundation for the Maintafox blog system!
