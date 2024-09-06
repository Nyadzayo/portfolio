import Link from 'next/link';
import { ProjectMetadata } from '@/lib/projects';
import { formatDate } from '@/lib/utils';

export default function Post({ projects }: { projects: ProjectMetadata[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {projects.map((project) => (
        <li key={project.slug} className="relative">
          <Link
            href={`/projects/${project.slug}`}
            className="flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-initial p-6 rounded-lg bg-background shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col mb-4">
              <p className="text-lg font-semibold">{project.title}</p>
              <p className="mt-1 line-clamp-2 text-sm font-light text-muted-foreground">
                {project.summary}
              </p>
            </div>
            {project.publishedAt && (
              <div className="absolute bottom-6 right-6 text-sm font-light text-muted-foreground">
                {formatDate(project.publishedAt)}
              </div>
            )}
            {
                project.stack &&(
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.split(',').map((techUsed => (
                            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                            {techUsed}
                          </span>
                        )))

                        }
                    </div>
                  
                )
            }
          </Link>
        </li>
      ))}
    </ul>
  );
}
