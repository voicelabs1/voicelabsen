'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface Post {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  slug: string;
}

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

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
            {posts.map((post) => (
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
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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