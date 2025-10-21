'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Save, Image as ImageIcon, Loader } from 'lucide-react';

export default function CreateBlogPost({ postId }: { postId?: string }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/blog');
    }

    if (postId && user) {
      setIsEdit(true);
      loadPost(postId);
    }
  }, [user, authLoading, postId, router]);

  const loadPost = async (id: string) => {
    try {
      const postDoc = await getDoc(doc(db, 'posts', id));
      if (postDoc.exists()) {
        const data = postDoc.data();
        setTitle(data.title);
        setCategory(data.category);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setTags(data.tags?.join(', ') || '');
        setCoverImageUrl(data.coverImage || '');
      }
    } catch (err) {
      console.error('Error loading post:', err);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const uploadImage = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const fileName = `blog-covers/${timestamp}-${file.name}`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'pending') => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setLoading(true);

    try {
      let imageUrl = coverImageUrl;
      if (coverImage) {
        imageUrl = await uploadImage(coverImage);
      }

      const postData = {
        title,
        category,
        excerpt,
        content,
        slug: generateSlug(title),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        coverImage: imageUrl,
        authorId: user.uid,
        authorName: user.displayName,
        authorEmail: user.email,
        status,
        readingTime: calculateReadingTime(content),
        updatedAt: new Date(),
      };

      if (isEdit && postId) {
        await updateDoc(doc(db, 'posts', postId), postData);
      } else {
        await addDoc(collection(db, 'posts'), {
          ...postData,
          createdAt: new Date(),
        });
      }

      router.push('/blog');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="section">
      <div className="container-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-brand">
            {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className="mt-3 text-slate-600">
            {isEdit
              ? 'Update your blog post and submit for review.'
              : 'Share your insights with the Maintafox community. Posts require admin approval before publishing.'}
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Maintenance Strategy">Maintenance Strategy</option>
                  <option value="Analytics & KPIs">Analytics & KPIs</option>
                  <option value="Mobile Maintenance">Mobile Maintenance</option>
                  <option value="Finance & Planning">Finance & Planning</option>
                  <option value="Asset Management">Asset Management</option>
                  <option value="Industry Insights">Industry Insights</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="cmms, maintenance, reliability (comma-separated)"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Excerpt *</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of your post (1-2 sentences)"
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Cover Image</label>
              <div className="mt-2 flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <ImageIcon className="h-4 w-4" />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                {(coverImage || coverImageUrl) && (
                  <span className="text-sm text-slate-600">
                    {coverImage?.name || 'Current image set'}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Content *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post content here... (supports markdown)"
                rows={20}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                required
              />
              <p className="mt-2 text-xs text-slate-500">
                Estimated reading time: {calculateReadingTime(content)}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'draft')}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'pending')}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90 disabled:opacity-50"
              >
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
