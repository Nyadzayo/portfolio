import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
const rootDirectory = path.join(process.cwd(),'content', 'projects')

export type Project = {
    metadata: ProjectMetadata
    content:string
}

export type ProjectMetadata = {
    title?:string 
    summary?:string
    image?:string
    author?:string
    publishedAt?: string 
    slug?: string
    stack?: string
    category?:string
}

export async function getProjectBySlug(slug:string): Promise<Project | null> {
    try {
        
        const filePath = path.join(rootDirectory,`${slug}.mdx`)
        console.log('Fetching project from:', filePath);
    const fileContents = fs.readFileSync(filePath, {encoding: 'utf8'})
    const { data, content } = matter(fileContents)

    return {metadata: {...data, slug }, content }

    }catch(error) {
        console.error(error)
        return null;
    }
    

}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
    const files =  fs.readdirSync(rootDirectory)
    const projects= files
    .map(file => getProjectMetaData(file))
    .sort((a, b)=>{
        if(new Date(a.publishedAt ?? '')< new Date(b.publishedAt ?? '')){
            return 1
        }else {
            return 0
        }
    })

    if(typeof limit === "number" && limit > 0){
        return projects.slice(0,limit)
    }

    return projects;
}

export function getProjectMetaData(filepath: string ):ProjectMetadata {
    const slug = filepath.replace(/\.mdx$/, '');
    const filePath = path.join(rootDirectory, filepath);
    try {
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        const { data } = matter(fileContent);
        return { ...data, slug };
    } catch (error) {
        console.error('Error reading metadata file:', error);
        return { slug }; // Return only the slug if metadata parsing fails
    }

}
