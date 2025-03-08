import { readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

interface BlogPost {
  title: string;
  date: string;
  coverImage: string;
  content: string;
  slug: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  category?: string;
}

async function getPost(slug: string): Promise<BlogPost> {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  try {
    const fileContents = await readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Remove the first heading since we display it separately
    const contentWithoutTitle = content
      .split('\n')
      .filter(line => !line.startsWith('# '))
      .join('\n')
      .trim();
    
    return {
      title: data.title,
      date: data.date,
      coverImage: data.coverImage,
      content: contentWithoutTitle,
      slug,
      excerpt: data.excerpt,
      author: data.author,
      tags: data.tags || [],
      category: data.category
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    throw new Error('Failed to load blog post');
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  const excerpt = post.excerpt || post.content.slice(0, 160) + '...';
  const ogImage = post.coverImage || "/images/implementation.jpg";
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed
  
  // Combine default keywords with post tags
  const keywords = [
    "AI receptionist",
    "customer service automation",
    "virtual receptionist",
    "Voicelabs",
    ...(post.tags || [])
  ].join(", ");

  return {
    title: `${post.title} | Voicelabs Blog`,
    description: excerpt,
    keywords: keywords,
    authors: [{ name: post.author || "Voicelabs" }],
    publisher: "Voicelabs",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.title,
      description: excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author || 'Voicelabs'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      siteName: 'Voicelabs Blog',
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
      images: [ogImage],
      site: '@voicelabs',
      creator: '@voicelabs',
    },
    alternates: {
      canonical: `https://voicelabs.agency/news/${params.slug}`,
    },
    other: {
      'article:published_time': post.date,
      'article:modified_time': post.date,
      'article:section': post.category || 'Blog',
      'article:tag': post.tags?.join(',') || '',
      'og:site_name': 'Voicelabs Blog',
      'twitter:label1': 'Written by',
      'twitter:data1': post.author || 'Voicelabs',
      'twitter:label2': 'Reading time',
      'twitter:data2': `${readingTime} minutes`,
    },
  };
}

export { getPost }; 