// project request component is a form that allows users to request a project. It is used in the project request page.
import  ProjectRequestForm  from '@/components/ui/project-request-form';

export default function ProjectRequest() {
    return (
        <section className="pb-24 pt-40">
            <div className="container max-w-3xl">
                <h2 className="title">
                    Request A Project
                </h2>

                <ProjectRequestForm />
            </div>
        </section>
    )
}