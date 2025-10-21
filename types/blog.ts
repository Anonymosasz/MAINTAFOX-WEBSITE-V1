export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  coverImage?: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  readingTime: string;
  tags?: string[];
  slug: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  isApproved: boolean;
}
