'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag, Loader, Edit } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const slug = params.slug as string;
        const q = query(collection(db, 'posts'), where('slug', '==', slug));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const postData = {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
            publishedAt: doc.data().publishedAt?.toDate(),
          } as BlogPost;

          // Only show published posts or allow author/admin to view
          if (
            postData.status === 'published' ||
            user?.uid === postData.authorId ||
            isAdmin
          ) {
            setPost(postData);
          } else {
            setError('This post is not yet published.');
          }
        } else {
          setError('Post not found.');
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params.slug, user, isAdmin]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <main className="section min-h-screen">
        <div className="container-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">{error || 'Post not found'}</h1>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 text-brand hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section min-h-screen">
      <article className="container-10">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mt-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              {post.category}
            </span>
            {post.status !== 'published' && (
              <span
                className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${
                  post.status === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : post.status === 'draft'
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {post.status}
              </span>
            )}
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-6 text-xl text-slate-600">{post.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {post.publishedAt?.toLocaleDateString() || post.createdAt.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-slate-400" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(user?.uid === post.authorId || isAdmin) && (
            <Link
              href={`/blog/edit/${post.id}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/20"
            >
              <Edit className="h-4 w-4" />
              Edit Post
            </Link>
          )}
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mt-12 overflow-hidden rounded-3xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-slate mx-auto mt-12 max-w-3xl prose-headings:font-bold prose-headings:text-brand prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-slate-800 prose-pre:rounded-xl prose-pre:bg-slate-900">
          {/* Simple markdown-like rendering */}
          {post.content.split('\n\n').map((paragraph, idx) => {
            // Check for headings
            if (paragraph.startsWith('# ')) {
              return (
                <h1 key={idx} className="text-3xl">
                  {paragraph.replace('# ', '')}
                </h1>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }

            // Check for lists
            if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
              const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
              return (
                <ul key={idx}>
                  {items.map((item, i) => (
                    <li key={i}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }

            // Check for code blocks
            if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
              const code = paragraph.replace(/```\w*\n?/g, '');
              return (
                <pre key={idx}>
                  <code>{code}</code>
                </pre>
              );
            }

            // Regular paragraph
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Author Bio */}
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-lg font-semibold text-brand">About the Author</h3>
          <div className="mt-4 flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-xl font-bold text-brand">
              {post.authorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{post.authorName}</p>
              <p className="mt-1 text-sm text-slate-600">
                Maintafox contributor sharing insights on CMMS, maintenance strategy, and
                reliability engineering.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts CTA */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h3 className="text-2xl font-semibold text-brand">Continue Reading</h3>
          <p className="mt-3 text-slate-600">
            Explore more articles on maintenance strategy and CMMS best practices
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            View All Articles
          </Link>
        </div>
      </article>
    </main>
  );
}
