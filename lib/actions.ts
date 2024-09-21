import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormSchema, NewsletterFormSchema, ProjectRequestFormSchema } from './schemas';
import ContactFormEmail from '@/emails/contact-form-email';
import ProjectRequestEmail from '@/emails/project-request-email';

type ContactFormInputs = z.infer<typeof ContactFormSchema>;
type ProjectRequestFormInputs = z.infer<typeof ProjectRequestFormSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: ContactFormInputs | ProjectRequestFormInputs, formType: 'contact-form' | 'project-request') {
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
        const { email, name, message, projectDescription, category, budget, phone, documentation } = result.data as any;
        const ccEmails = ['kelvin.nyadzayo16@gmail.com'];
        if (formType === 'project-request') {
            ccEmails.push(email);
        }

        const emailData = {
            from: 'Kelvin <onboarding@resend.dev>',
            to: [email],
            cc: ccEmails,
            subject: formType === 'contact-form' ? 'Contact form submission' : 'Project request submission',
            text: formType === 'contact-form'
                ? `Name: ${name} \nEmail: ${email}\nMessage: ${message}`
                : `Name: ${name} \nEmail: ${email}\nProject Description: ${projectDescription}\nCategory: ${category}\nBudget: ${budget}\nPhone: ${phone}\nDocumentation: ${documentation ? 'Yes' : 'No'}`,
            react: formType === 'contact-form'
                ? ContactFormEmail({ name, email, message })
                : ProjectRequestEmail({ name, email, projectDescription, category, budget, phone, documentation })
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

export async function subscribe(data: { email: string }) {
    const result = NewsletterFormSchema.safeParse(data);
    // Rest of the subscribe function...
}