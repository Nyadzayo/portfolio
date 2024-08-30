'use server' 

import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormSchema, NewsletterFormSchema } from './schemas';
import ContactFormEmail from '@/emails/contact-form-email'

type ContactFormInputs =  z.infer<typeof ContactFormSchema>
const resend  = new Resend('re_7gfxWCJg_LNfLW8o7gcNraRWzKr8KkiFY') 


export async function sendEmail(data:ContactFormInputs){

  const result = ContactFormSchema.safeParse(data);
  if(result.error){
    return { error: result.error.format() }
  }

  try {
    const { email, name , message } = result.data;
    const { data , error } = await resend.emails.send({
        from:'Kelvin <onboarding@resend.dev>',
        to: [email],
        cc:['kelvin.nyadzayo16@gmail.com'],
        subject:'Contact form submission',
        text: `Name: ${name} \nEmail: ${email}\nMessage: ${message}`,
        react: ContactFormEmail({name , email , message })
    })
    if(!data|| error ) {
        throw new Error('Failed to send email')
    }

    return {success: true }
  }catch(error){
    return {error}
  }
}

export async function subscribe(data:{email:string}){
    const result = NewsletterFormSchema.safeParse(data);
  if(result.error){
    return { error: result.error.format() }
  }

}