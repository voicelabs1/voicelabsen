import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';

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
}

interface MDXComponentProps {
  children: React.ReactNode;
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  const excerpt = post.excerpt || post.content.slice(0, 160) + '...';
  const ogImage = post.coverImage || "/nieuws/implementatie.jpg";
  
  return {
    title: `${post.title} | Voicelabs Blog`,
    description: excerpt,
    keywords: "AI telefonist, AI receptionist, klantenservice automatisering, virtuele receptionist",
    authors: [{ name: post.author || "Voicelabs" }],
    publisher: "Voicelabs",
    openGraph: {
      title: post.title,
      description: excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Voicelabs'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://voicelabs.nl/nieuws/${params.slug}`,
    },
  };
}

async function getPost(slug: string): Promise<BlogPost> {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
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
    author: data.author
  };
}

const components = {
  h2: ({ children }: MDXComponentProps) => (
    <h2 className="text-[1.75rem] leading-[128%] tracking-[-1px] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3rem] lg:tracking-[-2px] font-normal text-gray-900 mt-16 mb-6">
      {children}
    </h2>
  ),
  h3: ({ children }: MDXComponentProps) => (
    <h3 className="text-2xl leading-[30px] font-normal text-gray-900 mt-5 mb-4">
      {children}
    </h3>
  ),
  p: ({ children }: MDXComponentProps) => (
    <p className="text-[1.125rem] leading-[1.575rem] md:text-[1.25rem] md:leading-[1.75rem] font-light text-gray-600 my-6">
      {children}
    </p>
  ),
  ul: ({ children }: MDXComponentProps) => (
    <ul className="my-6 space-y-4 list-disc pl-4">
      {children}
    </ul>
  ),
  li: ({ children }: MDXComponentProps) => (
    <li className="text-[1.125rem] leading-[1.575rem] md:text-[1.25rem] md:leading-[1.75rem] font-light text-gray-600">
      {children}
    </li>
  ),
  strong: ({ children }: MDXComponentProps) => (
    <strong className="font-medium text-gray-900">
      {children}
    </strong>
  ),
};

export default async function BlogPost({ params }: PageProps) {
  const post = await getPost(params.slug);
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy', { locale: nl });

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Add JSON-LD Schema */}
      <Script id="article-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          image: [post.coverImage || "/nieuws/implementatie.jpg"],
          datePublished: post.date,
          dateModified: post.date,
          author: [{
            '@type': 'Organization',
            name: 'Voicelabs',
            url: 'https://voicelabs.nl'
          }],
          publisher: {
            '@type': 'Organization',
            name: 'Voicelabs',
            logo: {
              '@type': 'ImageObject',
              url: 'https://voicelabs.nl/plaatjes/logovoicelabs.svg'
            }
          },
          description: post.excerpt || post.content.slice(0, 160) + '...',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://voicelabs.nl/nieuws/${params.slug}`
          }
        })}
      </Script>
      
      <article className="pt-32 pb-24" itemScope itemType="https://schema.org/Article">
        {/* Hero Section */}
        <div className="px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <Link href="/nieuws" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                      Blog
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{post.title}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="lg:pt-12">
                <time 
                  className="text-sm text-gray-500 mb-4 block" 
                  dateTime={post.date}
                  itemProp="datePublished"
                >
                  {formattedDate}
                </time>

                <h1 
                  className="text-[2.75rem] leading-[1.1] lg:text-[3.5rem] font-normal tracking-[-2px] text-gray-900"
                  itemProp="headline"
                >
                  {post.title}
                </h1>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={post.coverImage || "/nieuws/implementatie.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  itemProp="image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6" itemProp="articleBody">
              <MDXRemote 
                source={post.content}
                components={components}
                options={{
                  parseFrontmatter: false,
                  mdxOptions: {
                    remarkPlugins: [],
                    rehypePlugins: [],
                  },
                }}
              />
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
} 