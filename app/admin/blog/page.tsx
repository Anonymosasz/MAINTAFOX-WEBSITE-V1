'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { BlogPost } from '@/types/blog';
import {
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Clock,
  FileText,
  Loader,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogDashboard() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'published' | 'draft' | 'rejected'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/blog');
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (!isAdmin) return;

    setLoading(true);
    let q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    if (filter !== 'all') {
      q = query(collection(db, 'posts'), where('status', '==', filter), orderBy('createdAt', 'desc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        publishedAt: doc.data().publishedAt?.toDate(),
      })) as BlogPost[];

      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [filter, isAdmin]);

  const handleApprove = async (postId: string) => {
    try {
      await updateDoc(doc(db, 'posts', postId), {
        status: 'published',
        publishedAt: new Date(),
      });
    } catch (err) {
      console.error('Error approving post:', err);
    }
  };

  const handleReject = async (postId: string) => {
    try {
      await updateDoc(doc(db, 'posts', postId), {
        status: 'rejected',
      });
    } catch (err) {
      console.error('Error rejecting post:', err);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'posts', postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const stats = {
    total: posts.length,
    pending: posts.filter((p) => p.status === 'pending').length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
  };

  return (
    <main className="section min-h-screen bg-slate-50">
      <div className="container-12">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
            <Shield className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-brand">Admin Blog Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">Manage and moderate blog posts</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Posts', value: stats.total, icon: FileText, color: 'brand' },
            { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'amber-600' },
            { label: 'Published', value: stats.published, icon: CheckCircle, color: 'emerald-600' },
            { label: 'Drafts', value: stats.draft, icon: Edit, color: 'slate-600' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className={`mt-2 text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 text-${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-3">
          {['all', 'pending', 'published', 'draft', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === f
                  ? 'bg-brand text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Post
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {posts.map((post) => (
                  <tr key={post.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{post.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{post.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-slate-700">{post.authorName}</p>
                        <p className="text-xs text-slate-500">{post.authorEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          post.status === 'published'
                            ? 'bg-emerald-100 text-emerald-700'
                            : post.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : post.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {post.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {post.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(post.id)}
                              className="grid h-8 w-8 place-items-center rounded-lg text-emerald-600 transition hover:bg-emerald-50"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleReject(post.id)}
                              className="grid h-8 w-8 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="grid h-8 w-8 place-items-center rounded-lg text-brand transition hover:bg-brand/10"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/blog/edit/${post.id}`}
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {posts.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-3 text-sm text-slate-500">No posts found</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
