import Link from 'next/link';
import { getProjects } from '@/lib/projects'
import Projects from '@/components/ui/projects';

export default async function RecentProject(){
    const projects = await getProjects(4);

    return (
        <section className="pb-24">
            <div>
            <h2 className="title mb-12"> Recent Projects</h2>
                <Projects projects={projects} />
                <Link 
                    href='/projects'
                    className='mt-8 inline-flex items-center gap-2 text-muted-foreground'
                >
                    <span>All Projects </span>

                </Link>

            </div>
            
        </section>
    )
}