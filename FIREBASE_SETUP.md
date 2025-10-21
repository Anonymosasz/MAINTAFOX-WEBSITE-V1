# Firebase Blog Setup Guide

This guide will help you set up Firebase for the Maintafox blog authentication and content management system.

## Prerequisites

- A Google account
- Node.js and npm installed
- The Maintafox website project

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `maintafox-website`
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Enable the following sign-in methods:
   - **Email/Password**: Toggle on
   - **Google**: Toggle on, configure OAuth consent screen

## Step 3: Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Start in **production mode** (we'll configure rules next)
4. Choose your region (closest to Algeria: `europe-west1`)
5. Click "Enable"

## Step 4: Configure Firestore Security Rules

Go to the "Rules" tab in Firestore and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Posts collection
    match /posts/{postId} {
      // Anyone can read published posts
      allow read: if resource.data.status == 'published' || request.auth != null;
      
      // Authenticated users can create posts
      allow create: if request.auth != null && 
                      request.resource.data.authorId == request.auth.uid;
      
      // Authors can update their own posts
      allow update: if request.auth != null && 
                      (resource.data.authorId == request.auth.uid || 
                       request.auth.token.email in get(/databases/$(database)/documents/config/admins).data.emails);
      
      // Only admins can delete posts
      allow delete: if request.auth != null && 
                      request.auth.token.email in get(/databases/$(database)/documents/config/admins).data.emails;
    }
    
    // Comments collection
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
  }
}
```

## Step 5: Enable Firebase Storage

1. Click "Storage" in the left sidebar
2. Click "Get started"
3. Start in **production mode**
4. Choose the same region as Firestore
5. Click "Done"

## Step 6: Configure Storage Security Rules

Go to the "Rules" tab in Storage and replace with:

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

## Step 7: Get Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>`
5. Register app with nickname: `maintafox-website`
6. Copy the Firebase configuration object

## Step 8: Configure Environment Variables

1. In your project, open `.env.local`
2. Update with your Firebase credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin emails (comma-separated)
NEXT_PUBLIC_ADMIN_EMAILS=admin@maintafox.systems,youradmin@example.com
```

## Step 9: Set Up Admin Access

To make a user an admin:

1. Add their email to `NEXT_PUBLIC_ADMIN_EMAILS` in `.env.local`
2. Restart your development server
3. The user will have admin privileges next time they sign in

## Step 10: Initialize Firestore Indexes (Optional)

Some queries may require composite indexes. Firebase will prompt you in the console when needed.

Common indexes to create:
- Collection: `posts`, Fields: `status` (Ascending), `createdAt` (Descending)
- Collection: `posts`, Fields: `status` (Ascending), `publishedAt` (Descending)

## Testing the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/blog`
3. Click "Sign In" in the navbar
4. Create an account or sign in with Google
5. Click "Create Post" to write a new blog post
6. If you're an admin, visit `/admin/blog` to manage posts

## Firestore Collections Structure

### users
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt: Timestamp;
}
```

### posts
```typescript
{
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  tags: string[];
  readingTime: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}
```

### comments (optional - for future use)
```typescript
{
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  isApproved: boolean;
  createdAt: Timestamp;
}
```

## Deployment to Production

When deploying to production (Vercel, Netlify, etc.):

1. Add all environment variables to your hosting platform
2. Make sure to use production Firebase credentials
3. Update Firestore and Storage security rules if needed
4. Consider enabling Firebase App Check for additional security

## Security Best Practices

1. **Never commit** `.env.local` to version control
2. Use different Firebase projects for development and production
3. Regularly review Firestore security rules
4. Monitor Firebase usage in the console
5. Set up billing alerts to avoid unexpected costs
6. Enable Firebase App Check in production
7. Use reCAPTCHA for sign-up forms in production

## Troubleshooting

### "Permission denied" errors
- Check Firestore security rules
- Verify user is authenticated
- Ensure admin emails are correctly configured

### Images not uploading
- Check Storage security rules
- Verify file size is under 5MB
- Ensure user is authenticated

### Admin dashboard not accessible
- Verify email is in `NEXT_PUBLIC_ADMIN_EMAILS`
- Check for typos in email address
- Restart development server after changing env variables

## Support

For issues or questions:
- Firebase Documentation: https://firebase.google.com/docs
- Maintafox Support: contact@maintafox.systems

---

**Note**: This setup provides a solid foundation for the blog system. Additional features like comments, likes, and advanced analytics can be added as needed.
