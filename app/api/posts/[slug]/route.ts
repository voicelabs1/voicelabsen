import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    return NextResponse.json({
      ...data,
      content,
      slug
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }
} 