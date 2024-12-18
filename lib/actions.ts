'use server' 
import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormSchema, NewsletterFormSchema, ProjectRequestFormSchema } from './schemas';
import ContactFormEmail from '@/emails/contact-form-email';
import ProjectRequestEmail from '@/emails/project-request-email';

type ContactFormInputs = z.infer<typeof ContactFormSchema>;
type ProjectRequestFormInputs = z.infer<typeof ProjectRequestFormSchema>;

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(data:( ContactFormInputs | ProjectRequestFormInputs), formType: 'contact-form' | 'project-request') {
    let result;
    if (formType === 'contact-form') {
        result = ContactFormSchema.safeParse(data);
    } else if (formType === 'project-request') {
        result = ProjectRequestFormSchema.safeParse(data);
    }

    if (result?.error) {
        return { error: result.error.format() };
    }

    if (!result) {
        throw new Error('Parsing result is undefined');
    }

    try {
        const { email, name, message, projectDescription, category, budget, phone, documentation,file } = result.data as any;
        const toEmails = ['kelvin.nyadzayo16@gmail.com'];
        const ccEmails = formType === 'project-request' ? [email] : [];
         // If the form includes a file, convert it to a format that can be attached
         let attachments = [];
         if (file) {
             const attachment = file.get('file') as File;
             if (attachment) {
                 const fileData = await attachment.arrayBuffer();
                 const base64File = Buffer.from(fileData).toString('base64');
                 attachments.push({
                     filename: attachment.name,
                     content: base64File,
                     encoding: 'base64',
                 });
             }
         }


        const emailData = {
            from: 'Kelvin <onboarding@resend.dev>',
            to: toEmails,
            
            subject: formType === 'contact-form' ? 'Contact form submission' : 'Project request submission',
            text: formType === 'contact-form'
                ? `Name: ${name} \nEmail: ${email}\nMessage: ${message}`
                : `Name: ${name} \nEmail: ${email}\nProject Description: ${projectDescription}\nCategory: ${category}\nBudget: ${budget}\nPhone: ${phone}\nDocumentation: ${documentation ? 'Yes' : 'No'}`,
            react: formType === 'contact-form'
                ? ContactFormEmail({ name, email, message })
                : ProjectRequestEmail({ name, email, projectDescription, category, budget, phone, documentation }),
                attachments,
        };

        const { data: emailResponse, error } = await resend.emails.send(emailData);
        if (!emailResponse || error) {
            throw new Error('Failed to send email');
        }

        return { success: true };
    } catch (error) {
        return { error: error };
    }
}


type SubscribeResult = {
    success?: boolean;
    error?: string;
};

export async function subscribe(data: { email: string }): Promise<SubscribeResult> {
    const result = NewsletterFormSchema.safeParse(data);

    if (!result.success) {
        return { error: 'Invalid data' };
    }

    try {
        // Simulate an API call to subscribe the user
        // Replace this with your actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { success: true };
    } catch (error) {
        return { error: 'Failed to subscribe' };
    }
}