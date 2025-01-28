import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Metadata } from 'next';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

// Add caching headers
export const headers = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

// Add metadata for better SEO
export const metadata: Metadata = {
  title: 'Blog | Voicelabs',
  description: 'Lees de nieuwste inzichten over AI-telefonie en klantenservice automatisering.',
  openGraph: {
    title: 'Blog | Voicelabs',
    description: 'Lees de nieuwste inzichten over AI-telefonie en klantenservice automatisering.',
    type: 'website',
    locale: 'nl_NL',
  },
};

interface Post {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  slug: string;
}

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        slug: filename.replace('.md', '')
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  
  return posts;
}

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-medium text-gray-500 tracking-wide mb-6">Nieuws</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <h1 className="text-[56px] leading-[1.1] mb-6">
              De nieuwste inzichten in <br />
              <span className="text-[#0063f2]">AI-telefonie.</span>
            </h1>
            <p className="text-xl text-gray-600 font-light mt-4 lg:mt-8">
              Bedrijven kunnen tegenwoordig profiteren van geavanceerde spraakassistenten die natuurlijke, persoonlijke interacties met klanten mogelijk maken.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {posts.map((post, index) => (
              <Link 
                key={post.slug}
                href={`/nieuws/${post.slug}`}
                className="group flex items-center gap-8 hover:bg-gray-50 p-4 -mx-4 rounded-2xl transition-colors"
              >
                <div className="relative w-[240px] h-[180px] rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={post.coverImage || "/plaatjes/implementatie.jpg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index === 0} // Add priority to first image
                    loading={index === 0 ? 'eager' : 'lazy'} // Eager load first image
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-[1.55rem] leading-[1.55rem] font-medium text-gray-900 mb-4 group-hover:text-[#0063f2] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <time className="text-gray-500" dateTime={post.date}>
                    {format(new Date(post.date), 'MMMM d, yyyy', { locale: nl })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 