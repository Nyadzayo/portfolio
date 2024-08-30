import Post from '@/components/ui/posts'
import { getPosts } from '@/lib/posts'
import PostWithSearch from '@/components/ui/posts-with-search'


export default async function PostPage() {
  const posts = await getPosts()
  
  return (
   
    <section className="pb-24 pt-40">
      <div className="container max-w-3xl">
        <h1 className="title mb-12">
          Posts
        </h1>
        <PostWithSearch posts = {posts}/>
      </div>
    </section>
  )
}
