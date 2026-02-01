import { notFound } from 'next/navigation';
import BlogDetail from '@/components/blog/BlogDetail';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts().filter((post) => post.category === 'psychology');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PsychologyPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'psychology');

  if (!post) {
    notFound();
  }

  return (
    <div className="container-custom py-12">
      <BlogDetail post={post} />
    </div>
  );
}
