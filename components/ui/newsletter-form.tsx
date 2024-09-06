'use client' 

import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewsletterFormSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button';
import {Input } from '@/components/ui/input';
import { Card,CardContent } from '@/components/ui/card';
import { subscribe } from '@/lib/actions'

type Inputs = z.infer<typeof NewsletterFormSchema>

export default function NewsletterForm(){

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting }
    } = useForm<Inputs>({
        resolver: zodResolver(NewsletterFormSchema),
        defaultValues:{
            email:'',
        }
    })

    const processForm: SubmitHandler<Inputs> = async data =>{
        const result = await subscribe(data) ;

        if(result?.error){
            toast.error('An error occured! Please try again')
        }

      toast.success('Subscribed successfully')
      reset()
    }

    return (
        <section className="relative isolate">
        <Card className="rounded-lg border-0 dark:border-0"> {/* Fixed border typo */}
          <CardContent className="flex flex-col gap-8 pt-6 md:flex-row md:justify-between">
            <div className="flex flex-col flex-1">
              <h2 className="text-2xl font-bold">Subscribe to my newsletter</h2>
              <p className="text-muted-foreground">
                Get updates on my work and projects.
              </p>
            </div>
            
            {/* Form */}
            <div className="relative flex flex-col gap-4 flex-1">
              <form 
                onSubmit={handleSubmit(processForm)}
                className='flex flex-col gap-4' // Use flex for form layout
                noValidate
              >
                <div className="flex flex-col sm:flex-row sm:gap-4"> 
                  {/* Email */}
                  <div className="flex-1">
                    <Input 
                      id='email'
                      type='text'
                      placeholder='Email'
                      autoComplete='email'
                      {...register('email')}
                      className="w-full" 
                    />
                    {errors.email?.message && (
                      <p className="ml-1 mt-2 text-sm text-rose-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex-none">
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full disabled:opacity-50'
                    >
                      {isSubmitting ? 'Submitting ...' : 'Subscribe'}
                    </Button>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  By submitting this form, I agree to the {' '}
                  <Link href='/privacy' className='font-bold'>
                    privacy&nbsp;policy.
                  </Link>
                </p>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>
      
    )


}