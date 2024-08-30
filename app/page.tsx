import Intro from '@/components/ui/intro';
import NewsletterForm from '@/components/ui/newsletter-form';
import RecentPost from '@/components/ui/recent-posts';
import RecentProject from '@/components/ui/recent-projects';


export default function Home(){

  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <Intro />
        <RecentPost />
        <RecentProject/>
        <NewsletterForm/>

      </div>
    </section>
  )
}