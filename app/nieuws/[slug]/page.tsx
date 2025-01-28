import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Script from 'next/script';
import Link from 'next/link';
import { getPost } from './metadata';

interface PageProps {
  params: {
    slug: string;
  };
}

interface MDXComponentProps {
  children: React.ReactNode;
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
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced JSON-LD Schema */}
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
            url: 'https://voicelabs.nl',
            logo: {
              '@type': 'ImageObject',
              url: 'https://voicelabs.nl/plaatjes/logovoicelabs.svg'
            }
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
          articleBody: post.content,
          wordCount: wordCount,
          timeRequired: `PT${readingTime}M`,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://voicelabs.nl/nieuws/${params.slug}`
          },
          keywords: [
            'AI telefonist',
            'AI receptionist',
            'klantenservice automatisering',
            'virtuele receptionist',
            'Voicelabs',
            'kunstmatige intelligentie',
            'automatisering',
            'klantenservice'
          ],
          inLanguage: 'nl-NL',
          isAccessibleForFree: true,
          copyrightYear: new Date(post.date).getFullYear(),
          copyrightHolder: {
            '@type': 'Organization',
            name: 'Voicelabs'
          }
        })}
      </Script>
      
      <article 
        className="pt-32 pb-24" 
        itemScope 
        itemType="https://schema.org/Article"
        lang="nl"
      >
        {/* Hero Section */}
        <div className="px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs with Schema.org markup */}
            <nav 
              className="flex flex-wrap text-sm" 
              aria-label="Breadcrumb"
              itemScope 
              itemType="https://schema.org/BreadcrumbList"
            >
              <ol className="flex flex-wrap items-center">
                <li 
                  className="inline-flex items-center"
                  itemProp="itemListElement" 
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <Link 
                    href="/" 
                    className="text-gray-700 hover:text-blue-600"
                    itemProp="item"
                  >
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                  <svg className="w-3 h-3 text-gray-400 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                </li>
                <li
                  itemProp="itemListElement" 
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="inline-flex items-center"
                >
                  <Link 
                    href="/nieuws" 
                    className="text-gray-700 hover:text-blue-600"
                    itemProp="item"
                  >
                    <span itemProp="name">Blog</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                  <svg className="w-3 h-3 text-gray-400 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                </li>
                <li 
                  aria-current="page"
                  itemProp="itemListElement" 
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="inline-flex items-center"
                >
                  <span 
                    className="text-gray-500 truncate max-w-[200px] sm:max-w-none"
                    itemProp="name"
                  >
                    {post.title}
                  </span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-8">
              <div className="lg:pt-12">
                <time 
                  className="text-sm text-gray-500 mb-4 block" 
                  dateTime={post.date}
                  itemProp="datePublished"
                >
                  {formattedDate}
                </time>

                <h1 
                  className="text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] leading-[1.1] font-normal tracking-[-1px] sm:tracking-[-2px] text-gray-900"
                  itemProp="headline"
                >
                  {post.title}
                </h1>

                {/* Add reading time estimate */}
                <p className="text-sm text-gray-500 mt-4">
                  Leestijd: {readingTime} minuten
                </p>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={post.coverImage || "/nieuws/implementatie.jpg"}
                  alt={`Illustratie bij artikel: ${post.title}`}
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
        <div className="px-4 mt-12 lg:mt-24">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg prose-blue max-w-none" 
              itemProp="articleBody"
              lang="nl"
            >
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