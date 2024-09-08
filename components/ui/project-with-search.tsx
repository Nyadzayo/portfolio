'use client'

import { useState } from 'react';
import { ProjectMetadata } from '@/lib/projects';
import Project from '@/components/ui/projects';
import { Input } from '@/components/ui/input';
import {Button } from '@/components/ui/button';
import { Cross2Icon  } from '@radix-ui/react-icons';

export default function ProjectWithSearch({projects}: {projects: ProjectMetadata[]}){

    const [ query , setQuery] =  useState('');
    const [category, setCategory] = useState(''); // State for category filter
    // Filter projects by query and category
    const filtered = projects.filter(project => 
        project.title?.toLowerCase().includes(query.toLowerCase()) &&
        (category === '' || project.category?.toLocaleLowerCase().includes(category.toLowerCase()) )
    );

    
    const isFiltered = query.length > 0 || category.length > 0;

    function resetFilter() {
        setQuery('');
        setCategory('');
    }
    return (
        <div >
            <div className="mb-12 flex items-center gap-3">
                <Input
                    type="text"
                    placeholder="Search projects..."
                    className="h-9 w-full sm:w-1/2"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <select
                    className="h-9 border rounded px-2"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="web application">Web Application</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="machine learning">Machine Learning</option>
                </select>
                {
                    isFiltered&&(
                        <Button
                            size='sm'
                            variant='secondary'
                            onClick={resetFilter}
                         className="h-8 px-2 lg:px-3"
                         >
                            Reset 
                            <Cross2Icon className="ml-2 h-4 w-4"/>
                        </Button>
                    )
                }
            </div>
            <Project projects={filtered}/>
        </div>
    )
}