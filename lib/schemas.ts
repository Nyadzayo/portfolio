import { z } from 'zod';

export const ContactFormSchema = z.object({
    name: z
    .string()
    .min(1,{message:'Name is required.'})
    .min(2, { message: 'Must be at least 2 characters.'}),

    email: z
    .string()
    .min(1, { message: 'Email is required.'})
    .email('Invalid email'),
    message: z.string().min(1, { message: 'Message required.'})
})

export const NewsletterFormSchema = z.object({
    email: z.string().email('Invalid email')
})

// Define the schema for the project request form
export const ProjectRequestFormSchema = z.object({
    name: z.string().nonempty('Name is required'),
    projectDescription: z.string().nonempty('Project Description is required'),
    category: z.string().nonempty('Category is required'),
    budget: z.string().nonempty('Budget is required'),
    customBudget: z.string().optional(),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    phone: z.string().regex(/^(\+263|0)?7\d{8}$/, 'Invalid phone number'),
    documentation: z.boolean().optional(),
    file: z.any().optional()
    
});