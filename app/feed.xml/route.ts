import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  // Get all posts
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || content.slice(0, 160) + '...',
      slug: filename.replace('.md', ''),
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Generate RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Voicelabs Blog</title>
    <link>https://voicelabs.agency</link>
    <description>Nieuws en updates over AI-telefonie en klantenservice automatisering</description>
    <language>nl</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://voicelabs.agency/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>https://voicelabs.agency/news/${post.slug}</link>
        <guid>https://voicelabs.agency/news/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
      </item>
    `).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
} 