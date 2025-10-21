'use client';

import { useParams } from 'next/navigation';
import CreateBlogPost from '../../create/page';

export default function EditBlogPostPage() {
  const params = useParams();
  const postId = params.id as string;

  return <CreateBlogPost postId={postId} />;
}
