import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

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
}

interface MDXComponentProps {
  children: React.ReactNode;
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
    slug
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

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="pt-32 pb-24">
        {/* Hero Section */}
        <div className="px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="lg:pt-12">
                <time className="text-sm text-gray-500 mb-4 block" dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM d, yyyy', { locale: nl })}
                </time>

                <h1 className="text-[2.75rem] leading-[1.1] lg:text-[3.5rem] font-normal tracking-[-2px] text-gray-900">
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
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
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