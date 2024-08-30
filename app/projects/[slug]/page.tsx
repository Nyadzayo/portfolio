import MDXContent from '@/components/ui/mdx-content';
import { getProjectBySlug, getProjects } from '@/lib/projects';
import { formatDate } from '@/lib/utils';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';

import { notFound } from 'next/navigation';
import React from 'react'
export async function generateStaticParams(){
    const posts = await getProjects()
    const slugs = posts.map((post:any) =>({ slug:post.slug }))

    return slugs;
}

export default async function Project({params}:{params:{slug:string }}) {
    const {slug } = params;
    const post = await getProjectBySlug(slug);
    

    if(!post) {
        notFound()
    }

    const { metadata, content } = post;
    const { title, image , author , publishedAt } =  metadata;

  return (
    <section className="pb-24 pt-32">
        <div className="container max-w 3xl">
            <Link
                href='/projects'
                className="mb-8 inline-flex items-center gap-2 text-sm font-light text-foreground"
            >
                <ArrowLeftIcon className="h-5 w5"/>
                <span>Back to projects</span>
            </Link>
            {
                image&&(
                    <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
                        <Image
                            src={image}
                            alt={title || ''}
                            className='object-cover'
                            fill
                        />
                    </div>
                )
            }
            <header>
                <h1 className="title">{title}</h1>
                <p className="mt-3 text-xs text-muted-foreground">
                    {author}/ {formatDate(publishedAt?? '')}
                </p>
            </header>
            <main className="prose mt-16 dark:prose-invert">
                <MDXContent source ={content} />
            </main>
        </div>
    </section>
  )
}
