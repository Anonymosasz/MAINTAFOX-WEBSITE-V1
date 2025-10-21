'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { Edit3, Loader, Calendar, Clock } from 'lucide-react';

const posts = [
  {
    title: 'How to build a proactive maintenance strategy with a CMMS',
    category: 'Maintenance Strategy',
    date: 'January 2025',
    excerpt:
      'Discover the seven steps to transition from reactive to proactive maintenance. Learn how Maintafox helps Algerian plants standardize work orders, enforce preventive maintenance, and track KPIs.',
    readingTime: '8 min read',
  },
  {
    title: 'Calculating MTTR, MTBF, and availability: formulas every reliability leader needs',
    category: 'Analytics & KPIs',
    date: 'December 2024',
    excerpt:
      'We break down core maintenance KPIs with real examples from manufacturing and energy operations. See how Maintafox dashboards visualize trends and trigger improvement actions.',
    readingTime: '6 min read',
  },
  {
    title: 'Digitalizing work orders for field technicians in remote sites',
    category: 'Mobile Maintenance',
    date: 'November 2024',
    excerpt:
      'Field technicians need offline-first tools to complete work safely. Learn best practices for mobile CMMS deployment, checklist design, and technician adoption across Algeria.',
    readingTime: '7 min read',
  },
  {
    title: 'Maintenance budgeting: linking spare parts, labor, and capital planning',
    category: 'Finance & Planning',
    date: 'October 2024',
    excerpt:
      'Use CMMS cost intelligence to align maintenance and finance teams. We explore how to track spend, forecast needs, and justify investments with Maintafox analytics.',
    readingTime: '9 min read',
  },
];

export default function BlogPage() {
  const { user, isAdmin } = useAuth();
  const [livePosts, setLivePosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        publishedAt: doc.data().publishedAt?.toDate(),
      })) as BlogPost[];

      setLivePosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayPosts = livePosts.length > 0 ? livePosts : posts.map((p, idx) => ({
    ...p,
    id: `placeholder-${idx}`,
    slug: p.title.toLowerCase().replace(/\s+/g, '-'),
    content: '',
    authorId: '',
    authorName: 'Maintafox Team',
    authorEmail: '',
    status: 'published' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
  }));

  return (
    <>
      <main>
        <section className="section bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="container-12">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-brand">Maintafox Insights</h1>
                <p className="mt-4 max-w-3xl text-lg text-slate-700">
                  Practical guides, benchmarks, and thought leadership on maintenance reliability, CMMS
                  best practices, and digital transformation across Algerian industries.
                </p>
              </div>
              {user && (
                <Link
                  href="/blog/create"
                  className="flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand/90"
                >
                  <Edit3 className="h-4 w-4" />
                  Create Post
                </Link>
              )}
            </div>
            {isAdmin && (
              <Link
                href="/admin/blog"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/20"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </section>

        {loading ? (
          <section className="section flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-brand" />
          </section>
        ) : (
          <section className="section">
            <div className="container-12 grid gap-8 lg:grid-cols-2">
              {displayPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {post.category}
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-brand">{post.title}</h2>
                  <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.publishedAt?.toLocaleDateString() || post.createdAt.toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime}
                    </span>
                  </div>
                  {livePosts.length > 0 ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 text-sm text-brand underline-offset-4 hover:underline"
                    >
                      Read article →
                    </Link>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500">
                      Full article coming soon
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="section section-muted">
          <div className="container-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-brand">Get notified when we publish</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Subscribe to the Maintafox newsletter for maintenance playbooks, industry benchmarking
              data, and invitations to our webinar series.
            </p>
            <p className="mt-4 text-sm text-brand underline-offset-4 hover:underline">
              Email us at contact@maintafox.systems to join the list.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
