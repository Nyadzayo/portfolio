import Link from 'next/link';
import { ProjectMetadata } from '@/lib/projects';
import { formatDate } from '@/lib/utils';

export default function Post({ projects }: { projects: ProjectMetadata[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {projects.map((project) => (
        <li key={project.slug} className="relative">
          {/* Link wraps the entire card content */}
          <Link
            href={`/projects/${project.slug}`}
            className="block"
          >
            <div className="flex flex-col justify-between gap-x-4 gap-y-1 p-6 rounded-lg bg-background shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="flex justify-between items-center mb-4">
                {/* Title on the left */}
                <p className="text-lg font-semibold">{project.title}</p>
                {/* Views count on the right */}
                <p className="text-sm font-light text-muted-foreground">
                  {2} views
                </p>
              </div>
              <p className="mt-1 line-clamp-2 text-sm font-light text-muted-foreground">
                {project.summary}
              </p>
              {project.publishedAt && (
                <div className="absolute bottom-6 right-6 text-sm font-light text-muted-foreground">
                  {`${formatDate(project.publishedAt)}`}
                </div>
              )}
              {project.stack && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.split(',').map((techUsed, index) => (
                    <span
                      key={index}
                      className="inline-block to-sky-700 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {techUsed}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
