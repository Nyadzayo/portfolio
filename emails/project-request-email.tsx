interface ProjectRequestProps {
    name: string;
    email: string;
    projectDescription: string;
    category: string;
    budget: string;
    customBudget?: string;
    phone: string;
    documentation?: boolean;
}

const ProjectRequestEmail: React.FC<Readonly<ProjectRequestProps>> = ({
    name,
    email,
    projectDescription,
    category,
    budget,
    customBudget,
    phone,
    documentation
}) => (
    <div>
        <h1>Project Request Submission</h1>
        <p>
            From <strong>{name}</strong> at <strong>{email}</strong>
        </p>
        <h2>Project Details</h2>
        <p><strong>Project Description:</strong> {projectDescription}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Budget:</strong> {budget === 'custom' ? `Custom Budget: ${customBudget}` : budget}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Documentation Requested:</strong> {documentation ? 'Yes' : 'No'}</p>
    </div>
);

export default ProjectRequestEmail;