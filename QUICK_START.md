# Quick Start Guide - Firebase Blog System

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies (Already Done!)
```bash
npm install
```

### 2. Configure Firebase

1. **Create Firebase Project**: Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Click "Add project"
   - Name: `maintafox-website`
   - Click "Create project"

2. **Enable Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"
   - Enable "Google"

3. **Create Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in production mode
   - Choose region: `europe-west1`

4. **Enable Storage**:
   - Go to Storage
   - Click "Get started"
   - Use default settings

5. **Get Your Config**:
   - Click ⚙️ → Project settings
   - Scroll to "Your apps"
   - Click Web `</>` icon
   - Copy the config values

### 3. Set Environment Variables

Create `.env.local` in the root directory:

```env
# Copy these from Firebase Console
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=maintafox-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=maintafox-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=maintafox-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Add your admin email
NEXT_PUBLIC_ADMIN_EMAILS=youremail@example.com
```

### 4. Configure Firestore Rules

In Firebase Console → Firestore → Rules, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    match /posts/{postId} {
      allow read: if resource.data.status == 'published' || request.auth != null;
      allow create: if request.auth != null && request.resource.data.authorId == request.auth.uid;
      allow update: if request.auth != null && (resource.data.authorId == request.auth.uid);
      allow delete: if request.auth != null;
    }
  }
}
```

### 5. Configure Storage Rules

In Firebase Console → Storage → Rules, paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blog-covers/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

### 6. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## 🎯 Test the System

1. **Sign Up**:
   - Go to `/blog`
   - Click "Sign In"
   - Click "Create Account"
   - Enter email, password, name
   - Or use "Sign in with Google"

2. **Create a Post**:
   - Click "Create Post" button
   - Fill in the form
   - Upload a cover image (optional)
   - Click "Submit for Review"

3. **Admin Approval**:
   - Make sure your email is in `NEXT_PUBLIC_ADMIN_EMAILS`
   - Visit `/admin/blog`
   - See your post in "Pending" status
   - Click the green checkmark to approve
   - Post is now published!

4. **View Published Post**:
   - Go back to `/blog`
   - Click on your published post
   - See it live with formatting

## 🔑 Key Features

### For Users:
- ✅ Email/password signup
- ✅ Google OAuth login
- ✅ Create blog posts
- ✅ Upload images
- ✅ Edit own posts
- ✅ Save as draft or submit for review

### For Admins:
- ✅ Approve/reject posts
- ✅ Edit any post
- ✅ Delete posts
- ✅ View statistics
- ✅ Filter by status
- ✅ Real-time dashboard

## 📱 Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/blog` | List all published posts | Public |
| `/blog/create` | Create new post | Authenticated |
| `/blog/edit/[id]` | Edit existing post | Author or Admin |
| `/blog/[slug]` | View single post | Public (if published) |
| `/admin/blog` | Admin dashboard | Admin only |

## 🎨 UI Components

- **AuthModal**: Sign-in/sign-up modal with Google OAuth
- **UserMenu**: User dropdown in navbar
- **Blog Form**: Rich post creation/editing form
- **Admin Dashboard**: Full post management interface

## ⚡ Technology Stack

- **Next.js 14**: React framework
- **Firebase Auth**: User authentication
- **Firestore**: NoSQL database
- **Firebase Storage**: Image hosting
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Lucide Icons**: Icon library

## 🐛 Troubleshooting

**"Permission denied" error?**
- Check Firestore/Storage rules are properly configured
- Verify user is signed in
- Check admin email in `.env.local`

**"Module not found" error?**
- Run `npm install` again
- Delete `.next` folder and restart dev server

**Images not uploading?**
- Check file size (max 5MB)
- Verify Storage rules are set
- Check browser console for errors

**Admin dashboard shows "Access denied"?**
- Add your email to `NEXT_PUBLIC_ADMIN_EMAILS`
- Restart dev server
- Sign out and sign back in

## 📚 Full Documentation

For detailed setup instructions, see:
- **FIREBASE_SETUP.md** - Complete Firebase configuration
- **BLOG_IMPLEMENTATION.md** - Full implementation details

## 🎉 You're Ready!

The blog system is fully functional. Start creating content!

Need help? Check the troubleshooting section or Firebase documentation.
