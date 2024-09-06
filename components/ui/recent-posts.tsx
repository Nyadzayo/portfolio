import Link from 'next/link';
import { getPosts } from '@/lib/posts'
import Posts from '@/components/ui/posts';

export default async function RecentPost(){
    const posts = await getPosts(4);

    return (
        <section className="mb-24">
            <div>
            <h2 className="title mb-12"> Recent Posts</h2>
                <Posts posts={posts} />
                <Link 
                    href='/posts'
                    className='mt-8 inline-flex items-center gap-4 text-muted-foreground'
                >
                    <span>All Posts </span>

                </Link>

            </div>
            
        </section>
    )
}