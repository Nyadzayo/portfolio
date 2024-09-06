import  Link  from 'next/link';
import { PostMetadata } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
 
export default function Post({posts}: {posts: PostMetadata[]}){
    return(
        <ul className="space-y-8">
  {posts.map(post => (
    <li key={post.slug} className="flex items-start justify-between gap-x-4">
      <Link
        href={`/posts/${post.slug}`}
        className='flex-1 flex flex-col justify-between gap-x-4 gap-y-1'
      >
        <div className="max-w-lg">
          <p className="text-lg font-semibold">
            {post.title}
          </p>
          <p className="mt-1 line-clamp-2 text-sm font-light text-muted-foreground">
            {post.summary}
          </p>
        </div>
      </Link>
      {
        post.publishedAt && (
          <p className="text-sm font-light whitespace-nowrap">
            {formatDate(post.publishedAt)}
          </p>
        )
      }
    </li>
  ))}
</ul>

    )
}